let compiler;

class funcLoader {
  constructor(_params, _callback) {
    this.callback = () => {
      var args = [];
      for (var index = 1; index <= _params; index++) {
        args.push(compiler.cjdData.memory[compiler.PC + index]);
      }
      return _callback(args);
    };
  }
}

class CJDCompiler {
  constructor(_data) {
    this.functionalTable = {
      ST: new funcLoader(1, this.ST),
      LD: new funcLoader(1, this.LD),
      ADD: new funcLoader(1, this.ADD),
      SUB: new funcLoader(1, this.SUB),
      JMP: new funcLoader(1, this.JMP),
      JN: new funcLoader(1, this.JN),
      JP: new funcLoader(1, this.JP),
      JZ: new funcLoader(1, this.JZ),
      JNZ: new funcLoader(1, this.JNZ),
      HALT: new funcLoader(1, this.HALT)
    };

    this.cjdData = _data;

    this.AC = 0;
    this.PC = 0;
    this.N = 0;
    this.Z = 0;

    compiler = this;

    this.Run();
    this.Run();
  }

  Run() {
    this.functionalTable[this.cjdData.memory[this.PC]].callback();
  }

  ST() {
    console.log("SET");
  }
  LD() {
    var [load] = arguments[0];
    compiler.PC += arguments[0].length + 1;
  }
  ADD() {}
  SUB() {}
  JMP() {}
  JN() {}
  JP() {}
  JZ() {
    console.log("JUMP ZERO");
  }
  JNZ() {}
  HALT() {}
}
