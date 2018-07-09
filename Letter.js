//Colors package
var colors = require('colors');

function Letter(strValue) {
  this.strValue = strValue.toUpperCase();
  this.guessedRight = false;
  this.charReturn = function () {
    if (this.guessedRight) {
      console.log("Correct!".green)
      return strValue;
    }
    else if (!this.guessedRight) {
      console.log("Wrong!".red)
      return "_";
    }
  };
  this.checkGuess = function (guessedLetter) {
    if (guessedLetter.toUpperCase() === strValue) {
      this.guessedRight = true;
    }
  };
};

module.exports = Letter;