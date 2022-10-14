const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const suits = ['C', 'S', 'H', 'D'];

function straightDeck() {
    let deck = [];
    for (let rank = 0; rank < ranks.length; rank++) {
        for (let suit = 0; suit < suits.length; suit++) {
            deck.push(ranks[rank] + "-" + suits[suit])
        }
    }
    return deck
}

function shuffleDeck() {
    let shuffledDeck = [];
    let sortedDeck = straightDeck();
    while (sortedDeck.length > 0) {
        // pushes random card from sorted deck to shuffled deck
        let randomCard = sortedDeck[Math.floor(Math.random() * sortedDeck.length)];
        shuffledDeck.push(randomCard);
        // removes the random card from the sorted deck
        sortedDeck = sortedDeck.filter(function(item) {
            return item !== randomCard;
        });
    }
    return shuffledDeck
}

const shuffledDeck = shuffleDeck();

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

let card = 4; // card position in the shuffled deck
let playerHand = [shuffledDeck[2], shuffledDeck[3]];
let dealerHand = [shuffledDeck[0], shuffledDeck[1]];

// HTML elements
const dealer = document.getElementById('dealerHand');
const player = document.getElementById('playerHand');
const dealerScore = document.getElementById('dealerScore');
const playerScore = document.getElementById('playerScore');
const gameResult = document.getElementById('gameResult');
const stayButton = document.getElementById('stayButton');
const hitMeButton = document.getElementById('hitMeButton');

// adds card to player when 'hit me' is clicked and hand <= 21. displays hand
function hitMe() {
    if (handScore(playerHand) > 21) {
        player.innerHTML = '<div>Player\'s Cards</div>' + playerHand;
    }
    else {
        playerHand.push(shuffledDeck[card + 1]);
        player.innerHTML = '<div>Player\'s Cards</div>' + playerHand;
        card++;
    }
    return playerHand;
}

// displays player score. If player busts, shows dealer score and game results when 'hit me' is clicked
function playerHandScore() {
    playerScore.style.display = 'block';
    if (handScore(playerHand) > 21) {
        playerScore.innerHTML = handScore(playerHand);
        // shows dealer score and hand if player busts
        dealerScore.style.display = 'block';
        dealerScore.innerHTML = handScore(dealerHand);
        dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerHand;
        // shows game result if player busts
        gameResult.style.display = 'block';
        gameResult.innerHTML = '<h2>You Lose :(</h2>';
    }
    else {
        playerScore.innerHTML = handScore(playerHand);
    }
    return handScore(playerHand);
}

function updateDealerHand() {
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerHand[0];
    while (handScore(dealerHand) < 17) {
        dealerHand.push(shuffledDeck[4 + card]);
        card++;
    }
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerHand;
    dealer.style.display = 'block';
    dealerScore.style.display = 'block';
    dealerScore.innerHTML = handScore(dealerHand);
    return dealerHand;
}

function findWinner() {
    gameResult.style.display = 'block';
    if (handScore(updateDealerHand()) > 21) {
        gameResult.innerHTML = '<h2>You Win!</h2>';
    }
    else if (playerHandScore() > handScore(updateDealerHand()) && playerHandScore() <= 21) {
        gameResult.innerHTML = '<h2>You Win!</h2>';
    }
    else if (playerHandScore() > 21) {
        gameResult.innerHTML = '<h2>You Lose :(</h2>';
    }
    else if (playerHandScore() < handScore(updateDealerHand()) && playerHandScore() <= 21) {
        gameResult.innerHTML = '<h2>You Lose :(</h2>';
    }
    else {
        gameResult.innerHTML = '<h2>Tied</h2>';
    }
}

// gives 'start game' button functionality
document.querySelector('button').addEventListener('click', function(){
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerHand[0];
    dealer.style.display = 'block';
    player.innerHTML = '<div>Player\'s Cards</div>' + playerHand
    player.style.display = 'block';
    playerScore.style.display = 'block';
    playerScore.innerHTML = handScore(playerHand);
})
