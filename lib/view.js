
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

  }

  splash(event) {
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
    $("#seek-letter-container").remove();
    $("#instructions-animate").remove();
    $("#timer-round").removeClass("hidden");
    $("#scrambled-container").removeClass("hidden");
    $("#guesses-container").removeClass("hidden");
    $(".timer-round").removeClass("hidden");
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
    $(`#guess${position}`).text(letter).addClass("guessed");
  }

  clearLetters(){
    this.game.clearGuess();
    $(".guessed").text("").removeClass("guessed");
  }

  renderEndRound(){

    $("#timer-round").addClass("hidden");
    $("#guesses-container").addClass("hidden");
    $(".timer-round").addClass("hidden");
    $(".scrambled-container").addClass("hidden");
    $(".scrambled").remove();
    $('<p id="continue">Press SPACEBAR to continue</p>').hide()
      .appendTo($("#seek-letter-container")).slideDown();
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
    $('#guesses-container').addClass("glow");
    setTimeout(() => {
      $('#guesses-container').removeClass("glow");
      this.addWord(this.game.guesses);
      this.clearLetters();
    }, 500);
  }

  renderIncorrect(){
    $('#guesses-container').addClass("shake");
    setTimeout(() => {
      $('#guesses-container').removeClass("shake");
    }, 500);
  }

  addWord(word) {
    console.log(word);
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
          this.renderLetter(event.key);
        }
        break;
    }
  }

}

export default View;
