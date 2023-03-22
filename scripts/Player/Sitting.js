import State, { states } from './State.js';

export default class Sitting extends State {
    constructor(player) {
        super('SITTING');

        console.log({ player });

        this.player = player;
    }

    enter() {
        this.player.frameY = 5;
    }

    handleInput() {}
}