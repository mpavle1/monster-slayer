export const states = {
    RUNNING: 0,
    SITTING: 1,
    JUMPING: 2
};

export default class State {
    constructor(state) {
        this.state = state;
    }
}