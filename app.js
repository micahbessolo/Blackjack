const dealer = document.getElementById('dealer');
const player = document.getElementById('player');

function dealerCards() {
    dealer.innerHTML = 
    '<div>Dealer\'s Cards</div>';
    dealer.style.display = 'block';
}

function playerCards() {
    player.innerHTML = 
    '<div>Player\'s Cards</div>';
    player.style.display = 'block';
}