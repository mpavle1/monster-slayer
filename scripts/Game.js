import Player from "./Player/index.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./Enemies/index.js";
import UI from "./UI.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80; // visina zemlje, tacnije koordinata na kojoj igrac stoji

    this.speed = 0; // trenutna brzina
    this.maxSpeed = 1.5; // base brzina, brzina igre je kooficijent ove brzine

    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 1500;

    this.debugMode = false;
    this.score = 0;
    this.fontColor = "black";

    this.ui = new UI(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.background = new Background(this);
    this.enemies = [];
    this.particles = [];
    this.collisions = [];

    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
  }

  #addEnemy() {
    if (this.speed > 0) {
      if (Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else {
        this.enemies.push(new ClimbingEnemy(this));
      }
    }

    this.enemies.push(new FlyingEnemy(this));
  }

  #updateEnemies(deltaTime) {
    if (this.enemySpawnTimer > this.enemySpawnInterval) {
      this.#addEnemy();
      this.enemySpawnTimer = 0;
    } else {
      this.enemySpawnTimer += deltaTime;
    }

    this.enemies.forEach((enemy, index) => {
      enemy.update(deltaTime);
      if (enemy.shouldDeleted) {
        this.enemies.splice(index, 1);
      }
    });
  }

  update(deltaTime) {
    this.background.update(this.input.keys, deltaTime);
    this.player.update(this.input.keys, deltaTime);
    this.#updateEnemies(deltaTime);
    this.particles.forEach((particle, index) => {
      particle.update();
      if (particle.shouldBeDeleted) {
        this.particles.splice(index, 1);
      }
    });
    if (this.particles.length > 50) {
      this.particles = this.particles.slice(0, 50);
    }
    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
      if (collision.shouldBeDeleted) {
        this.collisions.splice(index, 1);
      }
    });
  }

  // bitan je redosled render-a, zbog slaganja jednog na drugo
  render(context) {
    this.background.render(context);
    this.player.render(context);
    this.enemies.forEach((enemy) => enemy.render(context));
    this.particles.forEach((particle) => particle.render(context));
    this.collisions.forEach((collision) => collision.render(context));
    this.ui.render(context);
  }
}
