import { Sitting, Running, Jumping, Falling } from "./States/index.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.image = document.getElementById("player");

    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;

    this.xSpeed = 0;
    this.maxXSpeed = 10;

    this.ySpeed = 0;
    this.weight = 1;

    this.fps = 30; // tehnicki FPS za animaicju, ali sto je veci onda se brze menja stanje
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;

    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  update(keys, deltaTime) {
    this.currentState.handleInput(keys);

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

    this.y += this.ySpeed;

    if (!this.onGround()) {
      this.ySpeed += this.weight;
    } else {
      this.ySpeed = 0;
    }

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
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
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
