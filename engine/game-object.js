class GameObject {
  constructor(camera) {
    this.camera = camera;
    this.canvas = camera.canvas;
    this.ctx = this.canvas.getContext("2d");
  }
}
