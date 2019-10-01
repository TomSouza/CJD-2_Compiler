class TxtReader {
  constructor(_in, _out) {
    this.input = _in;
    this.output = _out;
    this.text = "";

    this.files = {
      "draw_Rectangle.txt": "draw_Rectangle",
      "draw_RectangleBorder.txt": "draw_RectangleBorder",
      "draw_RectangleRND.txt": "draw_RectangleRND"
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
