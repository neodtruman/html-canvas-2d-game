class ImageObject extends GameObject {
  constructor(camera, image, x, y, width, height) {
    super(camera);

    this.image = image;

    this.x = x;
    this.y = y;

    if (typeof width === "undefined") {
      this.width = image.width;
    } else {
      this.width = width;
    }

    if (typeof height === "undefined") {
      this.height = image.height;
    } else {
      this.height = height;
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.x - this.camera.cameraX, this.y - this.camera.cameraY);
  }

  scaleDraw() {
    this.ctx.drawImage(this.image, this.x - this.camera.cameraX, this.y - this.camera.cameraY, this.width, this.height);
  }

  fixedDraw() {
    this.ctx.drawImage(this.image, this.x, this.y);
  }

  fixedScaleDraw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
