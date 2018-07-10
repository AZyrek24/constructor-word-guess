//Letter constructor
function Letter(letterVal) {
  this.letterVal = letterVal.toUpperCase();
  this.guessedRight = false;
  this.charReturn = function () {
    if (this.guessedRight) {
      console.log("Correct!");
      return this.letterVal;
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
var newLetter = new Letter("A");
newLetter.checkGuess("A")
module.exports = Letter;