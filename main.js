/*----- constants -----*/
const maxLives = 3;
const card = document.getElementsByClassName('card');
let cards = [...card];
const deck = document.getElementById('card-deck');

/*----- app's state (variables) -----*/
let wrongMoves = 0;
let openedCards = [];
let countWrongMoves = document.querySelector('.livesLeft')


/*----- cached element references -----*/
const playGame = document.getElementById('start-game');

/*----- event listeners -----*/
playGame.addEventListener('click', startGame);
for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', displayCard);
}


/*----- functions -----*/
/*init();

function init(e) {
    render();
    console.log('init is firing')
}

function render() {
    console.log('render is firing');
}*/

function startGame() {
    startingAudio();
    cards = shuffleDeck(cards);
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        [].forEach.call(cards, function(addedCard) {
            deck.appendChild(addedCard);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disabled');
    }
    console.log('game has started')
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
    console.log('deck is shuffled');
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

function displayCard() {
    this.classList.toggle('openedCard');
    this.classList.toggle('showCard');
    this.classList.toggle('disabledCard');
}