import { Fire, Splash } from "../../Particles/index.js";
import State, { states } from "./State.js";

export default class Diving extends State {
  constructor(game) {
    super("DIVING", game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
    this.game.player.ySpeed = 15;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Fire(this.game, this.game.player.x, this.game.player.y)
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.7,
            this.game.player.y + this.game.player.height * 0.3
          )
        );
      }
      return;
    }
    if (input.includes("f") && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}
