import Enemy from "./Enemy.js";

export default class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;

        this.width = 60;
        this.height = 44;

        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;

        this.speedX = 0.6 + Math.random() * 1.4;
        this.speedY = 0;
        this.maxFrame = 5;

        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;

        this.image = document.getElementById('enemy_fly');
    }

    update(deltaTime) {
        super.update(deltaTime);

        this.angle += this.va;
        this.y += Math.cos(this.angle);

        // proveriti
        // if (this.y > this.game.height - this.groundMargin - this.height) {
        //     this.y += this.groundMargin;
        // }
    }

    render(context) {
        super.render(context);
    }
}