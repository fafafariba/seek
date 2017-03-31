import Words from './words';
import Timer from './timer';


class Game {
  constructor(){
    this.words = new Words();
    this.rounds = 0;
    this.correctWords = [];
    this.guesses = [];
    this.timer = new Timer();
    this.letters = this.copy(this.words.scrambledLetters);

    this.startTimer = this.startTimer.bind(this);
    this.allWordsGuessed = this.allWordsGuessed.bind(this);
    this.endRound = this.endRound.bind(this);
    this.renderEndRound;
    this.score;
  }

  copy(array) {
    return array.slice(0);
  }

  newRound(endRoundCallback){
    this.timer = new Timer;
    this.rounds++;
    $('#round').text(`${this.rounds}`);
    this.startTimer();
    this.renderEndRound = endRoundCallback;
  }

  startTimer(){
    this.timer.start(this.allWordsGuessed, this.endRound);
  }

  modifyLetters(letter){
    console.log("modiyfing letters");
    const idx = this.letters.indexOf(letter);
    debugger;
    if (idx > -1) {
      this.letters.splice(idx, 1);
      debugger;
    }
  }

  checkGuess(){
    console.log("checking guess");
    let word = this.guesses.join("");
    if (this.words.wordSet.includes(word) &&
        !this.correctWords.includes(word)) {
          console.log("correct guess");
      this.correctWords.push(word);
      return true;
    } else {
      console.log("incorrect guess");
      return false;
    }
  }

  clearGuess(){
    this.guesses = [];
    this.letters = this.copy(this.words.scrambledLetters);
  }

  allWordsGuessed(){
    return this.correctWords.length === this.words.wordSet.length;
  }

  endRound(){
    this.clearGuess();
    this.score = [this.correctWords.length, this.words.wordSet.length];
    this.correctWords = [];
    this.words = new Words();
    this.renderEndRound(this.score);
    this.score;
    console.log(this.score, "score");
    console.log(this.correctWords, "correctWords");
    console.log(this.guesses, "guesses");
    console.log(this.letters, "letters");
  }

}

export default Game;
