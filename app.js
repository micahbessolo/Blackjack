const cards = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

function straightDeck() {
    let deck = [];
    for (let c = 0; c < cards.length; c++) {
        for (let s = 0; s < suits.length; s++) {
            deck.push(cards[c] + ' of ' + suits[s])
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
        if (!isNaN(array[i])){} // skips over the score (number) that will be pushed to array
        else if (isNaN(array[i])) {
            // gets card rank (i.e ace, 4, jack)
            const rank = array[i].split(" ")[0]; 
            if (rank === 'jack' || rank === 'queen' || rank === 'king') {
                score += 10;
            }
            else if (rank === 'ace') {
                score += 11;
                aceArray.push(rank);
            }
            else {
                score += Number(rank);
            }
        }
    }
    for (ace = 0; ace < aceArray.length; ace++) {
        if (score > 21) {
            score -= 10;
        }
    }
    return score
}

// adds 1 card to the hand
let i = 4;
let array = playerCards();

function addCard() {
    i++
    array.push(shuffledDeck[4 + i]);
    // pushing the hand value to the end of the array
    array.push(handValue(array))
    console.log(array);
    return array
}

// check button onClick function to add cards to the dealer hand if under 17
let dealerC = dealerCards();

function updateDealerHand() {
    if (handValue(dealerC) < 17) {
        dealerC.push(shuffledDeck[4 + i]);
        console.log(handValue(dealerC));
        console.log(dealerC);
    }
    else if (handValue(dealerC) > 21) {
        console.log("dealer busted")
    }
    else {
        console.log("dealer has a good hand")
    }
    return dealerC;
}

// selects elements
const dealer = document.getElementById('dealer');
const player = document.getElementById('player');

// gives 'start game' button functionality
document.querySelector('button').addEventListener('click', function(){
    dealer.innerHTML = 
    '<div>Dealer\'s Cards</div>' + dealerCards();
    dealer.style.display = 'block';
    player.innerHTML = 
    '<div>Player\'s Cards</div>' + playerCards();
    player.style.display = 'block';
})
