import Particle from "./Particle.js";

export default class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 200;
    this.image = document.getElementById("fire");
    this.x = x - this.size * 0.5;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
  }

  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  render(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
