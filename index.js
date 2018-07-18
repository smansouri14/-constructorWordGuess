var Word = require("./word.js");
var inquirer = require("inquirer");
var isLetter = require('is-letter');

var userGuess = false;

//list of hangman words
var wordList = ["Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Bolivia", "Botswana", "Brazil",
    "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Croatia", "Cuba", "Cyprus", "Denmark", "Ecuador", "Egypt",
    "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait", "Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Lithuania", "Luxembourg",
    "Macedonia", "Madagascar", "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Nepal", "Netherlands", "Nicaragua", "Nigeria", "Norway", "Oman", "Pakistan", "Panama",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Rwanda", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "Somalia", "Spain",
    "Sudan", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "Togo", "Tonga", "Tunisia", "Turkey", "Uganda", "Ukraine", "United States", "Uruguay",
    "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zimbabwe"];

var randomWord;
var someWord;
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var userGuess = "";
var lettersGuessedArr = [];
var lettersGuessed = "";
var filledIn = 0;

//instructions on how to play game 
var instructions =
    "------------------------------------------------------" + "\r\n" +
    "Instructions:" + "\r\n" +
    "Use the keyboard to guess a letter" + "\r\n" +
    "If correct, the letter you guessed will replace the underscore." + "\r\n" +
    "If incorrect, the letter you guessed does not appear in the word." + "\r\n" +
    "You only get 10 guesses each game. If you run out of guesses you lose. " + "\r\n" +
    "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
    "------------------------------------------------------" + "\r\n" +
    "You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
    "------------------------------------------------------" + "\r\n";
console.log(instructions);
start();


//asks user if they want to play
function start() {
    var startGame = [
        {
            type: 'confirm',
            name: 'readyToPlay',
            message: 'Would you like to play?',
            default: true
        }
    ];
    inquirer.prompt(startGame).then(answers => {
        if (answers.readyToPlay) {
            console.log("Great! Lets Start!");
            beginGame();
        } else {
            console.log("Maybe next time");
            return;
        }
    });
}

//starting the game 
function beginGame() {
    //resets guessesLeft, changes random word, lettersArr
    guessesLeft = 10;
    chooseWord();
    //when game resets it empties out the guessed letters
    lettersGuessed = "";
    var lettersGuessedArr = [];
}

//function that picks a random word for the game
function chooseWord() {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    someWord = new Word(randomWord);
    console.log(someWord);
// tells the user how many letters are in the word
    console.log("Your word has " + randomWord.length + " letters.");
    console.log("Word to guess:");
//uses Word form word.js to split
    someWord.splitWord();
    someWord.makeLetters();
    guessLetter();
}

//asks user for a letter guess
function guessLetter() {
    console.log(filledIn +" " + someWord.letters.length + " " +  guessesLeft);
    if (filledIn < someWord.letters.length || guessesLeft > 0) {
        console.log("hello");
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess any letter:",
                validate: function (value) {
                    if (isLetter(value)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]).then(function (guess) {
            guess.letter.toUpperCase();
            console.log("You guessed: " + guess.letter.toUpperCase());
            userGuess = false;
            if (lettersGuessedArr.indexOf(guess.letter.toUpperCase()) > -1) {
                console.log("You already guessed that letter. Try again.");
                console.log("------------------------------------");
                guessLetter();
            } else if (lettersGuessedArr.indexOf(guess.letter.toUpperCase()) === -1) {
                lettersGuessed = lettersGuessed.concat(" " + guess.letter.toUpperCase());
                lettersGuessedArr.push(guess.letter.toUpperCase());

                console.log("letters that you have guessed: " + lettersGuessed);

//loops through all the letters and compares it t the letter guessed
                console.log("someWord.letters.length" + someWord.letters.length);
                for (i = 0; i < someWord.letters.length; i++) {
                    userGuess = false;
                    console.log(someWord.letters[i].character + " " + someWord.letters[i].letterGuessed + " " +  guess.letter.toUpperCase());
                    if(guess.letter === someWord.letters[i].character && someWord.letters[i].letterGuessed === false) {
                        someWord.letters[i].letterGuessed === true;
                        userGuess = true;
                        someWord.underscore[i] = guess.letter.toUpperCase();
                        filledIn++;
                        console.log("userGuess" + userGuess);
                        console.log("Correct");
                        if(userGuess) {
                            console.log("Correct!");
                            checkIfWon();
                        // }else {
                        //     console.log("Incorrect!");
                        //     guessesLeft--;
                        //     checkIfWon();
                        }
                    }
                    else{
                        console.log("Incorrect");
                        guessLetter();
                        
                    }
                }
                console.log("Word to guess:");
                someWord.splitWord();
                someWord.makeLetters();

            }
        });
    }
}
//Checks if the user won or lost the game after each letter that is guessed
function checkIfWon() {
    if(guessesLeft === 0) {
        console.log("----------------------------------");
        console.log("You Lost");
        console.log("The answer is " + randomWord);
        losses++;
        console.log("Wins: " + wins);
        console.log("Losses: " + losses);
        console.log("----------------------------------");
        reset();
    } else if (filledIn === someWord.letters.length) {
        console.log("----------------------------------");
        console.log("You Won!");
        wins++;
        console.log("Wins: " + wins);
        console.log("Losses: " + Losses);
        console.log("----------------------------------");
        reset();
    } else {
    guessLetter("");
}
}

function reset() {
    var playAgain = [
        {
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?",
            default: true
        }
    ];
    inquirer.prompt(playAgain).then(userWantsTo => {
        //restarts game 
        if (userWantsTo.playAgain){
            lettersGuessed = "";
            lettersGuessedArr = [];
            filledIn = 0;
            console.log("Next round starts now");
            start();
            //exists game
        } else {
            console.log("Hope you come back soon");
        }
    });
}
