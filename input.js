const validInputs = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'f'];


export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            console.log(e.key);
            if (validInputs.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }

            console.log(this.keys);
        })
        window.addEventListener('keyup', (e) => {
            if (validInputs.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }

            console.log(this.keys);
        })
    }


}