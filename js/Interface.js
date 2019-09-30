class Interface {
  constructor() {
    this.memoryTable = document.getElementById("memoryTable");
    this.regTable = document.getElementById("regTable");
  }

  /**
   * Cria tabela de espaçamento de memoria
   */
  createTable() {
    var memBody = document.getElementById("memBody");
    if (memBody != null) {
      memBody.parentNode.removeChild(memBody);
    }

    var tbl = document.createElement("table");
    tbl.setAttribute("id", "memBody");
    var tbdy = document.createElement("tbody");

    var count = 0;
    var pcIter = 0;
    var content = "";

    for (var i = 0; i <= 10; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < 20; j++) {
        var td = document.createElement("td");

        td.className = "memSpace";
        td.appendChild(document.createTextNode(`${count++}`));
        var div = document.createElement("div");

        if (cjdData.memory == null || cjdData.memory[pcIter] == null) {
          content = "-";
          pcIter++;
        } else {
          content = cjdData.memory[pcIter++];
        }

        div.className = "memContent";
        div.id = "memPos_" + (pcIter - 1);
        div.appendChild(document.createTextNode(content));
        td.appendChild(div);
        tr.appendChild(td);
      }
      tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);
    this.memoryTable.appendChild(tbl);
  }

  /**
   * Cria interface para os registradores
   */
  createRegisters() {
    var regBody = document.getElementById("regBody");
    if (regBody != null) {
      regBody.parentNode.removeChild(regBody);
    }

    var tbl = document.createElement("table");
    tbl.setAttribute("id", "regBody");
    var tbdy = document.createElement("tbody");

    var content = "";

    if (compiler != null) {
      for (var i = 1; i <= 3; i++) {
        if (i == 1) {
          this.createRegister("AC", tbdy);
        } else {
          this.createRegister("AC" + i, tbdy);
        }
      }

      this.createRegister("PC", tbdy);
      this.createRegister("N", tbdy);
      this.createRegister("Z", tbdy);
    }

    if (cjdData.data != null) {
      for (var index in cjdData.data) {
        this.createRegister(
          index,
          tbdy,
          cjdData.memory[cjdData.data[index].mem]
        );
      }
    }
    tbl.appendChild(tbdy);
    this.regTable.appendChild(tbl);
  }

  /**
   * Atualiza os valores apresentados na tela
   *
   * @param {CJDCompiler} compiler
   */
  Update(compiler) {
    var olderCounter = document.getElementsByClassName("actuaPointer")[0];

    if (olderCounter != undefined) {
      olderCounter.classList.remove("actuaPointer");
    }

    var actualCounter = document.getElementById("memPos_" + compiler.PC);
    actualCounter.classList.add("actuaPointer");

    for (const key in compiler.cjdData.data) {
      var updateField = document.getElementById(
        "memPos_" + compiler.cjdData.data[key].mem
      );
      var updateRegister = document.getElementById("memPos_" + key);

      updateRegister.innerText = updateField.innerText =
        compiler.cjdData.data[key].val;
    }

    this.UpdateDefaultAttribute("AC");
    this.UpdateDefaultAttribute("AC2");
    this.UpdateDefaultAttribute("AC2");
    this.UpdateDefaultAttribute("PC");
    this.UpdateDefaultAttribute("N");
    this.UpdateDefaultAttribute("Z");
  }

  UpdateDefaultAttribute(attribute) {
    var att = document.getElementById("memPos_" + attribute);
    att.innerText = compiler[attribute];
  }

  /**
   * Cria estrutura padrão para um registrador
   *
   * @param {string} register
   * @param {HTMLElement} tbdy
   * @param {integer} value
   */
  createRegister(register, tbdy, value = undefined) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(`${register}: `));
    tr.appendChild(td);
    var td = document.createElement("td");
    content = value == undefined ? compiler[register] : value;
    td.appendChild(document.createTextNode(content));
    td.id = "memPos_" + register;
    td.className = "memSpace";
    tr.appendChild(td);
    tbdy.appendChild(tr);
  }
}
