import State, { states } from './State.js';

export default class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            return;
        }
        if (input.includes("ArrowDown")) {
          this.game.player.setState(states.DIVING, 0);
          return;
        }
    }
}