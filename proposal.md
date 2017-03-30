# Seek

Given a set of letters, the player will try to find as many words as possible in the allotted time.

## Functionality & MVP

Players will be able to:

- [ ] Input letters via the keyboard
- [ ] Press enter to submit words
- [ ] Correct submitted words communicated to the player via effects
- [ ] Incorrect or invalid submissions will be communicated via effects
- [ ] Start, Pause, and Continue the game via the space bar

Additionally the project will include
- [ ] Production ReadMe
- [ ] Game instructions

## Wireframes

Visual inspiration from [Bonza](https://play.google.com/store/apps/details?id=air.au.com.minimega.bonza)

Layout inspiration from [Word Unscramble]()

![Alt text](https://github.com/fafafariba/fafafariba.github.io/blob/master/assets/splash_wireframe.png?raw=true "Splash")

![Alt text](https://github.com/fafafariba/fafafariba.github.io/blob/master/assets/layout_wireframe.png?raw=true "Game")

## Architecture & Technologies

### `word.js` file
* Select random 5 letter word
* Determine combinations
* Parse through dictionaries to find valid words

### `view.js` file
* Execute animations
* Render to DOM
* Capture click and keyboard events

### `game.js` file
* Instantiate word and timer
* Keep track of guesses
* Verify validity of guesses

### `timer.js` file
* Decrement, pause, and resume timer
* Render updated time

### `main.css` file
* Styling
  * Color scheme
  * Font
  * Letter tiles
  * Animations
  * Flashing of correct/incorrect words
  * Sound effects


## Technologies

This game will use Vanilla Javascript, jQuery, Webpack for bundling, and Babel for converting ES6 to ES5 for browsers.

It will also utilize the [Scrabble word game dictionary](https://www.wordgamedictionary.com/word-lists/) as a reference.

## Implementation Timeline

### Day 1

- [ ] Format dictionaries
- [ ] word.js file
- [ ] game.js file



### Day 2
- [ ] view.js file
- [ ] timer.js file
- [ ] keyboard controls

### Day 3

- [ ] Styling
  * Color scheme
  * Font
- [ ] Animations
  * Flashing of correct/incorrect words

### Day 4

- [ ] Sound Effects

## Bonus Features

* Scoring
* A 'shuffle' letters button
* Multi-levels featuring 6 letter and 7 letter words
