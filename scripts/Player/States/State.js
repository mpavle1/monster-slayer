export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
};

export default class State {
    constructor(state) {
        this.state = state;
    }
}