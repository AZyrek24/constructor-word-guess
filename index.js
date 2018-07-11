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
//Arrays
//======================================================================================
var pickedWordArray = [];
var arrayOfLettersRemaining = [];
var pickedWordLetterObjects;
var guessedLetters = [];
// Functions
//======================================================================================

//Starts the game
function start() {
  console.log("\nWord Topic: " + "Music Genres\n".green);
  guessesRemaining = 9;
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
      var guess = answer.guess.toUpperCase().trim();

      //Checks if letter guessed is correct and displays letters and blanks accordingly
      pickedWordLetterObjects.newLetterGuessed(guess);
      pickedWordLetterObjects.wordDisplayBuilder();

      //Stores guessed letters in an array
      guessedLetters.push(guess);
      console.log(guessedLetters);

      //Removes guessed letters from this array
      for (var i = 0; i < arrayOfLettersRemaining.length; i++) {
        arrayOfLettersRemaining = pickedWordArray.filter(function (element) { return element !== guess });
      }
      console.log(arrayOfLettersRemaining);
      //Checks if game is over with a win or loss
      checkIfWon();
      instructions();
    });
  }
}

//If user wins, start with a new word
function checkIfWon() {
  if (arrayOfLettersRemaining.length < 1) {
    console.log("You Win!! Try another one!!!".green);
    start();
  }
  else if (guessesRemaining < 1) {
    console.log("You Lost!! Try another one!!!".red);
  }
}
// Main Process
//======================================================================================
start();