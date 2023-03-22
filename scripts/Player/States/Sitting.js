import State, { states } from './State.js';

export default class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }

    handleInput(input) {
        if (input.some(i => ['ArrowLeft', 'ArrowRight'].includes(i))) {
            this.player.setState(states.RUNNING, 1);
            return;
        }
        if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}