export default class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.shouldDeleted = false;
  }

  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.x + this.width < 0) {
        this.shouldDeleted = true;
    }
  }

  #renderDebugMode(context) {
    if (this.game.debugMode) {
      context.strokeRect(
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  render(context) {
    this.#renderDebugMode(context);

    context.drawImage(
        this.image,
        this.frameX * this.width,
        0, // sprajt ima samo jedan red
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
  }
}