class BulletCounter extends GameObject {
  constructor(camera, bullet) {
    super(camera);

    this.bullet = bullet;
    this.x = this.bullet.x + 45;
    this.y = this.bullet.y + 30;
    this.counter = 0;
  }

  draw() {
    this.bullet.fixedDraw();

    this.ctx.font = "38px Sans-Serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("x", this.x, this.y);
    this.ctx.fillText(this.counter, this.x + 20, this.y);
  }
}
