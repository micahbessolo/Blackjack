const suits = ["clubs", "spades", "hearts", "diamonds"];
const cards = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, "jack", "queen", "king"];

function createDeck() {
    let deck = [];
    while (deck.length < 12) {
        let card = cards[Math.floor(Math.random() * 12)]  + " of " + suits[Math.floor(Math.random() * 4)]
        if (!deck.includes(card)){
            deck.push(card)
        }
    }
    return deck
}
console.log(createDeck())