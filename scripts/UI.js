export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamiliy = 'Helvetica';
    }

    render(context) {
        context.font = `${this.fontSize}px ${this.fontFamiliy}`;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        context.fillText(`Score: ${this.game.score}`, 20, 35);
    }
}