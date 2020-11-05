/*----- constants -----*/
const maxLives = 5;

/*----- app's state (variables) -----*/
let wrongMoves = 0;
let openedCards = [];
let card = document.getElementsByClassName('card');
let cards = [...card];
let matchedCards = document.getElementsByClassName('matchedCard');

/*----- cached element references -----*/
const playGame = document.getElementById('start-game');
const deck = document.getElementById('card-deck');
const victoryPopUp = document.getElementById('victoryModal');
const defeatPopUP = document.getElementById('defeatModal');

/*----- event listeners -----*/
playGame.addEventListener('click', startGame);
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', openCard);
}

/*----- functions -----*/

function startGame() {
    openedCards = [];
    wrongMoves = 0;
    startingAudio();
    cards = shuffleDeck(cards);
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        Array.prototype.forEach.call(cards, function(shuffledCard) {
            deck.appendChild(shuffledCard);
        });
        cards[i].classList.remove('openedCard', 'matchedCard', 'unmatchedCard');
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

function openCard() {
    this.classList.toggle('openedCard');
    openedCards.push(this);
    let numofCardsOpened = openedCards.length;
    if (numofCardsOpened === 2) {
        doCardsMatch();
        winLoss();
    }
}

function doCardsMatch() {
    if (openedCards[0].type === openedCards[1].type) {
        matchedAudio();
        openedCards[0].classList.add('matchedCard');
        openedCards[1].classList.add('matchedCard');
        openedCards = [];
    } else {
        loseLife();
        unmatchedAudio();
        wrongMoves++;
        openedCards[0].classList.add('unmatchedCard');
        openedCards[1].classList.add('unmatchedCard');
        setTimeout(function(){
            openedCards[0].classList.remove('openedCard', 'unmatchedCard');
            openedCards[1].classList.remove('openedCard', 'unmatchedCard');
            openedCards = [];
        },1100);
    }
}

function loseLife() {
    let totalLives = document.getElementById('hearts');
    totalLives.removeChild(totalLives.lastElementChild);
}

function winLoss() {
    if (wrongMoves === maxLives) {
        loserAudio();
        defeatPopUP.style.display = 'block';
        setTimeout(function(){
            defeatPopUP.style.display = 'none';
        },4100);
    } else if (matchedCards.length === cards.length){
        winnerAudio();
        victoryPopUp.style.display = 'block';
        setTimeout(function(){
            victoryPopUp.style.display = 'none';
        },4100);
        }
}

function startingAudio() {
    let gameStartAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_pipe.wav');
    gameStartAudio.play();
}

function matchedAudio() {
    let cardMatchAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_1-up.wav');
    cardMatchAudio.play();
}

function unmatchedAudio() {
    let cardUnmatchAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_bowserfalls.wav');
    cardUnmatchAudio.play();
}

function winnerAudio() {
    let winnerAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_stage_clear.wav');
    winnerAudio.play();
}

function loserAudio() {
    let loserAudio = new Audio('https://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav');
    loserAudio.play();
}