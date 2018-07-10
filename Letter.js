//Letter constructor
function Letter(letterVal) {
  this.letterVal = letterVal.toUpperCase();
  this.guessedRight = false;
  this.charReturn = function (guessedLetter) {
    if (this.guessedRight) {
      console.log("Correct!");
      return letterVal;
    }
    else {
      console.log("Incorrect!");
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

var newWord = new Letter("H");
newWord.checkGuess("H");
module.exports = Letter;