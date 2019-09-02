class TxtReader {
    constructor(_in, _out) {
        this.input = _in;
        this.output = _out;
        this.text = '';

        this.input.addEventListener("change", () => {
            this.read()
        });
    }

    read() {
        if (this.input.files && this.input.files[0]) {
            var reader = new FileReader();
            var out = this.output;

            reader.addEventListener('load', function (e) {
                this.text = out.textContent = e.target.result;
            });
            reader.readAsBinaryString(this.input.files[0]);
        }
    }
}
