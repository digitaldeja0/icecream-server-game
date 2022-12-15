window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 786;

  class InputHandler {
    constructor(game) {
      this.game = game;
      canvas.addEventListener("click", (e) => {
        console.log(e);
      });
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.input = new InputHandler();
    }
    render(context, deltaTime) {}
    init() {}
  }

  const game = new Game(canvas.width, canvas.height);
  game.init();

  this.lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = deltaTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
