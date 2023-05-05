class LetterFactory {
  constructor(camera, questionLetterImg, answerLetterImg) {
    this.camera = camera;

    this.questionLetterImg = questionLetterImg;

    this.answerLetterImg = answerLetterImg;
  }

  createLettersForQuestion(question, padList) {
    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    // Convert word to character list
    const word = question.word;
    let charList = [...new Set(word)];
    removeItemFromArray(charList, " ");

    // Get all unused alphabets and shuffle them
    let unusedAlphabets = alphabets.filter((char) => !charList.includes(char));
    unusedAlphabets = shuffleArray(unusedAlphabets);

    // Add more letters from the unused alphabets to the character list
    let numOfLetters = question.word.length * 2;
    if (numOfLetters > padList.length) {
      numOfLetters = padList.length;
    }
    while (charList.length < numOfLetters) {
      charList.push(unusedAlphabets.shift());
    }

    // Shuffle the character list
    charList = shuffleArray(charList);

    // Create letters for the question
    let letters = [];
    for (let i = 0; i < charList.length; i++) {
      letters.push(this.createQuestionLetter(charList[i], padList[i]));
    }
    return letters;
  }

  createQuestionLetter(char, pad) {
    return new Letter(this.camera, this.questionLetterImg, char, LETTER_FOR_QUESTION, pad);
  }

  createAnswerLetter(char, x, y) {
    return new Letter(this.camera, this.answerLetterImg, char, LETTER_FOR_ANSWER, undefined, x, y);
  }
}
