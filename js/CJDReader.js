class register {
  constructor(_mem, _val) {
    this.men = _mem;
    this.val = _val;
  }
}

class CJDReader {
  constructor(_code) {
    this.tags = {};
    this.data = {};
    this.memory = [];
    this.memoryCounter = 0;

    this.setVars = false;
    this.setCode = false;

    this.code = this.readCode(_code);
  }

  readCode(_code) {
    this.tags = {};
    this.data = {};
    this.memory = [];
    this.memoryCounter = 0;

    var data = _code.split("\n").map(item => item.trim());

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      switch (element) {
        case ".data":
          this.setVars = true;
          continue;
        case ".enddata":
          this.setVars = false;
          continue;
        case ".code":
          this.setCode = true;
          continue;
        case ".endcode":
          this.setCode = false;
          continue;
      }

      this.getValues(element);
    }
  }

  getValues(line) {
    if (this.setVars) {
      var name = line.slice(0, line.indexOf(":"));
      var vals = line
        .slice(line.indexOf("#"))
        .split(",")
        .map(item => item.replace("#", "").trim());

      this.memory[vals[0]] = vals[1];
      this.data[name] = new register(vals[0], vals[1]);
    }

    if (this.setCode) {
      if (line.search(":") > 0) {
        var name = line.slice(0, line.indexOf(":"));
        this.tags[name] = this.memoryCounter;
        line = line.replace(name + ": ", "").trim();
      }

      var lineParams = line.split(" ");

      for (let index = 0; index < lineParams.length; index++) {
        this.memory[this.memoryCounter + index] = lineParams[index];
      }

      this.memoryCounter += lineParams.length;
    }
  }

  getCJDData() {
    return {
      data: this.data,
      tags: this.tags,
      memory: this.memory
    };
  }
}
