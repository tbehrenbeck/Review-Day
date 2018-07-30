var wordBox = $("#wordBox");
var guessBox = $("#guessBox");
var winBox = $("#winBox");
var guessRemain = $("#guessesRemaining")


var gameObject = {
    "guessesRemaining": 13,
    "wins": 0,
    "correctCounter": 0,
    "magicWord": "",
    "wordBank": ["happy", "sad", "mad", "fuckyou"],
    "guessesMade": "",
    "wrongGuesses": "",

    "newWord": function(){
        var randomNumber = Math.floor(Math.random() * this.wordBank.length)
        this.magicWord = this.wordBank[randomNumber];
    },
    "resetGame": function(){
        this.guessesMade = "";
        this.wrongGuesses = "";
        guessBox.empty();
        this.guessesRemaining = 13;
        this.correctCounter = 0;
        guessRemain.text(this.guessesRemaining);
        winBox.text(this.wins);
        this.newWord();
        this.render();
    },
    "render": function(){
        wordBox.empty();
        var newHTML = "";
        for(var i = 0; i < this.magicWord.length; i++){
            newHTML += "<span class='"+ this.magicWord[i] + "'>-</span>";
        }
        wordBox.append(newHTML);
    },
    "keyPress": function(key){
        if(this.guessesMade.indexOf(key) === -1){
            this.guessesMade += key;
            if(this.magicWord.indexOf(key) !== -1 ){
                var keyString = "." + key//.toUpperCase();
                $(keyString).text(key);
                this.correctCounter += $(keyString).length;
            }
            else{
                this.guessesRemaining--;
                guessRemain.text(this.guessesRemaining);
                this.wrongGuesses += key;
                var wrongHTML = "<span>" + key + ",</span>";
                guessBox.append(wrongHTML);
                if(this.guessesRemaining === 0){
                    this.resetGame();
                }
            }
            if(this.correctCounter === this.magicWord.length){
                this.wins++;
                this.resetGame();
            }
        }
    }
}


gameObject.resetGame();

$("body").keyup(function(key){
    gameObject.keyPress(key.key);
});
