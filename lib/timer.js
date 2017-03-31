class Timer {
  constructor(total) {
    this.seconds = 60;
    this.roundInterval;

    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.reset = this.reset.bind(this);
  }

  start (allWordsGuessed, endRound) {
    $("#pause").remove();
    this.roundInterval = setInterval( ()=> {
      if (this.seconds && !allWordsGuessed()) {
        this.decrementSeconds();
        $('#timer').text(`${this.seconds}`);
      } else {
        this.reset();
        endRound();
      }
    }, 1000);
  }

  decrementSeconds() {
    this.seconds-- ;
  }

  pause(){
    if (this.seconds) {
      clearInterval(this.roundInterval);
      $(".seek").append("<div id='pause'><p>GAME PAUSED</p><p>Press SPACEBAR to resume</p></div>");
    }
  }

  reset(){
    clearInterval(this.roundInterval);
    this.seconds = 60;
  }
}

export default Timer;
