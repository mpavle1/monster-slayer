import Game from "./scripts/Game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("main-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 500;

  let lastTime = 0;

  const game = new Game(canvas.width, canvas.height);

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate(0);
});
