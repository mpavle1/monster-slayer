import State, { states } from './State.js';

export default class Rolling extends State {
    constructor(player) {
        super('ROLLING');
        this.player = player;
    }

    enter() {
        this.player.frameX = 0;
        this.player.frameY = 6;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if () {
            this.player.setState(states.RUNNING, 1);
        }
    }
}