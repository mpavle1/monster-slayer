const validInputs = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "f",
  "d",
];

export default class InputHandler {
  constructor(game) {
    this.keys = [];
    this.game = game;

    window.addEventListener("keydown", (event) => {
      if (event.key === "d") {
        this.game.debugMode = !this.game.debugMode;
        return;
      }

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
