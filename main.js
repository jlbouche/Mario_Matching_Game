/*----- constants -----*/
const maxLives = 3;
const deck = document.getElementById('card-deck');

/*----- app's state (variables) -----*/
let wrongMoves = 0;
let openedCards = [];
let matchedCards = document.getElementsByClassName('matchedCard');
let card = document.getElementsByClassName('card');
let cards = [...card];

/*----- cached element references -----*/
const playGame = document.getElementById('start-game');

/*----- event listeners -----*/
playGame.addEventListener('click', startGame);
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', showCard);
    card.addEventListener('click', openCard);
}

/*----- functions -----*/

function startGame() {
    openedCards = [];
    startingAudio();
    cards = shuffleDeck(cards);
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        Array.prototype.forEach.call(cards, function(shuffledCard) {
            deck.appendChild(shuffledCard);
        });
    }
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

function showCard() {
    this.classList.toggle('openedCard');
}

function openCard() {
    openedCards.push(this);
    let numofCardsOpened = openedCards.length;
    if (numofCardsOpened === 2) {
        doCardsMatch();
    }
}

function doCardsMatch() {
    if (openedCards[0].type === openedCards[1].type) {
        openedCards[0].classList.add('matchedCard');
        openedCards[1].classList.add('matchedCard');
        openedCards = [];
    } else {
        openedCards[0].classList.add('unmatchedCard');
        openedCards[1].classList.add('unmatchedCard');
        openedCards = [];
        return wrongMoves = wrongMoves + 1;
    }
}

function winLoss() {
    if (wrongMoves === maxLives) {
        loserAudio();
        alert('Sorry, you lost--try again?');
    } else if (matchedCards === 8){
        winnerAudio();
        alert('Congratulations, you won!');
    }
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
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