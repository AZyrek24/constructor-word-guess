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
  guessesRemaining = 6;
  guessedLetters = [];
  winOrLose = false;
  console.log("=============================".yellow);
  console.log("W O R D   G U E S S   G A M E".yellow);
  console.log("=============================".yellow);
  console.log("\nWord Topic: " + "Music Genres\n".blue);
  console.log("=============================".blue);
  console.log("Guesses Remaining: ".blue + guessesRemaining);
  console.log("=============================".blue);
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
    message: "Guess a Letter!".green,
    validate: function (value) {
      var input = value.trim();
      if (input.length === 1 && input.match(/^[a-zA-Z]+$/)) {
        return true;
      }
      else {
        console.log("\nMust be a " + "SINGLE LETTER.".blue + "Try Again!");
        return false;
      }
    },
  }
  ]).then(function (answer) {
    var guess = answer.guess.toUpperCase().trim();

    //Stores guessed letters in an array
    guessedLetters.push(guess);


    //Displays relative information in the console
    console.log("=============================".yellow);
    console.log("W O R D   G U E S S   G A M E".yellow);
    console.log("=============================".yellow);
    console.log("\nWord Topic: ".cyan + "Music Genres".blue);
    //Checks is a guess is incorrect, changes guesses remaining accordingly, updates display
    if (pickedWord.indexOf(guess) == -1) {
      guessesRemaining--;
      console.log("\n-----------------------------".red);
      console.log("Incorrect!!".red);
      console.log("-----------------------------".red);
    }
    else {
      console.log("\n-----------------------------".green);
      console.log("Correct!!".green);
      console.log("-----------------------------".green);
    }
    console.log("\n=============================".blue);
    console.log("Guesses Remaining: ".blue + guessesRemaining);
    console.log("Guessed Letters: ".yellow + guessedLetters.join(" ").yellow);
    console.log("=============================".blue);

    //Checks if letter guessed is correct in Word.js
    pickedWordLetterObjects.newLetterGuessed(guess);

    //Removes correctly guessed letters from this array
    pickedWordArray = pickedWordArray.filter(function (letter) { return letter != guess });

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

//If user wins or loses, logs appropriate text
function checkIfWon() {
  if (pickedWordArray.length < 1) {
    winOrLose = true;
    console.log("*****************************".green);
    console.log("YOU WIN!! Try another one!!!".green);
    console.log("*****************************".green);
  }
  else if (guessesRemaining < 1) {
    winOrLose = true;
    console.log("-----------------------------".red);
    console.log("YOU LOST!! Try another one!!!".red);
    console.log("-----------------------------".red);
  }
}
// Main Process
//======================================================================================
start();