/*----- constants -----*/
const maxLives = 3;
const card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.getElementById('card-deck');

/*----- app's state (variables) -----*/
let wrongMoves = 0;
let openedCards = [];

/*----- cached element references -----*/
const playGame = document.getElementById('start-game');

/*----- event listeners -----*/
playGame.addEventListener('click', startGame);

/*----- functions -----*/

function startGame() {
    startingAudio();
    cards = shuffleDeck(cards);
}

function shuffleDeck(cardArray) {
    let currentIndex = cardArray.length, tempVal, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempVal = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = tempVal;
    }
    return cardArray;
}

function startingAudio() {
    let gameStartAudio = new Audio('https://www.superluigibros.com/downloads/sounds/NES/SMB3/mp3/smb3-overworld.mp3');
    gameStartAudio.loop = false;
    gameStartAudio.play();
}

function winnerAudio() {
    let winnerAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav');
    winnerAudio.loop = false;
    winnerAudio.play();
}

function loserAudio() {
    let loserAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav');
    loserAudio.loop = false;
    loserAudio.play();
}