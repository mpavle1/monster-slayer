import Sitting from './scripts/Player/Sitting.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.xSpeed = 0;
    this.maxXSpeed = 10;
    this.ySpeed = 0;
    this.weight = 1;

  
    this.states = [new Sitting(this)];
    this.currentState = this.states[0];
    this.currentState.enter();

    this.frameX = 0;
    this.frameY = 0;
  }

  update(keys) {
    this.x += this.xSpeed;

    // horizontalno kretanje
    if (keys.includes("ArrowRight")) {
      this.xSpeed = this.maxXSpeed;
    } else if (keys.includes("ArrowLeft")) {
      this.xSpeed = -this.maxXSpeed;
    } else {
      this.xSpeed = 0;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }

    // vertikalno kretanje
    
    if (keys.includes('ArrowUp') && this.onGround()) {
      this.ySpeed -= 10;
    }
  
    this.y += this.ySpeed;
    
    if (!this.onGround()) {
      this.ySpeed += this.weight;
    } else {
      this.ySpeed = 0;
    }
  
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }

  render(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
