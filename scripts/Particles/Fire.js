import Particle from "./Particle.js";

export default class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById("fire");
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.size = Math.random() * 50 + 50;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.1;
  }

  update() {
    super.update();
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle * 10);
  }

  render(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      0,
      0,
      this.size,
      this.size
    );
    context.restore();
  }
}