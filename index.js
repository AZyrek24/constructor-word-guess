var Word = require("./Word");
//Node Packages
//======================================================================================
var colors = require("colors");
var inquirer = require("inquirer");
var fs = require("fs");
// Variables
//======================================================================================
var guessesRemaining = 9;
var randomWord = "";

// Functions
//======================================================================================

//Starts the game
function start() {
  guessesRemaining = 9;
  console.log("\n");
  pickWord();
}
//Asks to guess a letter, validates a single letter, runs newLetterGuessed()
function instructions() {
  inquirer.prompt([{
    type: "input",
    name: "guess",
    message: "Guess a Letter!",
    validate: function (value) {
      if (value.length === 1 && value.match(/^[a-zA-Z]+$/)) {
        return true;
      }
      console.log("\nMust be a " + "SINGLE LETTER.".blue + "Try Again!");
      return false;
    },
  }
  ]).then(function (answer) {
    randomWord.newLetterGuessed(answer.guess.toUpperCase());
    randomWord.wordDisplayBuilder();
  });
}
//Picks a random word out of the 'wordlist.txt' data
function pickWord() {
  fs.readFile("wordlist.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    wordArray = data.split(",");
    var pickedWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    randomWord = new Word(pickedWord);
    randomWord.wordDisplayBuilder();
    instructions();
  });
}



// Main Process
//======================================================================================
start();