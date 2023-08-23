import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, states } from "./States/index.js";
import Collision from "../Animation/Collision.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.image = document.getElementById("player");

    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;

    this.xSpeed = 0;
    this.maxXSpeed = 6;

    this.ySpeed = 0;
    this.weight = 1;

    this.fps = 25; // tehnicki FPS za animaicju, ali sto je veci onda se brze menja stanje
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0; // prati koliko frame-ova je proslo od proslog update-a i kasnije sluzi da se proveri da li treba da se update frame
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;

    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  #renderDebugMode(context) {
    if (this.game.debugMode) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  #updateHorizontalMovement(keys) {
    this.x += this.xSpeed;

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
  }

  #updateVerticalMovement() {
    this.y += this.ySpeed;

    if (this.onGround()) {
      this.ySpeed = 0;
      this.y = this.game.height - this.height - this.game.groundMargin;
      return;
    }

    if (this.currentState instanceof Falling) {
      this.ySpeed += this.weight * 0.5;
      return;
    }
  
    this.ySpeed += this.weight;
  }

  #updateFrames(deltaTime) {
    if (this.frameTimer <= this.frameInterval) {
      this.frameTimer += deltaTime;
      return;
    }

    this.frameTimer = 0;
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  #checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.shouldDeleted = true;
        this.game.collisions.push(
          new Collision(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if ([this.states[4], this.states[5]].includes(this.currentState)) {
          this.game.score++;
        } else {
          this.setState(states.HIT, 0);
        }
      }
    });
  }

  update(keys, deltaTime) {
    this.#checkCollisions();
    this.currentState.handleInput(keys);
    this.#updateHorizontalMovement(keys);
    this.#updateVerticalMovement();
    this.#updateFrames(deltaTime);
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  render(context) {
    this.#renderDebugMode(context);
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
