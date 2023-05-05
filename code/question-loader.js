class QuestionLoader extends ImageLoader {
  constructor(imagePath, word) {
    super(imagePath);
    this.word = word;
  }

  load() {
    return super.load().then((image) => {
      return {
        image,
        word: this.word,
      };
    });
  }
}
