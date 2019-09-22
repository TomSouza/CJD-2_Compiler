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
      LD2: new funcLoader(1, this.LD2),
      LD3: new funcLoader(1, this.LD3),
      ST2: new funcLoader(1, this.ST2),
      ST3: new funcLoader(1, this.ST3),
      POS: new funcLoader(1, this.POS),
      PXL: new funcLoader(1, this.PXL),
      RND: new funcLoader(1, this.RND),
      CLR: new funcLoader(1, this.CLR),
      COS: new funcLoader(1, this.COS),
      SIN: new funcLoader(1, this.SIN),
      IN: new funcLoader(1, this.IN),
      HALT: new funcLoader(1, this.HALT)
    };

    this.cjdData = _data;
    this.canvas = document.getElementById("cjd_canvas");

    this.AC = 0;
    this.AC2 = 0;
    this.AC3 = 0;
    this.PC = 0;
    this.N = false;
    this.Z = false;

    this.drawCursor = { x: 0, y: 0 };

    this.interrupt = false;

    compiler = this;
  }

  /**
   * Executa um passo no loop do programa
   */
  Run() {
    this.functionalTable[this.cjdData.memory[this.PC]].callback();

    this.N = this.AC < 0;
    this.Z = this.AC == 0;
    console.log(compiler);
  }

  /**
   * Atribui o valor de AC a variavel ou posiçao de memoria desejada
   */
  ST() {
    var [set] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(set)) {
      compiler.cjdData.data[set].val = compiler.AC;
      compiler.cjdData.memory[compiler.cjdData.data[set].mem] = compiler.AC;
    } else {
      compiler.cjdData.memory[set] = compiler.AC;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Atribui o valor de AC2 a variavel ou posiçao de memoria desejada
   */
  ST2() {
    var [set] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(set)) {
      compiler.cjdData.data[set].val = compiler.AC2;
      compiler.cjdData.memory[compiler.cjdData.data[set].mem] = compiler.AC2;
    } else {
      compiler.cjdData.memory[set] = compiler.AC2;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Atribui o valor de AC3 a variavel ou posiçao de memoria desejada
   */
  ST3() {
    var [set] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(set)) {
      compiler.cjdData.data[set].val = compiler.AC3;
      compiler.cjdData.memory[compiler.cjdData.data[set].mem] = compiler.AC3;
    } else {
      compiler.cjdData.memory[set] = compiler.AC3;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Carrega para o AC o valor recebido
   */
  LD() {
    var [load] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(load)) {
      compiler.AC = compiler.cjdData.data[load].val;
    } else {
      compiler.AC = load;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Carrega para o AC2 o valor recebido
   */
  LD2() {
    var [load] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(load)) {
      compiler.AC2 = compiler.cjdData.data[load].val;
    } else {
      compiler.AC2 = load;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Carrega para o AC3 o valor recebido
   */
  LD3() {
    var [load] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(load)) {
      compiler.AC3 = compiler.cjdData.data[load].val;
    } else {
      compiler.AC3 = load;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Adiciona ao AC o valor recebido
   */
  ADD() {
    var [add] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(add)) {
      compiler.AC += compiler.cjdData.data[add].val;
    } else {
      compiler.AC += add;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Remove do AC o valor recebido
   */
  SUB() {
    var [sub] = arguments[0];

    if (compiler.cjdData.data.hasOwnProperty(sub)) {
      compiler.AC -= compiler.cjdData.data[sub].val;
    } else {
      compiler.AC -= sub;
    }

    compiler.PC += arguments[0].length + 1;
  }

  /**
   * Faz um pulo na instrução da memoria modificando o valor de PC
   */
  JMP() {
    var [position] = arguments[0];

    if (compiler.cjdData.tags.hasOwnProperty(position)) {
      compiler.PC = compiler.cjdData.tags[position];
    } else {
      compiler.PC = position;
    }
  }

  /**
   * Faz um pulo na instrução da memoria modificando o valor de PC quando o valor de AC for negativo
   */
  JN() {
    var [position] = arguments[0];

    if (compiler.AC < 0) {
      compiler.JMP(position);
    }
  }

  /**
   * Faz um pulo na instrução da memoria modificando o valor de PC quando o valor de AC for positivo
   */
  JP() {
    var [position] = arguments[0];

    if (compiler.AC > 0) {
      compiler.JMP(position);
    }
  }

  /**
   * Faz um pulo na instrução da memoria modificando o valor de PC quando o valor de AC for zero
   */
  JZ() {
    var [position] = arguments[0];

    if (compiler.AC == 0) {
      compiler.JMP(position);
    }
  }

  /**
   * Faz um pulo na instrução da memoria modificando o valor de PC quando o valor de AC não for zero
   */
  JNZ() {
    var [position] = arguments[0];

    if (compiler.AC != 0) {
      compiler.JMP(position);
    }
  }

  /**
   * Posiciona o cursor de desenho ba coordenada XY definida respecticamente por AC e AC2
   */
  POS() {}

  /**
   * Desenha um pixel na posição atual com RGB definido respectivamente por AC, AC2 e AC3
   */
  PXL() {}

  /**
   * Gera um valor aleatorio entre Ac e AC2 e o aplica no argumento recebido
   */
  RND() {}

  /**
   * Limpa a tela
   */
  CLR() {}

  /**
   * Calcula o cosseno informado multiplicando pelo raio AC2 e o armazena em AC
   */
  COS() {}

  /**
   * Calcula o seno informado multiplicando pelo raio AC2 e o armazena em AC
   */
  SIN() {}

  /**
   * Realiza leitura de numeros por teclado e o aplica no argumento recebido
   */
  IN() {}

  /**
   * Interrompe a execução do programa
   */
  HALT() {
    this.interrupt = true;
  }
}
