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

// Functions
//======================================================================================
function start() {
  instructions();
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
    console.log(answers.guess);
  });
}



// Main Process
//======================================================================================
start();