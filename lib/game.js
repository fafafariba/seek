import Words from './words';
import isEqual from 'lodash/isequal';
import Timer from './timer';
import union from 'lodash/union';


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
  }

  copy(array) {
    return union([], array);
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
    const idx = this.letters.indexOf(letter);
    if (idx > -1) this.letters.splice(idx, 1);
  }

  checkGuess(){
    let word = this.guesses.join("");
    if (this.words.wordSet.includes(word) &&
        !this.correctWords.includes(word)) {
      this.correctWords.push(word);
      return true;
    } else {
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
    this.correctWords = [];
    this.words = new Words();
  }

}

export default Game;
