class Question extends ImageObject {
  constructor(camera, word, image, x, y, width, height) {
    super(camera, image, x, y, width, height);

    this.word = word;
  }

  drawOnPlayingScreen() {
    // Draw the image of question smaller
    const x = 10;
    const y = 10;
    const width = 100;
    const height = 100;
    this.ctx.drawImage(this.image, x, y, width, height);

    // Draw a border
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
  }

  drawOnStartScreen() {
    super.fixedScaleDraw();

    // Draw a border
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
