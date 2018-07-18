function Letter(character) {
    this.character = character;
    //stores whether that letter has been guessed by the user
    this.letterGuessed = false;
    //a function that gives the user the character if it has been guessed or 
    //puts a "_" if it has not been guessed
    this.showLetter = function () {
        if (this.letterGuessed) {
            return this.character;
        } else {
            return "_";
        }
    }
    // takes character in as an argument and checks it against the character. 
    //Changes letterGuessed to true if guessed correctly
    this.updateLetters = function (guess) {
        if (guess === this.character) {
            this.letterGuessed = true;
        }
    }
}
//Exports Letter so we can use it in word.js
module.exports = Letter;