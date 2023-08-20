import State, { states } from './State.js';

export default class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }

    enter() {
        if (this.player.onGround()) {
            this.player.ySpeed -= 25;
        }
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 6;
    }

    handleInput() {
        if (this.player.ySpeed > this.player.weight) {
            this.player.setState(states.FALLING, 1);
        }
    }
}