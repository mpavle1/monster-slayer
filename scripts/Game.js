import Player from "./Player/index.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './Enemies/index.js';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80; // visina zemlje, tacnije koordinata na kojoj igrac stoji

    this.speed = 0; // trenutna brzina
    this.maxSpeed = 3; // base brzina, brzina igre je kooficijent ove brzine

    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 1500;
  
    this.player = new Player(this);
    this.input = new InputHandler();
    this.background = new Background(this);
    this.enemies = [];
  }

  update(deltaTime) {
    this.background.update(this.input.keys, deltaTime);
    this.player.update(this.input.keys, deltaTime);

    if (this.enemySpawnTimer > this.enemySpawnInterval) {
      this.addEnemy();
      this.enemySpawnTimer = 0;
    } else {
      this.enemySpawnTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.shouldDeleted) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
    });

  }

  render(context) {
    this.background.render(context);
    this.player.render(context);
    this.enemies.forEach(enemy => enemy.render(context));
  }

  addEnemy() {
    if (this.speed > 0) {
      if (Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else {
        this.enemies.push(new ClimbingEnemy(this));
      }
    }

    this.enemies.push(new FlyingEnemy(this));
  }
}
