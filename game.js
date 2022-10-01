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

// picks the dealer's cards
function dealerCards() {
    dealer = [];
    dealer.push(shuffledDeck[0], shuffledDeck[1]);
    return dealer
}

console.log((dealerCards()));

// give the current score of a hand
function handValue(array) {
    let score = 0;
    // goes through cards
    for (let i = 0; i < array.length; i++) {
        // gets card rank (i.e ace, 4, jack)
        const rank = array[i].split(" ")[0];
        console.log(rank)
        if (rank === 'jack' || rank === 'queen' || rank === 'king') {
            score += 10;
        }
        else if (rank === 'ace') {
            score += 11;
        }
        else {
            score += Number(rank)
        }
    }
    return score
}
console.log(handValue(dealerCards()));