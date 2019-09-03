class CJDReader{
  constructor(_code){
    console.log(_code);
    this.code = this.readCode(_code);
    this.labels = {};
    this.registers = {};
  }

  readCode(_code) {
    var data = _code.split('\n').map((item)=>item.trim());
    console.log(data);
  }
}