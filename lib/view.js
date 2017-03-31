
class View {
  constructor(game, $el){
    console.log("new view");
    this.game = game;
    console.log("this.game", this.game);
    this.$el = $el;
    console.log('this.$el', this.$el);
    this.paused = false;
    this.introPlayed = false;

    $(document).click(this.splash.bind(this));

    this.newRoundSetup = this.newRoundSetup.bind(this);
    this.setScrambledLetters = this.setScrambledLetters.bind(this);
    this.renderGuess = this.renderGuess.bind(this);
    this.renderCorrect = this.renderCorrect.bind(this);
    this.renderIncorrect = this.renderIncorrect.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.renderLetter = this.renderLetter.bind(this);
    this.clearLetters = this.clearLetters.bind(this);
    this.renderCorrect = this.renderCorrect.bind(this);
    this.renderIncorrect = this.renderIncorrect.bind(this);
    this.addWord = this.addWord.bind(this);
    this.renderEndRound = this.renderEndRound.bind(this);
    this.endSplash = this.endSplash.bind(this);

  }

  splash(event) {
    $("#click").text("SEEK");
    if (!this.intro) {
      this.intro = true;
      let s = ("<div class='seek-letter'><h1>S</h1><div>");
      let e = ("<div class='seek-letter'><h1>E</h1><div>");
      let e2 = ("<div class='seek-letter'><h1>E</h1><div>");
      let k = ("<div class='seek-letter'><h1>K</h1><div>");

      let seek = [s, e, e2, k];
      seek.forEach((letter, idx )=>{
        $(letter).hide().appendTo("#seek-letter-container")
        .fadeIn(1000 * ( idx + 1 ));
      });

      let instructions = ("<h2>Instructions</h2><p>Seek as many words as you can before the timer runs out</p><p>A-Z = letters</p><p>BACKSPACE = clear</p><p>ENTER = submit</p><p>SPACEBAR = begin or pause</p>");

      setTimeout( () => {
        $("#seek-letter-container").fadeOut(2000);
        $("#seek-letter-container").promise().done(() => {
          $('#instructions-animate').removeClass("hidden");
          $(instructions).hide().appendTo('#instructions-animate')
            .fadeIn(2000);
          $(document).keydown(this.keyRouter.bind(this));
        });
      }, 1000);
    }
  }


  newRoundSetup(){
    this.clearLetters();
    $("#results-container").empty().addClass("hidden");
    $("#continue").remove();
    $("#seek-letter-container").remove();
    $("#instructions-animate").remove();
    $("#continue").remove();
    $("#timer-round").removeClass("hidden");
    $("#scrambled-container").removeClass("hidden");
    $("#guesses-container").removeClass("hidden");
    $(".words-container").removeClass("hidden");
    this.game.newRound(this.renderEndRound);
    this.setScrambledLetters();
  }

  setScrambledLetters(){
    this.game.words.scrambledLetters.forEach((letter, idx) => {
      $(`<div class="scrambled">${letter}</div>`).hide().appendTo($("#scrambled-container"))
      .fadeIn(200 * (idx + .25 ));
    });
  }

  renderLetter(letter){
    this.game.modifyLetters(letter);
    this.game.guesses.push(letter);
    let position = this.game.guesses.length;
    console.log("position", position);
    $(`#guess${position}`).text(letter).addClass("guessed");
  }

  clearLetters(){
    this.game.clearGuess();
    $(".guessed").text("").removeClass("guessed");
  }

  renderEndRound(score){

    $("#timer-round").addClass("hidden");
    $("#guesses-container div").text("");
    $("#guesses-container").addClass("hidden");
    $("#scrambled-container").addClass("hidden");
    $(".scrambled").remove();
    $(".words-container div").text("");
    $(".words-container").addClass("hidden");
    $(".rendered-word").removeClass("rendered-word");
    this.endSplash(score);
  }

  endSplash(score) {
    $("#results-container").removeClass("hidden");
    ["r", "e", "s", "u", "l", "t", "s"].forEach( (letter, idx) => {
      $(`<div class="results">${letter}</div>`).hide().appendTo($('#results-container'))
      .fadeIn(1000 * (idx + .25 )).delay(1000);
    });
    $(`<p id="continue">SCORE: ${score[0]} / ${score[1]} words found</p><p id="continue">Press SPACEBAR to play again</p>`)
    .hide().appendTo(this.$el).delay(1000).slideDown(500);
  }

  togglePause(){
    if (this.paused){
      this.game.startTimer();
      this.paused = false;
    } else {
      this.game.timer.pause();
      this.paused = true;
    }
  }

  renderGuess(){
    let validGuess = this.game.checkGuess();
    if (validGuess) {
      this.renderCorrect();
    } else {
      this.renderIncorrect();
    }
  }

  renderCorrect (){
    this.addWord(this.game.guesses);
    this.clearLetters();
  }

  renderIncorrect(){
    $('#guesses-container').addClass("shake");
    setTimeout(() => {
      $('#guesses-container').removeClass("shake");
    }, 500);
  }

  addWord(word) {
    let position = this.game.correctWords.length;
    $(`#word${position}`).text(word.join("")).addClass("rendered-word");
  }

  keyRouter(event){
    console.log(event.key);

    switch (event.key) {

      case 'Enter':
        event.stopPropagation();
        if (this.game.guesses.length > 2) {
          this.renderGuess();
        }
        break;
      case 'Backspace':
        event.stopPropagation();
        this.clearLetters();
        break;
      case " ":
        event.stopPropagation();
        if (this.game.timer.seconds === 10) {
          console.log("keyboard space new round setup");
          this.newRoundSetup();
        } else {
          this.togglePause();
        }
        break;
      default:
        event.stopPropagation();
        if (this.game.letters.length
          && this.game.letters.includes(event.key)
          && this.game.timer) {
            console.log("rendering letter");
          this.renderLetter(event.key);
        }
        break;
    }
  }

}

export default View;
