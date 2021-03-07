const fs = require("fs");
const Code = require("./src/code");
const Parser = require("./src/parser");
const SymbolTable = require("./src/symbolTable");
let ramAddress = 16;

const inputFilename = process.argv[2];
const outputFilename = process.argv[3];

const inputFile = fs.readFileSync(inputFilename, { encoding: "utf-8" });
const assemblyCode = inputFile.split(/\r?\n/);

const parser = new Parser(assemblyCode);
let parsedCode = [];

const symbolTable = new SymbolTable();

let instructionNumber = 0;
for (let i = 0; i < assemblyCode.length; i++) {
  if (assemblyCode[i] === "" || assemblyCode[i][0] === "/") {
  } else if (assemblyCode[i][0] === "(") {
    const symbol = assemblyCode[i].trim().slice(1, -1);
    const binaryAddress = instructionNumber.toString(2);
    symbolTable.addEntry(symbol, "0".repeat(16 - binaryAddress.length) + binaryAddress);
  } else {
    instructionNumber += 1;
  }
}

while (parser.hasMoreCommands()) {
  let parsedInstruction = "";
  parser.currentInstruction = parser.advance().split("/")[0].trim();

  switch (parser.commandType()) {
    case "A_COMMAND":
      const symbol = parser.currentInstruction.slice(1);
      if (symbolTable.contains(symbol)) {
        parsedInstruction += symbolTable.getAddress(symbol);
      } else if (!isNaN(symbol)) {
        parsedInstruction += parser.symbol();
      } else {
        const binaryAddress = ramAddress.toString(2);
        const fullBinaryAddress = "0".repeat(16 - binaryAddress.length) + binaryAddress;
        symbolTable.addEntry(symbol, fullBinaryAddress);
        parsedInstruction = fullBinaryAddress;
        ramAddress++;
      }
      break;
    case "C_COMMAND":
      parsedInstruction += "111";
      parsedInstruction += Code.comp(parser.comp());
      parsedInstruction += Code.dest(parser.dest());
      parsedInstruction += Code.jump(parser.jump());
      break;
    case "L_COMMAND":
      break;
    default:
      break;
  }
  parsedInstruction ? parsedCode.push(parsedInstruction) : "";
}

const outputFile = fs.createWriteStream(`${outputFilename}.hack`);
outputFile.write(parsedCode.join("\n"));
outputFile.close();
