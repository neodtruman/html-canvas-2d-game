class PadFactory {
  constructor(camera, padImage) {
    this.camera = camera;

    this.padImage = padImage;
  }

  createPad(x, y, width, height) {
    return new Pad(this.camera, this.padImage, x, y, width, height);
  }

  createAllPads(bgHeight) {
    return [
      // createPad(x, y, width, height)
      this.createPad(300, bgHeight - 220, 250),
      this.createPad(650, bgHeight - 300, 250),
      this.createPad(1000, bgHeight - 400, 200),
      this.createPad(1300, bgHeight - 520, 200),

      this.createPad(1550, bgHeight - 620, 150),
      this.createPad(1800, bgHeight - 300, 250),
      this.createPad(2150, bgHeight - 220, 150),
      this.createPad(2350, bgHeight - 400, 200),

      this.createPad(2700, bgHeight - 400, 250),
      this.createPad(3000, bgHeight - 550, 100),
      this.createPad(3200, bgHeight - 500, 250),
      this.createPad(3500, bgHeight - 600, 200),

      this.createPad(3900, bgHeight - 300, 250),
      this.createPad(4250, bgHeight - 400, 150),
      this.createPad(4500, bgHeight - 500, 200),
      this.createPad(4800, bgHeight - 350, 250),

      this.createPad(5150, bgHeight - 250, 200),
    ];
  }
}
