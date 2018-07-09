function Letter(strValue) {
  this.strValue = strValue;
  this.guessed = false;
  this.charReturn = function () {
    if (this.guessed) {
      console.log("Correct!")
      return strValue;
    }
    else if (!this.guessed) {
      console.log("Wrong!")
      return "_";
    }
  };
  this.checkGuess = function (guessedLetter) {
    if (guessedLetter === strValue) {
      this.guessed = true;
    }
    this.charReturn();
  };
};



var letter = new Letter("p");


letter.checkGuess("p");

module.exports = {
  letter: letter
}