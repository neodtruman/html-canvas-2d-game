class BulletFactory {
  constructor(camera, bulletImage) {
    this.camera = camera;

    this.bulletImage = bulletImage;
  }

  createBullet(x, y, width, height, vx, vy) {
    return new Bullet(this.camera, this.bulletImage, x, y, width, height, vx, vy);
  }
}
