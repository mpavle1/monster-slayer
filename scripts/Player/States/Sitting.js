import State, { states } from './State.js';

export default class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

    handleInput(input) {
        if (input.some(i => ['ArrowLeft', 'ArrowRight'].includes(i))) {
            this.game.player.setState(states.RUNNING, 1);
            return;
        }
        if (input.includes('f')) {
            this.game.player.setState(states.ROLLING, 2);
        }
        if (input.includes('ArrowUp')) {
            this.game.player.setState(states.JUMPING, 1);
            return;
        }
    }
}