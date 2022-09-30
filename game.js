const suits = ["clubs", "spades", "hearts", "diamonds"];
const cards = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, "jack", "queen", "king"];

const randomSuit = suits[Math.floor(Math.random() * 4)];
const randomCards = cards[Math.floor(Math.random() * 12)];
console.log(randomCards  + " of " + randomSuit);

function createDeck() {
    let deck = [];
    while (deck.length < 52) {
        deck.push(randomCards  + " of " + randomSuit);
    }
    return deck
}
console.log(createDeck())