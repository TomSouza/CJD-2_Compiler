class register {
  constructor(_mem, _val){
    this.men = _mem;
    this.val = _val;
  }
}

class CJDReader{
  constructor(_code){
    this.labels = {};
    this.registers = [];
    this.setVars = false;
    this.setCode = false;

    this.code = this.readCode(_code);
  }

  readCode(_code) {
    var data = _code.split('\n').map((item)=>item.trim());

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      switch (element) {
        case '.data':
          this.setVars = true;
          continue;
        case '.enddata':
          this.setVars = false;
          continue;
        case '.code':
          this.setCode = true;
          continue;
        case '.endcode':
          this.setCode = false;
          continue;
      }

      this.getValues(element);
    }
  }

  getValues(line) {

    if (this.setVars) {

      var name = line.slice(0, line.indexOf(':'));
      var vals = line.slice(line.indexOf('#')).split(',').map((item)=>item.replace('#', '').trim());

      var reg = {};
      reg[name] = new register(vals[0], vals[1]);

      this.registers.push(reg);

      console.log(this.registers);
    }

  }
}