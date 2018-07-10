var Letter = require("./Letter.js");

//Word constructor
var Word = function (randomWord) {
  this.letterObjectsArray = randomWord.split('').map(function (element) { return new Letter(element) });
  this.wordDisplayBuilder = function () {
    var wordtoGuess = "";
    for (var i = 0; i < this.letterObjectsArray.length; i++) {
      wordtoGuess += this.letterObjectsArray[i].charReturn() + " ";
    }
    console.log(wordtoGuess + "\n");
    return wordtoGuess;
  }
  this.newLetterGuessed = function (guessedLetter) {
    for (var i = 0; i < this.letterObjectsArray.length; i++) {
      this.letterObjectsArray[i].checkGuess(guessedLetter);
    }
    this.wordDisplayBuilder();
  }
}

module.exports = Word;









module.exports = Word;