const validInputs = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "f"];

export default class InputHandler {
  constructor() {
    this.keys = [];

    window.addEventListener("keydown", (event) => {
      if (validInputs.includes(event.key) && !this.keys.includes(event.key)) {
        this.keys.push(event.key);
      }
    });

    window.addEventListener("keyup", (event) => {
      if (validInputs.includes(event.key)) {
        this.keys.splice(this.keys.indexOf(event.key), 1);
      }
    });
  }
}
