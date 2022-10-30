// global variables
let shuffledDeck; let dealerHand; let playerHand;
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
        else if (rank === 'gray_back') {}
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// takes hand array displays dealer hand and dealer score
function displayDealerHand(hand) {
    document.getElementById('dealerCards').style.display = 'block';
    const container = document.querySelector('#dealerCards');
    removeAllChildNodes(container);
    document.getElementById('dealerScore').innerHTML = handScore(hand);
    document.getElementById('dealerScore').style.display = 'inline-block';
    const element = document.getElementById('dealerCards');
    for (let i = 0; i < hand.length; i++) {
        let imgFileName = 'cards_images/' + hand[i] + '.png'
        const image = document.createElement('img');
        image.src = imgFileName;
        element.append(image);
    }
}

// displays dealer hand and dealer score
function displayPlayerHand() {
    document.getElementById('playerCards').style.display = 'block';
    const container = document.querySelector('#playerCards');
    removeAllChildNodes(container);
    document.getElementById('playerScore').innerHTML = handScore(playerHand);
    document.getElementById('playerScore').style.display = 'inline-block';
    const element = document.getElementById('playerCards');
    for (let i = 0; i < playerHand.length; i++) {
        let imgFileName = 'cards_images/' + playerHand[i] + '.png'
        const image = document.createElement('img');
        image.src = imgFileName;
        element.append(image);
    }
}

function delay(ms) {
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')}, ms );
    })
}

// animation so cards come out of deck to player and dealer
// vertical: -.64 is up 1 is down
// horizontal: .41 is right & -.41 left
async function animation(vertical, horizontal) {
    let id = null;
    const elem = document.getElementById("animatedDeck");
    elem.style.display = 'block';
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
        if (pos == 380) {
            clearInterval(id);
        }
        else {
            pos+=10;
            elem.style.top = `calc(320px + ${pos}px * ${vertical})`;
            elem.style.left = `calc(${pos}px * ${horizontal})`;
        }
    }
    await delay(200);
    document.getElementById("animatedDeck").style.display = 'none';
}

// gives 'start game' button functionality
async function newGame() {
    document.getElementById('hitMeButton').disabled = false;
    document.getElementById('gameResult').style.display = 'none';
    document.getElementById('dealerCards').style.display = 'none';
    document.getElementById('playerCards').style.display = 'none';
    shuffledDeck = shuffleDeck();
    dealerHand = [shuffledDeck[0], shuffledDeck[1]];
    playerHand = [shuffledDeck[2], shuffledDeck[3]];
    animation(-.64, -.41);
    await delay(200);
    animation(-.64, .41);
    displayDealerHand([dealerHand[0], 'gray_back']);
    await delay(200);
    animation(1, -.41);
    await delay(200);
    animation(1, .41);
    displayPlayerHand();
    await delay(200);
}

function displayWin() {
    document.getElementById('gameResult').innerHTML = '<h3>🎉 You Win! 🎉</h3>';
    document.getElementById('gameResult').style.display = 'block';
    document.getElementById('hitMeButton').disabled = true;
}

function displayLoss() {
    document.getElementById('gameResult').innerHTML = '<h3>You Lose 😞</h3>';
    document.getElementById('gameResult').style.display = 'block';
    document.getElementById('hitMeButton').disabled = true;
}

// when 'hit me' button clicked
function hitMe() {
    playerHand.push(shuffledDeck[card + 1]);
    if (handScore(playerHand) > 21) {
        animation(1, .81);
        displayDealerHand(dealerHand);
        displayLoss();
    }
    else {  
        animation(1, .81);
        card++;
    }
    displayPlayerHand();
}

// On 'Stay' button click, if dealer score < 17 pushes new cards to their array
// displays the dealer hand and dealer score
async function updateDealerHand() {
    while (handScore(dealerHand) < 17) {
        dealerHand.push(shuffledDeck[card + 3]);
        card++;
    }
    // this adds a 1 second delay to adding cards to dealer hand (suspense)
    let delayArray = [dealerHand[0]];
    for (let i = 1; i < dealerHand.length; i++) {
        delayArray.push(dealerHand[i]);
        await delay(1000);
        if (i > 1) {
            animation(-.64, .81)
        }
        displayDealerHand(delayArray);
    }
}

async function findWinner() {
    // waits after dealer hand is shown
    await delay(1000 * (dealerHand.length - 1));
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
        document.getElementById('gameResult').innerHTML = '<h3>Tied</h3>';
        document.getElementById('gameResult').style.display = 'block';
    }
}