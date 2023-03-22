import Enemy from "./Enemy.js";

export default class ClimbingEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;

    this.width = 120;
    this.height = 144;

    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;

    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;

    this.maxFramte = 5;

    this.image = document.getElementById("enemy_spider_big");
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.y > this.game.height - this.height - this.game.groundMargin) {
      this.speedY *= -1;
    }

    if (this.y < -this.height) {
      this.shouldDeleted = true;
    }
  }

  render(context) {
    super.render(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }
}
