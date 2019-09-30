class TxtReader {
  constructor(_in, _out) {
    this.input = _in;
    this.output = _out;
    this.text = "";

    this.files = {
      "desafio01.txt": "desafio_01",
      "desafio02.txt": "desafio_02",
      "desafio03.txt": "desafio_03"
    };

    for (var index in this.files) {
      this.input.options[this.input.options.length] = new Option(
        this.files[index],
        index
      );
    }

    this.input.addEventListener("change", event => {
      this.read(event);
    });
  }

  read(event) {
    var request = new XMLHttpRequest();
    request.open("GET", "./assemblyCode/" + event.target.value, true);
    request.send(null);

    var out = this.output;

    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");

        if (type.indexOf("text") !== 1) {
          this.text = out.textContent = request.responseText;
          out.focus();
        }
      }
    };
  }
}
