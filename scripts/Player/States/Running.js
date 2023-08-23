import State, { states } from "./State.js";
import { Dust } from "../../Particles/index.js";

export default class Running extends State {
  constructor(game) {
    super("RUNNING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 8;
  }

  handleInput(input) {
    this.game.particles.push(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes("ArrowDown")) {
      this.game.player.setState(states.SITTING, 0);
      return;
    }
    if (input.includes("ArrowUp")) {
      this.game.player.setState(states.JUMPING, 1);
    }
    if (input.includes("f")) {
      this.game.player.setState(states.ROLLING, 2);
      return;
    }
  }
}
