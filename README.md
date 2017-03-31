# Seek
[Seek](https://fafafariba.github.io/seek/) is a simple yet elegant Javascript based word game. Players are given a set of letters and must find as many words as possible in the time allotted.

![alt tag](https://fafafariba.github.io/seek/assets/seek_demo.gif)

## User Interface

Seek was designed with the user in mind. The game can be click with just a click and keyboard presses. Muted colors, a clean layout and ample spacing give the game it visual appeal.

## The Code

The game was built in the span of four days using Javascript, jQuery, CSS, and HTML.

### Algorithms

The core of Seek is the algorithm that finds all possible combinations of letters.

```javascript
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

```
When further filtered by word length and presence in the [Scrabble Dictionary](https://www.wordgamedictionary.com/word-lists/), the result is an array of all valid words that can be formed with the given letters.

## The Tech

Babel Javascript compiler provided a means of converting ES6 to the more browser compatible ES5. The Javascript package manager, Yarn, was used in lieu of npm.

## Acknowledgements

Musical accoutrement "Arurarian Dance" by Nujabes. 
