var Letter = require("./Letter.js");

//Word constructor
var Word = function (randomWord) {
  this.randomWord = randomWord;
  this.lettersArray = [];
  this.makeWordDisplay = function (pickedWord) {
    (this.randomWord).split("").forEach(element => {
      this.lettersArray.push(new Letter(element));
      this.lettersArray.forEach(element => {
        this.lettersArray.charReturn(this.lettersArray);
        console.log(this.lettersArray);
      })
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











module.exports = Word;