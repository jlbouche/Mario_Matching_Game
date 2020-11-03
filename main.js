/*----- constants -----*/
const maxLives = 3;


/*----- app's state (variables) -----*/


/*----- cached element references -----*/
const cardDeck = document.getElementsByClassName('deck');
const playGame = document.getElementById('start-game');

/*----- event listeners -----*/
playGame.addEventListener('click', startGame);

/*----- functions -----*/
init();

function init(e) {
    render();
    console.log('init is firing')
}

function render() {
    console.log('render is firing');
}

function startGame() {
    shuffleDeck(cardDeck);
    marioAudio();
}

function shuffleDeck() {
    
    console.log('deck is shuffled');
}

function marioAudio() {
    let marioAudio = new Audio('https://vgmdownloads.com/soundtracks/super-mario-bros/khbnvkqp/01%20-%20Super%20Mario%20Bros.mp3');
    marioAudio.loop = false;
    marioAudio.play();
}

