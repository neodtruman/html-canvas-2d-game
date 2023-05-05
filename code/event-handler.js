class EventHandler {
  constructor(game) {
    this.game = game;
  }

  bindMouseEventsOnStartScreen() {
    // Bind mouse events on the images of questions
    const mouseListenerOnStartScreen = (e) => {
      for (const question of this.game.questionList) {
        if (isInsideRect(e.offsetX, e.offsetY, question)) {
          this.game.canvas.removeEventListener("mouseup", mouseListenerOnStartScreen);

          this.game.currentState = GAME_PLAYING;
          this.game.question = question;

          this.game.createObjects();

          this.bindMouseEventOnPlayingScreen();
          this.bindKeyEvents();

          // Start the game loop
          requestAnimationFrame((time) => {
            this.game.gameLoop(time);
          });
        }
      }
    };
    this.game.canvas.addEventListener("mouseup", mouseListenerOnStartScreen);
  }

  bindMouseEventOnPlayingScreen() {
    const mouseListenerOnPlayingScreen = (e) => {
      if (isInsideRect(e.offsetX, e.offsetY, this.game.buttonHome)) {
        this.game.canvas.removeEventListener("mouseup", mouseListenerOnPlayingScreen);
        this.game.currentState = GAME_INITIAL;
        this.game.drawInitialScreen();
      }
    };

    this.game.canvas.addEventListener("mouseup", mouseListenerOnPlayingScreen);
  }

  bindKeyEvents() {
    document.addEventListener("keydown", (e) => {
      this.game.keys[e.key] = true;

      if (this.game.currentState === GAME_WIN && (this.game.keys.h || this.game.keys.H)) {
        this.game.currentState = GAME_INITIAL;
        this.game.drawInitialScreen();
      } else if (this.game.currentState === GAME_OVER && (this.game.keys.r || this.game.keys.R)) {
        this.game.currentState = GAME_PLAYING;
        this.game.restartPlaying();
      }
    });

    document.addEventListener("keyup", (e) => {
      this.game.keys[e.key] = false;
    });
  }
}
