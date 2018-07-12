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
var winOrLose = false;
//Arrays
//======================================================================================
var pickedWordArray = [];
var pickedWordLetterObjects = "";
var guessedLetters = [];
// Functions
//======================================================================================

//Starts the game
function start() {
  guessesRemaining = 9;
  guessedLetters = [];
  winOrLose = false;
  console.log("\nWord Topic: " + "Music Genres\n".blue);
  console.log("Guesses Remaining: ".blue + guessesRemaining);
  pickWord();
}
//Picks a random word out of the 'wordlist.txt' data
function pickWord() {
  fs.readFile("wordlist.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    pickedWordArray = data.split(",");
    pickedWord = pickedWordArray[Math.floor(Math.random() * pickedWordArray.length)];

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

    //Stores guessed letters in an array
    guessedLetters.push(guess);    

    //Checks is a guess is incorrect, changes guesses remaining accordingly
    if (pickedWord.indexOf(guess) == -1) {
      guessesRemaining--;
    }
    //Displays relative information in the console
    console.log("\nWord Topic: " + "Music Genres\n".blue);
    console.log("Guesses Remaining: ".blue + guessesRemaining);
    console.log("Guessed Letters: " + guessedLetters.join(" "));

    //Checks if letter guessed is correct
    pickedWordLetterObjects.newLetterGuessed(guess);

    //Removes correctly guessed letters from this array
    pickedWordArray = pickedWordArray.filter(function (letter) { return letter != guess });
    console.log(pickedWordArray);
    //Checks if game is over with a win or loss
    checkIfWon();
    if (winOrLose !== true) {
        instructions();
    }
    else {
      start();
    }
  });
}

//If user wins, start with a new word
function checkIfWon() {
  if (pickedWordArray.length < 1) {
    winOrLose = true;
    console.log("You Win!! Try another one!!!".green);
  }
  else if (guessesRemaining < 1) {
    winOrLose = true;
    console.log("You Lost!! Try another one!!!".red);
  }
}
// Main Process
//======================================================================================
start();