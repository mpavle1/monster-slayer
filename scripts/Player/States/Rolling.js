import { Fire } from "../../Particles/index.js";
import State, { states } from "./State.js";

export default class Rolling extends State {
  constructor(game) {
    super("ROLLING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x,
        this.game.player.y
      )
    );
    if (!input.includes("f") && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      return;
    }
    if (!input.includes("f") && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    }
    if (
      input.includes("f") &&
      input.includes("ArrowUp") &&
      this.game.player.onGround()
    ) {
      this.game.player.ySpeed -= 25;
    }
    if (input.includes("ArrowDown") && !this.game.player.onGround()) {
      this.game.player.setState(states.DIVING, 0);
      return;
    }
  }
}
