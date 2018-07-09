//Colors package
var colors = require('colors');

function Letter(strValue) {
  this.strValue = strValue;
  this.guessed = false;
  this.charReturn = function () {
    if (this.guessed) {
      console.log("Correct!".green)
      return strValue;
    }
    else if (!this.guessed) {
      console.log("Wrong!".red)
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


letter.checkGuess("q");

// module.exports = {
//   letter: letter
// }