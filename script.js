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

  class Customer {
    constructor(game) {
      this.game = game;
      this.spriteWidth = 215;
      this.spriteHeight = 220;
      this.frameX = 0;
      this.frameY = 4;
      this.maxFrame = 0;
      this.width = 215;
      this.height = 220;
      this.x = 0;
      this.y = this.game.height - 450;
      this.image = document.querySelector("#customer");
      this.customerArray = this.game.customerArray;
    }

    update() {
      // this.customerArray.forEach((customer, i) => {
      //   customer.x = this.width * i;
      //   customer.frameY = Math.floor(Math.random() * 3);
      // });
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Orders {
    constructor(game) {
      this.game = game;
      this.blueOrder = document.querySelector("#blue-o");
      this.cocoOrder = document.querySelector("#coco-o");
      this.lemonOrder = document.querySelector("#lemon-o");
      this.strawberryOrder = document.querySelector("#strawberry-o");
      this.xice = 183;
      this.yice = 530;
      this.x = 183;
      this.y = 180;
      this.width = 238;
      this.height = 183;
      this.image = this.cocoOrder;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  class IceCream {
    constructor(game) {
      this.game = game;
      this.image = undefined;
      this.x = 183;
      this.y = 530;
      this.width = 238;
      this.height = 183;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  class Background {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = 0;
      this.width = this.game.width;
      this.height = this.game.height;
      this.image = document.querySelector("#table");
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.input = new InputHandler(this);
      this.bg = new Background(this);
      // this.customer = new Customer(this);
      this.iceCream = new IceCream(this);
      this.blueImage = document.querySelector("#blue-ice");
      this.cocoImage = document.querySelector("#coco-ice");
      this.lemonImage = document.querySelector("#lemon-ice");
      this.strawberryImage = document.querySelector("#strawberry-ice");
      this.iceCreamArray = [
        this.blueImage,
        this.cocoImage,
        this.lemonImage,
        this.strawberryImage,
      ];
      this.iceCreamX = 0;
      this.maxCustomerNumber = 4;
      this.customerArray = [];
      this.orderArray = [];
    }
    render(context, deltaTime) {
      this.bg.draw(context);

      this.customerArray.forEach((customer, i) => {
        customer.x = customer.width * i + 80;
        // customer.frameY = Math.floor(Math.random() * 3);
        customer.frameY = i;
        customer.draw(context);
      });

      this.orderArray.forEach((order, i) => {
        order.draw(context);
      });

      this.iceCreamArray.forEach((ice, i) => {
        this.iceCream.image = ice;
        this.iceCream.x = 260 * i;
        this.iceCream.draw(context);
      });
    }
    init() {
      this.customerArray.forEach((customer, i) => {
        customer.update();
      });
      for (let i = 0; i < this.maxCustomerNumber; i++) {
        this.customerArray.push(new Customer(this));
        this.orderArray.push(new Orders(this));
      }
      console.log(this.customerArray);
      console.log(this.orderArray);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  game.init();

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = deltaTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
