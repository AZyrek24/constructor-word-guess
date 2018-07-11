var Word = require("./Word");
//Node Packages
//======================================================================================
var colors = require("colors");
var inquirer = require("inquirer");
var fs = require("fs");
// Variables
//======================================================================================
var guessesRemaining = 9;
var pickedWord = "";
var pickedWordArray = [];
var arrayOfLettersRemaining = [];
var pickedWordLetterObjects;
var guessedLetters = [];
var win = false;
// Functions
//======================================================================================

//Starts the game
function start() {
  guessesRemaining = 9;
  console.log("\n");
  pickWord();
}
//Picks a random word out of the 'wordlist.txt' data
function pickWord() {
  fs.readFile("wordlist.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    wordArray = data.split(",");    
    pickedWord = wordArray[Math.floor(Math.random() * wordArray.length)];

    //Sets array to compare as guesses occur
    pickedWordArray = pickedWord.split("");
    
    //Call Word constructor
    pickedWordLetterObjects = new Word(pickedWord);
    pickedWordLetterObjects.wordDisplayBuilder();
    instructions();
  });
}

//Asks to guess a letter, validates a single letter, runs newLetterGuessed()
function instructions() {
  if (win === false || guessesRemaining > 0) {
    inquirer.prompt([{
      type: "input",
      name: "guess",
      message: "Guess a Letter!",
      validate: function (value) {
        var input = value.trim();
        if (input.length === 1 && input.match(/^[a-zA-Z]+$/)) {
          return true;
        }
        console.log("\nMust be a " + "SINGLE LETTER.".blue + "Try Again!");
        return false;
      },
    }
    ]).then(function (answer) {
      pickedWordLetterObjects.newLetterGuessed(answer.guess.toUpperCase().trim());
      pickedWordLetterObjects.wordDisplayBuilder();
      arrayOfLettersRemaining = pickedWordArray.filter(function (element) { return element !== answer.guess.toUpperCase().trim()});
      console.log(arrayOfLettersRemaining);
      instructions();
    });
  }
  else if (win === true) {
    win();
  }
  else if (guessesRemaining < 0) {
    console.log("You Lose! Try Again!!!");
    start();
  }
}
//If user wins, start with a new word
function win() {
  console.log("You Win!! Try another one!!!".green);
  start();
}
function lose() {
  console.log("You Lost!! Try another one!!!".red);
}

// Main Process
//======================================================================================
start();