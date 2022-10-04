const dealer = document.getElementById('dealer');
const player = document.getElementById('player');

function showDealerCards() {
    dealer.innerHTML = 
    '<div>Dealer\'s Cards</div>';
    dealer.style.display = 'block';
}

function showPlayerCards() {
    player.innerHTML = 
    '<div>Player\'s Cards</div>';
    player.style.display = 'block';
}