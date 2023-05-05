class Monster extends ImageObject {
  constructor(camera, monsterImage, x, y) {
    super(camera, monsterImage, x, y);

    this.lastUpdate = 0;
  }

  generateSpeed() {
    const newSpeed = getRandomInt(-4, 4);
    return newSpeed === 0 ? 1 : newSpeed;
  }

  update(time) {
    // Change velocity every 3 seconds
    if (time - this.lastUpdate > 3000) {
      this.lastUpdate = time;
      this.vx = this.generateSpeed();
      this.vy = this.generateSpeed();
    }
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.camera.background.image.width - this.image.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > this.camera.background.image.height - this.image.height) {
      this.vy *= -1;
    }
  }
}
