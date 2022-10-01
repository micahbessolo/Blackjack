const cards = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const suits = ["clubs", "spades", "hearts", "diamonds"];

function straightDeck() {
    let deck = [];
    for (let c = 0; c < cards.length; c++) {
        for (let s = 0; s < suits.length; s++) {
            deck.push(cards[c] + " of " + suits[s])
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
        })
    }
    return shuffledDeck
}

let deck = shuffleDeck()
console.log(deck)