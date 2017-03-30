
import threeLetterObject from './threeLetterWords';
import fourLetterObject from './fourLetterWords';
import fiveLetterObject from './fiveLetterWords';

const threeLetterWords = threeLetterObject.map(word => word.word);
const fourLetterWords = fourLetterObject.map(word => word.word);
const fiveLetterWords = fiveLetterObject.map(word => word.word);

const length = fiveLetterWords.length;


class Words {
  constructor() {
    console.log("new word");
    this.randomWord = fiveLetterWords[this.randomWordSelector(length)];
    this.scrambledLetters = this.shuffle(this.randomWord.split(""));
    this.wordSet = this.filtered(this.scrambledLetters);
  }

 randomWordSelector(n){
   return Math.floor(Math.random() * n);
 }


 shuffle(array) {
  let i = 0, j = 0, temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//algorithm finding word combinations

 combinations(word) {
   if (word.length === 1) {
     return [word];
   } else {
     let previous = this.combinations(word.slice(0,word.length-1));
     let lastLetter = word[word.length-1];
     return previous.concat(this.partialCombos(previous, lastLetter))
     .concat([lastLetter]);
   }
 }

 partialCombos(words, letter) {
   let combos = [];

   words.forEach(word => {
     for (let i = 0; i <= word.length; i++) {
       let partialWord = word.slice(0, i) + letter + word.slice(i);
       combos.push(partialWord);
     }
   });

   return combos;
 }

 filtered(words) {
   const lengthFilter = this.combinations(words)
    .filter(word => word.length >= 3);
   const wordFilter = lengthFilter.filter(word => (
     threeLetterWords.includes(word) ||
     fourLetterWords.includes(word) ||
     fiveLetterWords.includes(word)
   ));
   return this.unique(wordFilter);
 }

 unique(words){
   let uniqueWords = [];

   words.forEach(word => {
     if (!uniqueWords.includes(word)) {
       uniqueWords.push(word);
     }
   });

   return uniqueWords;
 }

}

export default Words;
