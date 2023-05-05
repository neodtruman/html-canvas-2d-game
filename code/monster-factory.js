class MonsterFactory {
  constructor(camera, monsterImage) {
    this.camera = camera;

    this.monsterImage = monsterImage;
  }

  createMonster(x, y) {
    return new Monster(this.camera, this.monsterImage, x, y);
  }
}
