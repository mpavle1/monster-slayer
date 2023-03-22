import State, { states } from './State.js';

export default class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 8;
    }

    handleInput(input) {
        if (input.includes('ArrowDown')) {
            this.player.setState(states.SITTING, 0);
            return;
        }
        if (input.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}