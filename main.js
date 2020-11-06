const maxLives = 5;

let wrongMoves = 0;
let openedCards = [];
let card = document.getElementsByClassName('card');
let cards = [...card];
let matchedCards = document.getElementsByClassName('matchedCard');
let totalLives = document.getElementById('hearts');

const playNewGame = document.getElementById('start-game');
const deck = document.getElementById('card-deck');
const victoryPopUp = document.getElementById('victoryModal');
const defeatPopUP = document.getElementById('defeatModal');


playNewGame.addEventListener('click', startNewGame);
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', openCard);
}

init();

function init() {
    openedCards = [];
    wrongMoves = 0;
    cards = shuffleDeck(cards);
    startingAudio();
    for (let i = 0; i < cards.length; i++) {
        deck.innerHTML = '';
        cards.forEach.call(cards, function(shuffledCard) {
            deck.appendChild(shuffledCard);
        });
        cards[i].classList.remove('openedCard', 'matchedCard', 'unmatchedCard');
    }
}

function startNewGame() {
    window.location.reload();
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
        openedCards[0].classList.add('matchedCard');
        openedCards[1].classList.add('matchedCard');
        matchedAudio();
        openedCards = [];
    } else {
        let newTotalLives = totalLives.removeChild(totalLives.lastElementChild);
        wrongMoves++;
        openedCards[0].classList.add('unmatchedCard');
        openedCards[1].classList.add('unmatchedCard');
        unmatchedAudio();
        setTimeout(function(){
            openedCards[0].classList.remove('openedCard', 'unmatchedCard');
            openedCards[1].classList.remove('openedCard', 'unmatchedCard');
            openedCards = [];
        },800);
    }
}

function winLoss() {
    if (wrongMoves === maxLives) {
        loserAudio();
        defeatPopUP.style.display = 'block';
        setTimeout(function(){
            defeatPopUP.style.display = 'none';
        },4000);
    } else if (matchedCards.length === cards.length){
        winnerAudio();
        victoryPopUp.style.display = 'block';
        setTimeout(function(){
            victoryPopUp.style.display = 'none';
        },5500);
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