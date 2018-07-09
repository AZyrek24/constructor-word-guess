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
function instructions() {
  inquirer.prompt([{
    name: "guess",
    message: "Guess a Letter!",
    validate: function (value) {
      if (value.length === 1 && value.match(/^[a-z]+$/)) {
        return true;
      }
      console.log("\nUnacceptable");
      return false;
    },
  }
  ]).then(function (answers) {
    console.log(answers.guess);
  });
}



// Main Process
//======================================================================================
instructions();