//Letter constructor
function Letter(letterVal) {
  this.letterVal = letterVal.toUpperCase();
  this.guessedRight = false;
  this.charReturn = function (letter) {
    if (this.guessedRight) {
      return this.letterVal;
    }
    else {
      return "_";
    }
  };
  this.checkGuess = function (guessedLetter) {
    if (guessedLetter === this.letterVal) {
      this.guessedRight = true;
      this.charReturn();
    }
    else {
      this.charReturn();
    }
  };
};

module.exports = Letter;