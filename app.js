// HTML elements
const dealerElement = document.getElementById('dealerHand');
const playerElement = document.getElementById('playerHand');
const dealerScoreElement = document.getElementById('dealerScore');
const playerScoreElement = document.getElementById('playerScore');
const gameResultElement = document.getElementById('gameResult');
const stayButton = document.getElementById('stayButton');
const hitMeButton = document.getElementById('hitMeButton');

const straightDeck = ['A-C', 'A-S', 'A-H', 'A-D', '2-C', '2-S', '2-H', '2-D', '3-C', '3-S', '3-H', '3-D', '4-C', '4-S', '4-H', '4-D', '5-C', '5-S', '5-H', '5-D', '6-C', '6-S', '6-H', '6-D', '7-C', '7-S', '7-H', '7-D', '8-C', '8-S', '8-H', '8-D', '9-C', '9-S', '9-H', '9-D', '10-C', '10-S', '10-H', '10-D', 'J-C', 'J-S', 'J-H', 'J-D', 'Q-C', 'Q-S', 'Q-H', 'Q-D', 'K-C', 'K-S', 'K-H', 'K-D'];

function shuffleDeck() {
    let shuffledDeck = [];
    let sortedDeck = straightDeck;
    while (sortedDeck.length > 0) {
        let randomCard = sortedDeck[Math.floor(Math.random() * sortedDeck.length)];
        shuffledDeck.push(randomCard);
        sortedDeck = sortedDeck.filter(function(item) { // removes the random card from the sorted deck
            return item !== randomCard;
        });
    }
    return shuffledDeck
}

const shuffledDeck = shuffleDeck();

let card = 3; // card position in the shuffled deck
let dealerHand = [shuffledDeck[0], shuffledDeck[1]];
let playerHand = [shuffledDeck[2], shuffledDeck[3]];

// takes hand and returns score
function handScore(handArray) {
    let score = 0;
    let aceArray = []; // to revalue aces from 11 to 1 depending on score
    for (let card = 0; card < handArray.length; card++) {
        // gets card rank (i.e ace, 4, jack)
        const rank = handArray[card].split("-")[0]; 
        if (rank === 'J' || rank === 'Q' || rank === 'K') {
            score += 10;
        }
        else if (rank === 'A') {
            score += 11;
            aceArray.push(rank);
        }
        else {
            score += Number(rank);
        }
    }
    for (ace = 0; ace < aceArray.length; ace++) {
        if (score > 21) {
            score -= 10;
        }
    }
    return score;
}

// displays the content in the HTML element
function display(element, content) {
    element.innerHTML = content;
    element.style.display = 'block';
}

// gives 'start game' button functionality
function startGame(){
    display(dealerElement, '<div>Dealer\'s Cards</div>' + dealerHand[0]);
    display(playerElement, '<div>Player\'s Cards</div>' + playerHand);
    display(playerScoreElement, handScore(playerHand));
}

// gives player card of 'hit me' is clicked and hand <= 21
function hitMe() {
    playerHand.push(shuffledDeck[card + 1]);
    if (handScore(playerHand) > 21) {
        display(playerElement, '<div>Player\'s Cards</div>' + playerHand);
        display(gameResultElement, '<h2>You Lose :(</h2>');
    }
    else {
        display(playerElement, '<div>Player\'s Cards</div>' + playerHand);
        card++;
    }
    return playerHand;
}

// 'hit me' onclick displays player score. If player busts, shows dealer score and game result
function playerHandScore() {
    if (playerScore > 21) {
        display(playerScoreElement, handScore(playerHand));
        // shows game result, dealer score and dealer hand if player busts
        display(gameResultElement, youLose);
        display(dealerScoreElement, handScore(dealerHand));
        display(dealerElement, '<div>Dealer\'s Cards</div>' + dealerHand);
    }
    else {
        display(playerScoreElement, handScore(playerHand));
    }
    return handScore(playerHand);
}

// displays 
function updateDealerHand() {
    while (handScore(dealerHand) < 17) {
        dealerHand.push(shuffledDeck[4 + card]);
        card++;
    }
    display(dealerElement, '<div>Dealer\'s Cards</div>' + dealerHand);
    display(dealerScoreElement, handScore(dealerHand));
    return dealerHand;
}

function findWinner() {
    if (handScore(updateDealerHand()) > 21) {
        display(gameResultElement, '<h2>You Win!</h2>');
    }
    else if (playerHandScore() > handScore(updateDealerHand()) && playerHandScore() <= 21) {
        display(gameResultElement, '<h2>You Win!</h2>');
    }
    else if (playerHandScore() > 21) {
        display(gameResultElement, '<h2>You Lose :(</h2>');
    }
    else if (playerHandScore() < handScore(updateDealerHand()) && playerHandScore() <= 21) {
        display(gameResultElement,'<h2>You Lose :(</h2>')
    }
    else {
        display(gameResultElement, '<h2>Tied</h2>');
    }
}