import Particle from "./Particle.js";

export default class Dust extends Particle {
    constructor(game, x , y) {
        super(game);
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.size = Math.random() * 10 + 5;
        this.color = 'rgba(0,0,0,0.2)';
    }

    render(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}