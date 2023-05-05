class Letter extends ImageObject {
  constructor(camera, image, char, type, pad, x, y) {
    super(camera, image, x, y);

    this.char = char;
    this.type = type;
    this.pad = pad;

    if (typeof pad !== "undefined" && pad !== null) {
      this.x = this.pad.x + (this.pad.width - this.width) / 2;
      this.y = this.pad.y - 330;
    }
  }

  draw() {
    let adjustment = 0;
    if (this.char === "I" || this.char === "J") {
      adjustment = 10;
    }
    switch (this.type) {
      case LETTER_FOR_QUESTION:
        super.draw();

        this.ctx.font = "bold 44px Sans-Serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.char, this.x - this.camera.cameraX + 12 + adjustment, this.y - this.camera.cameraY + 46);
        break;

      case LETTER_FOR_ANSWER:
        super.fixedDraw();

        this.ctx.font = "bold 34px Sans-Serif";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.char, this.x + 10 + adjustment, this.y + 34);
        break;
    }
  }
}
