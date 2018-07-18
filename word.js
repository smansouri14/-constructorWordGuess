// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
//Word depends on the Letter constructor. So, we need to require Letter so that we can use it in the Word.js file (this file).
var Letter = require("./letters");

var Word = function(myWord) {
	//Take chosen word from word list.
	this.myWord = myWord;
	//This is an array of letters representing the letters of the random chosen word.
	this.letters = [];
	//This is an array of underscores representing the number of underscores needed for the random chosen word 
	//This is based on the number of letters in the word.
	this.underscore = [];
	//After  random word from the word list,  use the split method to add the letters to the this.letters array.
	this.splitWord = function() {
		this.letters = this.myWord.split("");
		//Determine number of underscores needed based on length of this.letters array in the Word constructor.
        numberUnderscoresNeeded = this.letters.length;

		//Use the .join method to join each underscore that pushed to the this.underscores array by a space.
		console.log(this.underscore.join(" "));
	}
	this.makeLetters = function() {
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);
			console.log(this.letters[i].showLetter());
		}
	}
}

//Export the Word constructor as a reference in index.js.
module.exports = Word;