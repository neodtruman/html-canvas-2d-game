class CollisionChecker {
  constructor(game) {
    this.game = game;
    this.explosionSound = new Sound("assets/sound/explosion.wav");
  }

  checkCollisions() {
    // Hunter-monster collision checking
    for (const monster of this.game.monsters) {
      if (isColliding(this.game.hunter, monster)) {
        this.game.currentState = GAME_OVER;
        this.game.drawGameOverScreen();
        return;
      }
    }

    // Bullet-monster collision checking
    for (const monster of this.game.monsters) {
      for (const bullet of this.game.bulletList) {
        if (isColliding(monster, bullet)) {
          this.explosionSound.play();
          removeItemFromArray(this.game.monsters, monster);
          removeItemFromArray(this.game.bulletList, bullet);
        }
      }
    }
    // Bullet-border collision checking
    for (const bullet of this.game.bulletList) {
      if (bullet.x < 0 || bullet.x > this.game.background.image.width) {
        removeItemFromArray(this.game.bulletList, bullet);
      }
    }

    // Hunter-letter collision checking
    for (const letter of this.game.letters) {
      if (isColliding(this.game.hunter, letter)) {
        this.handleHunterLetterCollision(letter);
        break;
      }
    }

    // Hunter-pad collision checking
    for (const pad of this.game.pads) {
      if (isColliding(this.game.hunter, pad)) {
        this.game.currentPad = this.game.hunter.handleCollisionWithPad(pad);
      }
    }

    // Verify the hunter departure from pad
    if (this.game.currentPad != null && (this.game.hunter.x + this.game.hunter.width < this.game.currentPad.x || this.game.hunter.x > this.game.currentPad.x + this.game.currentPad.width)) {
      this.game.currentPad = null;
    }
  }

  handleHunterLetterCollision(letter) {
    let myIndexes = findAllIndexes(this.game.question.word, letter.char);
    this.game.bulletCounter.counter += myIndexes.length;
    if (myIndexes.length > 0) {
      // correct choice
      for (let j = 0; j < myIndexes.length; j++) {
        this.game.answer.collectChar(myIndexes[j], letter.char);
      }
    } else {
      const newMonster = this.game.monsterFactory.createMonster(letter.x - 200, letter.y);
      this.game.monsters.push(newMonster);
    }
    this.game.letters = this.game.letters.filter((item) => item.char !== letter.char);
  }
}
