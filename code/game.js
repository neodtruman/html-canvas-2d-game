class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = new Camera(this.canvas);

    this.ctx = canvas.getContext("2d");
    this.ctx.font = "bold 48px Sans-Serif";

    this.groundY = 826;
    this.gravity = 1;

    this.currentState = GAME_INITIAL;
    this.keys = {};

    this.questionList = [];
    this.bulletList = [];

    this.resourceLoader = new ResourceLoader(this);
    this.eventHandler = new EventHandler(this);
    this.collisionChecker = new CollisionChecker(this);
    this.wereObjectsCreated = false;
  }

  start() {
    // Loading questions and game resources
    const tasks = [this.resourceLoader.loadAllQuestions(rawQuestionList), this.resourceLoader.loadGameResources()];
    Promise.all(tasks).then(() => {
      this.drawInitialScreen();
    });
  }

  gameLoop(time) {
    // Chack if the answer is correct
    const str = this.answer.collectedChars.join("");
    if (this.question.word == str) {
      this.currentState = GAME_WIN;
      this.drawGameWinScreen();
    }

    // Update position and state
    this.update(time);

    if (this.currentState !== GAME_PLAYING) {
      // exit the loop if not in playing state
      return;
    }

    // Clear canvas before drawing
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw
    this.drawPlayingScreen();

    // Create animation loop
    requestAnimationFrame((time) => {
      this.gameLoop(time);
    });
  }

  update(time) {
    // Update hunter
    this.hunter.update(time, this.currentPad);
    this.hunter.controlHunter(time, this.keys);

    // Update camera
    this.camera.update();

    // Update monsters
    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].update(time);
    }

    // Update bullets
    for (const bullte of this.bulletList) {
      bullte.update();
    }

    this.collisionChecker.checkCollisions();
  }

  createObjects() {
    if (!this.wereObjectsCreated) {
      this.background = new Background(this.camera, this.backgroundImage);

      this.bulletFactory = new BulletFactory(this.camera, this.bulletImage);
      const bullet = this.bulletFactory.createBullet(10, 120);
      this.bulletCounter = new BulletCounter(this.camera, bullet);

      // Create new hunter
      this.hunter = new Hunter(this.camera, this.background, this.gravity, this.groundY, this.bulletFactory, this.bulletCounter);

      this.hunter.setImages({
        idle: {
          leftIdleImage: this.leftIdleHunterImage,
          rightIdleImage: this.rightIdleHunterImage,
          numFrames: 10,
        },
        shooting: {
          leftShootingImage: this.leftShootingImage,
          rightShootingImage: this.rightShootingImage,
          numFrames: 3,
        },
        run: {
          runLeftImage: this.leftHunterImage,
          runRightImage: this.rightHunterImage,
          numFrames: 8,
        },
      });

      this.camera.initialize(this.hunter, this.background);

      const padFactory = new PadFactory(this.camera, this.padImage);
      this.pads = padFactory.createAllPads(this.background.image.height);

      this.letterFactory = new LetterFactory(this.camera, this.bgImageOfChar, this.bgImageOfAnswerChar);

      this.monsterFactory = new MonsterFactory(this.camera, this.monsterImage);

      this.buttonHome = new Button(this.camera, this.btnHomeImage, this.canvas.width - 100, this.canvas.height - 100, 68, 68);
    }

    this.answer = new Answer(this.camera, this.question, this.letterFactory);
    this.initObjects();

    this.wereObjectsCreated = true;
  }

  initObjects() {
    this.monsters = [];
    this.bulletList = [];
    this.bulletCounter.counter = 0;
    this.currentPad = null;
    this.answer.init();
    this.hunter.init(this.bulletList);
    this.letters = this.letterFactory.createLettersForQuestion(this.question, this.pads);
  }

  drawInitialScreen() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;

    // Draw game title
    this.ctx.save();
    this.ctx.textAlign = "center";

    this.ctx.font = "bold 48px Sans-Serif";
    this.ctx.fillText("WORD HUNTER", this.canvas.width / 2, 80);

    this.ctx.font = "32px Sans-Serif";
    this.ctx.fillText("Select a picture to start!", this.canvas.width / 2, 130);
    this.ctx.restore();

    // Draw grid of images
    for (const question of this.questionList) {
      question.drawOnStartScreen();
    }

    // Bind mouse event
    this.eventHandler.bindMouseEventsOnStartScreen();
  }

  drawPlayingScreen() {
    this.background.draw();
    this.question.drawOnPlayingScreen();
    this.answer.draw();
    this.bulletCounter.draw();
    this.buttonHome.fixedDraw();

    // Draw pads
    for (const pad of this.pads) {
      pad.scaleDraw();
    }

    // Draw letters
    for (const letter of this.letters) {
      letter.draw();
    }

    // Draw monsters
    for (const monster of this.monsters) {
      monster.draw();
    }

    // Draw bullets
    for (const bullet of this.bulletList) {
      bullet.scaleDraw();
    }

    this.hunter.draw();
  }

  drawGameWinScreen() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "black";
    this.ctx.fillText("You're the WINNER.", 40, 100);
    this.ctx.fillText("Press 'H' to go HOME and try another word!", 40, 160);
  }

  drawGameOverScreen() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "black";
    this.ctx.fillText("Game Over. Press 'R' to Restart", 100, 100);
  }

  restartPlaying() {
    this.initObjects();

    // Start the game loop
    requestAnimationFrame((time) => {
      this.gameLoop(time);
    });
  }
}
