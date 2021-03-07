module.exports = class Parser {
  constructor(assemblyCode) {
    this.assemblyCode = assemblyCode;
  }

  currentInstruction = undefined;

  hasMoreCommands() {
    return this.assemblyCode.length > 0;
  }

  advance() {
    return this.assemblyCode.shift();
  }

  commandType() {
    if (this.currentInstruction[0] === "/" || this.currentInstruction === "") {
      return null;
    } else if (this.currentInstruction[0] === "@") {
      return "A_COMMAND";
    } else if (this.currentInstruction[0] === "(") {
      return "L_COMMAND";
    } else {
      return "C_COMMAND";
    }
  }

  symbol() {
    const decimalPart = Number(this.currentInstruction.split("@")[1]);
    const binary = decimalPart.toString(2);
    return "0".repeat(16 - binary.length) + binary;
  }

  dest() {
    return this.currentInstruction.indexOf("=") != -1
      ? this.currentInstruction.split("=")[0]
      : undefined;
  }

  comp() {
    return this.currentInstruction.indexOf(";") != -1
      ? this.currentInstruction.split(";")[0]
      : this.currentInstruction.split("=")[1];
  }

  jump() {
    return this.currentInstruction.split(";")[1];
  }
};
