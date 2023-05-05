class Answer extends GameObject {
  constructor(camera, question, letterFactory) {
    super(camera);

    this.question = question;
    this.letterFactory = letterFactory;

    this.init();
  }

  init() {
    this.answerLetters = [];
    this.collectedChars = [];

    for (let i = 0; i < this.question.word.length; i++) {
      if (this.question.word[i] === " ") {
        this.collectedChars.push(" ");
      } else {
        this.collectedChars.push("?");
      }
    }
  }

  collectChar(index, char) {
    this.collectedChars[index] = char;

    const x = 122 + 50 * index;
    const y = 10;

    const letter = this.letterFactory.createAnswerLetter(char, x, y);
    this.answerLetters.push(letter);
  }

  draw() {
    // placeholders
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "yellow";

    let x = 130;
    let y = 18;
    for (let i = 0; i < this.collectedChars.length; i++) {
      if (this.collectedChars[i] !== " ") {
        this.ctx.strokeRect(x, y, 30, 30);
      }
      x += 50;
    }

    // answer
    for (const letter of this.answerLetters) {
      letter.draw();
    }
  }
}
