class Bullet extends ImageObject {
  constructor(camera, image, x, y, width, height, vx) {
    super(camera, image, x, y, width, height);

    this.vx = vx;
  }

  update() {
    this.x += this.vx;
  }
}
