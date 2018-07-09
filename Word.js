var Letter = require("./Letter.js");

var Word = function (randomWord) {
  this.randomWord = randomWord;
  this.lettersArray = [];
  this.makeWord = function () {
    (this.randomWord).split("").forEach(element => {
      this.lettersArray.push(new Letter(element));
    });
    this.toString = function () {
      return this.lettersArray.join(" ");
    }
  };
  this.checkGuess = function (guessedLetter) {
    this.lettersArray.forEach(element => {
      element.checkGuess(guessedLetter);
    });
    console.log(this.lettersArray);
  }
}











module.exports = Word;