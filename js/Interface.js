class Interface {
  constructor() {}

  createTable() {
    var elem = document.getElementById("memBody");
    if (elem != null) elem.parentNode.removeChild(elem);
    // Construindo a tabela :3
    var tableContent = document.getElementById("memoryTable");
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "memBody");
    var tbdy = document.createElement("tbody");

    var rows = 5;
    var cols = 20;
    var count = 0;
    var pcIter = 0;
    var content = "";

    for (var i = 0; i <= rows; i++) {
      var tr = document.createElement("tr");
      for (var j = 0; j < cols; j++) {
        if (i == 2) {
          break;
        } else {
          var td = document.createElement("td");
          td.className = "memSpace";
          td.appendChild(document.createTextNode("" + count++ + ""));
          var div = document.createElement("div");
          if (cjdData.memory == null || cjdData.memory[pcIter] == null) {
            content = "-";
            pcIter++;
          } else content = "" + cjdData.memory[pcIter++];
          div.className = "memContent";
          div.appendChild(document.createTextNode(content));
          td.appendChild(div);
          tr.appendChild(td);
        }
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    tableContent.appendChild(tbl);
  }

  createRegisters() {
    var elem = document.getElementById("regBody");
    if (elem != null) elem.parentNode.removeChild(elem);
    // Construindo a tabela :3

    var tableContent = document.getElementById("regTable");
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "regBody");
    var tbdy = document.createElement("tbody");

    var content = "";

    if (compiler != null) {
      //console.log(compiler["AC"]);
      for (var i = 1; i <= 3; i++) {
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        if (i == 1) td.appendChild(document.createTextNode("AC: "));
        else td.appendChild(document.createTextNode("AC" + i + ": "));
        tr.appendChild(td);

        var td = document.createElement("td");
        if (i == 1) content = compiler["AC"];
        else content = compiler["AC" + i];
        td.appendChild(document.createTextNode(content));
        td.className = "memSpace";
        tr.appendChild(td);

        tbdy.appendChild(tr);
      }

      // Adding PC, N e Z

      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode("PC: "));
      tr.appendChild(td);
      var td = document.createElement("td");
      content = compiler["PC"];
      td.appendChild(document.createTextNode(content));
      td.className = "memSpace";
      tr.appendChild(td);
      tbdy.appendChild(tr);

      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode("N: "));
      tr.appendChild(td);
      var td = document.createElement("td");
      content = compiler["N"];
      td.appendChild(document.createTextNode(content));
      td.className = "memSpace";
      tr.appendChild(td);
      tbdy.appendChild(tr);

      var tr = document.createElement("tr");
      var td = document.createElement("td");
      td.appendChild(document.createTextNode("Z: "));
      tr.appendChild(td);
      var td = document.createElement("td");
      content = compiler["Z"];
      td.appendChild(document.createTextNode(content));
      td.className = "memSpace";
      tr.appendChild(td);
      tbdy.appendChild(tr);
    }

    if (cjdData.data != null) {
      for (var i in cjdData.data) {
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        td.appendChild(document.createTextNode("" + i + ": "));
        tr.appendChild(td);

        var td = document.createElement("td");
        content = cjdData.memory[cjdData.data[i].mem];
        td.appendChild(document.createTextNode(content));
        td.className = "memSpace";
        tr.appendChild(td);

        tbdy.appendChild(tr);
      }
    }
    tbl.appendChild(tbdy);
    tableContent.appendChild(tbl);
  }
}
