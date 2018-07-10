var Letter = require("./Letter.js");

//Word constructor
var Word = function (randomWord) {
  this.letterObjectsArray = randomWord.split('').map(function(element){return new Letter(element)});
  this.wordDisplay = function(letters) {
    var wordtoGuess = "";
    for (var i = 0; i < this.letterObjectsArray.length; i++) {
      wordtoGuess += this.letterObjectsArray[i].charReturn() + " ";
    }
    return wordtoGuess;
  }
  // this.checkGuess = function (guessedLetter) {
  //   this.lettersArray.forEach(element => {
  //     element.checkGuess(guessedLetter);
  //   });
  //   console.log(this.lettersArray);
  // }
}

module.exports = Word;


var newWord = new Word("HELLO");

newWord.wordDisplay();








module.exports = Word;