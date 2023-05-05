class ResourceLoader {
  constructor(game) {
    this.game = game;
  }

  loadAllQuestions(rawQuestionList) {
    let questionLoaderList = [];
    for (const quest of rawQuestionList) {
      const questionLoader = new QuestionLoader(quest.imagePath, quest.word.toUpperCase());
      questionLoaderList.push(questionLoader.load());
      if (questionLoaderList.length === MAX_LOADING_QUESTIONS) {
        break;
      }
    }

    return Promise.all(questionLoaderList).then((rawQuesionList) => {
      const width = 210;
      const height = 210;
      const gap = 32;
      let x = gap;
      let y = 190;

      this.game.questionList = [];
      for (const rawQuestion of rawQuesionList) {
        const question = new Question(this.game.camera, rawQuestion.word, rawQuestion.image, x, y, width, height);

        x += width + gap;
        if (x > this.game.canvas.width - width) {
          x = gap;
          y += height + gap;
        }
        this.game.questionList.push(question);
      }
    });
  }

  loadGameResources() {
    // Resource loading;
    const backgroundImageLoader = new ImageLoader("assets/images/background.jpg");

    const leftIdleHunterImageLoader = new ImageLoader("assets/images/left-idle-sheet.png");
    const rightIdleHunterImageLoader = new ImageLoader("assets/images/right-idle-sheet.png");

    const leftShootingImageLoader = new ImageLoader("assets/images/left-shooting-sheet.png");
    const rightShootingImageLoader = new ImageLoader("assets/images/right-shooting-sheet.png");

    const rightHunterImageLoader = new ImageLoader("assets/images/right-run-sheet.png");
    const leftHunterImageLoader = new ImageLoader("assets/images/left-run-sheet.png");

    const padImageLoader = new ImageLoader("assets/images/pad.png");
    const bgImageOfCharLoader = new ImageLoader("assets/images/char.png");
    const bgImageOfAnswerCharLoader = new ImageLoader("assets/images/answer.png");

    const bulletImageLoader = new ImageLoader("assets/images/bullet.png");
    const monsterImageLoader = new ImageLoader("assets/images/jinn.png");
    const btnHomeImageLoader = new ImageLoader("assets/images/home.png");

    const promises = [
      backgroundImageLoader.load(),
      //
      leftIdleHunterImageLoader.load(),
      rightIdleHunterImageLoader.load(),
      //
      leftShootingImageLoader.load(),
      rightShootingImageLoader.load(),
      //
      rightHunterImageLoader.load(),
      leftHunterImageLoader.load(),
      //
      padImageLoader.load(),
      bgImageOfCharLoader.load(),
      bgImageOfAnswerCharLoader.load(),
      //
      bulletImageLoader.load(),
      monsterImageLoader.load(),
      btnHomeImageLoader.load(),
    ];

    return Promise.all(promises)
      .then((results) => {
        let startIndex = 0;
        this.game.backgroundImage = results[startIndex];
        //
        this.game.leftIdleHunterImage = results[++startIndex];
        this.game.rightIdleHunterImage = results[++startIndex];
        //
        this.game.leftShootingImage = results[++startIndex];
        this.game.rightShootingImage = results[++startIndex];
        //
        this.game.rightHunterImage = results[++startIndex];
        this.game.leftHunterImage = results[++startIndex];
        //
        this.game.padImage = results[++startIndex];
        this.game.bgImageOfChar = results[++startIndex];
        this.game.bgImageOfAnswerChar = results[++startIndex];
        //
        this.game.bulletImage = results[++startIndex];
        this.game.monsterImage = results[++startIndex];
        this.game.btnHomeImage = results[++startIndex];
      })
      .catch((error) => {
        console.log("Loading resources failed!", error);
      });
  }
}
