class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;

    this.width = width;
    this.height = height;

    this.x = 0;
    this.y = 0;

    this.speedModifier = speedModifier;

    this.image = image;
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0;
    } else {
      this.x -= this.game.speed * this.speedModifier;
    }
  }

  render(context) {
    // kada se zavrsi prva slika na kratko se pojavi druga
    // dok se ne loop-uje nazad na prvu
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export default class Background {
  constructor(game) {
    this.game = game;
        this.width = 1667;
    this.height = 500;

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      document.getElementById("layer1")
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      document.getElementById("layer2")
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      document.getElementById("layer3")
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      document.getElementById("layer4")
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      document.getElementById("layer5")
    );

    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }

  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }

  render(context) {
    this.backgroundLayers.forEach((layer) => layer.render(context));
  }
}
