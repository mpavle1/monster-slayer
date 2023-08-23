import State, { states } from './State.js';

export default class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }

    enter() {
        if (this.game.player.onGround()) {
            this.game.player.ySpeed -= 25;
        }
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.game.player.ySpeed > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        }
        if (input.includes('f')) {
            this.game.player.setState(states.ROLLING, 2);
            return;
        }
        if (input.includes("ArrowDown")) {
          this.game.player.setState(states.DIVING, 0);
          return;
        }
    }
}