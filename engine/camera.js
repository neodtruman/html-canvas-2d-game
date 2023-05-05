class Camera {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.width = canvas.width;
    this.height = canvas.height;

    this.cameraX = 0;
    this.cameraY = 0;
  }

  initialize(runner, background) {
    this.runner = runner;
    this.background = background;
  }

  update() {
    // Update camera position
    this.cameraX = this.runner.x - this.width / 2;
    if (this.cameraX < 0) {
      this.cameraX = 0;
    }
    if (this.cameraX > this.background.image.width - this.width) {
      this.cameraX = this.background.image.width - this.width;
    }

    this.cameraY = this.runner.y - this.height / 2;
    if (this.cameraY < 0) {
      this.cameraY = 0;
    }
    if (this.cameraY > this.background.image.height - this.height) {
      this.cameraY = this.background.image.height - this.height;
    }
  }
}
