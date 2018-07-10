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
  console.log("\n");
  pickWord();
}
//Asks to guess a letter, checks that it is a single letter and not a symbol or number, then runs newLetterGuessed() function
function instructions() {
  inquirer.prompt([{
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
    randomWord.newLetterGuessed(answer);
  });
}
//Picks a random word out of the wordlist.txt data
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