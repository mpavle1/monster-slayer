export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
};

export default class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}