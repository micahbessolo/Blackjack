const cards = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const suits = ['C', 'S', 'H', 'D'];

function straightDeck() {
    let deck = [];
    for (let c = 0; c < cards.length; c++) {
        for (let s = 0; s < suits.length; s++) {
            deck.push(cards[c] + "-" + suits[s])
        }
    }
    return deck
}

let deck = straightDeck();

function shuffleDeck() {
    let shuffledDeck = [];
    let sortedDeck = deck;
    while (sortedDeck.length > 0) {
        // gets random position within the sorted deck
        let randomCard = sortedDeck[Math.floor(Math.random() * sortedDeck.length)];
        shuffledDeck.push(randomCard);
        // removing the random card from the sorted deck
        sortedDeck = sortedDeck.filter(function(item) {
            return item !== randomCard;
        });
    }
    return shuffledDeck
}

let shuffledDeck = shuffleDeck()

// starting dealer cards
function dealerCards() {
    let dealer = [];
    dealer.push(shuffledDeck[0], shuffledDeck[1]);
    return dealer;
}

// starting player cards
function playerCards() {
    let player = [];
    player.push(shuffledDeck[2], shuffledDeck[3]);
    return player;
}

// give the current score of a hand
function handValue(array) {
    let score = 0;
    let aceArray = []; // to revalue aces from 11 to 1 depending on score
    // goes through array/cards
    for (let i = 0; i < array.length; i++) {
        // gets card rank (i.e ace, 4, jack)
        const rank = array[i].split("-")[0]; 
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
    return score
}

// selects HTML elements to manipulate
const dealer = document.getElementById('dealerHand');
const player = document.getElementById('playerHand');
const dealerScore = document.getElementById('dealerScore');
const playerScore = document.getElementById('playerScore');

// adds 1 card to the hand
let i = 4;
let array = playerCards();

// adds card when 'hit me' is clicked
function hitMe() {
    i++
    array.push(shuffledDeck[4 + i]);
    if (handValue(array) > 21) {
        player.innerHTML = '<div>Player\'s Cards</div>' + array;
        document.getElementById("hitMeButton").disabled = true;
    }
    else {
        player.innerHTML = '<div>Player\'s Cards</div>' + array;
    }
    return array;
}

// displays score when 'hit me' is clicked
function playerHandScore() {
    if (handValue(array) > 21) {
        playerScore.style.display = 'block';
        playerScore.innerHTML = '<div>Busted</div>';
    }
    else {
        playerScore.style.display = 'block';
        playerScore.innerHTML = handValue(array);
    }
    return handValue(array);
}

const dealerC = dealerCards();

function updateDealerHand() {
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerCards();
    if (handValue(dealerC) < 17) {
        dealerC.push(shuffledDeck[4 + i]);
    }
    else if (handValue(dealerC) > 21) {}
    else {}
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerC;
    dealer.style.display = 'block';
    dealerScore.style.display = 'block';
    dealerScore.innerHTML = handValue(dealerC);
    return dealerC;
}

// gives 'start game' button functionality
document.querySelector('button').addEventListener('click', function(){
    dealer.innerHTML = '<div>Dealer\'s Cards</div>' + dealerCards()[0];
    dealer.style.display = 'block';
    player.innerHTML = '<div>Player\'s Cards</div>' + playerCards()
    player.style.display = 'block';
    playerScore.style.display = 'block';
    playerScore.innerHTML = handValue(array);
})
