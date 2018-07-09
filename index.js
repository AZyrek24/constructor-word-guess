var Word = require("./Word");
var Letter = require("./Letter");
//Node Packages
//======================================================================================
var colors = require("colors");
var inquirer = require("inquirer");
var fs = require("fs");
// Variables
//======================================================================================
var guessesRemaining = 9;
var wordArray = [];
var pickedWord = "";

// Functions
//======================================================================================
function start() {
  pickWord();
}
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
  ]).then(function (answers) {
    console.log(answers.guess.toUpperCase());
  });
}
function pickWord() {
  fs.readFile("wordlist.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    //Creates and array of words (from the wordlist.txt data) to select a random word from 
    wordArray = data.split(",");
    console.log(wordArray);
    pickedWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    console.log(pickedWord);
  });
}



// Main Process
//======================================================================================
start();