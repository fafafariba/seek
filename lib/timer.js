class Timer {
  constructor(total) {
    console.log("new timer");
    this.seconds = 10;
    this.roundInterval;

    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.reset = this.reset.bind(this);
  }

  start (allWordsGuessed, endRound) {
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
    }
  }

  reset(){
    clearInterval(this.roundInterval);
    this.seconds = 60;
  }
}

export default Timer;
