const fs = require("fs");
const Code = require("./src/code");
const Parser = require("./src/parser");

const inputFilename = process.argv[2];
const outputFilename = process.argv[3];

const inputFile = fs.readFileSync(inputFilename, { encoding: "utf-8" });
const assemblyCode = inputFile.split(/\r?\n/);

const parser = new Parser(assemblyCode);
let parsedCode = [];

while (parser.hasMoreCommands()) {
  let parsedInstruction = "";
  parser.currentInstruction = parser.advance().trim();
  switch (parser.commandType()) {
    case "A_COMMAND":
      parsedInstruction += parser.symbol();
      break;
    case "C_COMMAND":
      parsedInstruction += "111";
      parsedInstruction += Code.comp(parser.comp());
      parsedInstruction += Code.dest(parser.dest());
      parsedInstruction += Code.jump(parser.jump());
      break;
    case "L_COMMAND":
      parser.symbol();
      break;
    default:
      break;
  }
  parsedInstruction ? parsedCode.push(parsedInstruction) : "";
}

const outputFile = fs.createWriteStream(`${outputFilename}.hack`);
outputFile.write(parsedCode.join("\n"));
outputFile.close();
