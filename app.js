let card = 3; // card position to be incremented in the shuffledDeck array

function shuffleDeck() {
    const straightDeck = ['A-C', 'A-S', 'A-H', 'A-D', '2-C', '2-S', '2-H', '2-D', '3-C', '3-S', '3-H', '3-D', '4-C', '4-S', '4-H', '4-D', '5-C', '5-S', '5-H', '5-D', '6-C', '6-S', '6-H', '6-D', '7-C', '7-S', '7-H', '7-D', '8-C', '8-S', '8-H', '8-D', '9-C', '9-S', '9-H', '9-D', '10-C', '10-S', '10-H', '10-D', 'J-C', 'J-S', 'J-H', 'J-D', 'Q-C', 'Q-S', 'Q-H', 'Q-D', 'K-C', 'K-S', 'K-H', 'K-D'];
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

// displays dealer hand and dealer score
function displayDealerHand(hand) {
    document.getElementById('dealerHand').innerHTML = '<div>Dealer\'s Cards</div>' + hand;
    document.getElementById('dealerHand').style.display = 'block';
    document.getElementById('dealerScore').innerHTML = handScore(hand);
    document.getElementById('dealerScore').style.display = 'block';
}

// displays dealer hand and dealer score
function displayPlayerHand(hand) {
    document.getElementById('playerHand').innerHTML = '<div>Player\'s Cards</div>' + hand;
    document.getElementById('playerHand').style.display = 'block';
    document.getElementById('playerScore').innerHTML = handScore(hand);
    document.getElementById('playerScore').style.display = 'block';
}

// gives 'start game' button functionality
function newGame(){
    shuffledDeck = shuffleDeck();
    dealerHand = [shuffledDeck[0], shuffledDeck[1]];
    playerHand = [shuffledDeck[2], shuffledDeck[3]];
    displayDealerHand([dealerHand[0]]);
    displayPlayerHand(playerHand);
}

function displayWin() {
    document.getElementById('gameResult').innerHTML = '<h2>You Win!</h2>';
    document.getElementById('gameResult').style.display = 'block';
}

function displayLoss() {
    document.getElementById('gameResult').innerHTML = '<h2>You Lose :(</h2>';
    document.getElementById('gameResult').style.display = 'block';
}

// when 'hit me' button clicked
// 1. adds card to playerHand array
// 2. if player score > 21 shows player & dealer hands, dealer's score, and says 'you lose'
// 3. if player score < 21 shows player hand and increments card position
function hitMe() {
    playerHand.push(shuffledDeck[card + 1]);
    if (handScore(playerHand) > 21) {
        displayDealerHand(dealerHand);
        displayPlayerHand(playerHand);
        displayLoss();
    }
    else {
        displayPlayerHand(playerHand);
        card++;
    }
}

// On 'Stay' button click, if dealer score < 17 pushes new cards to their array
// displays the dealer hand and dealer score
function updateDealerHand() {
    while (handScore(dealerHand) < 17) {
        dealerHand.push(shuffledDeck[4 + card]);
        card++;
    }
    displayDealerHand(dealerHand);
}

function findWinner() {
    if (handScore(dealerHand) > 21) {
        displayWin();
    }
    else if (handScore(playerHand) > handScore(dealerHand) && handScore(playerHand) <= 21) {
        displayWin();
    }
    else if (handScore(playerHand) > 21) {
        displayLoss();
    }
    else if (handScore(playerHand) < handScore(dealerHand) && handScore(playerHand) <= 21) {
        displayLoss();
    }
    else {
        document.getElementById('gameResult').innerHTML = '<h2>Tied</h2>';
        document.getElementById('gameResult').style.display = 'block';
    }
}