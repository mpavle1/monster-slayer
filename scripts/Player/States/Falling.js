import State, { states } from './State.js';

export default class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }

    handleInput() {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, 1);
        }
    }
}