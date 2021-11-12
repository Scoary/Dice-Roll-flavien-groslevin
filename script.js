let scores, roundScore, gamePlaying, activePlayer, totalPoint;

document.querySelector('img').style.display = 'none';

$('.btnrolldice').addClass('disabled');
$('.btnsecuriser').addClass('disabled');

$('#newparty').on('click', () => init());

$('.btnrolldice').on('click', () => {
    if(gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('img');
        diceDOM.src = '/IMG/dice-' + dice + '.png';

        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#score-' + activePlayer).textContent = roundScore;
        } else {
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }
    }    
});

$('.btnsecuriser').on('click', () => {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#totalScore-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#score-' + activePlayer).textContent = 0;
    
        if (scores[activePlayer] >= totalPoint) {
            document.querySelector('#name-' + activePlayer).textContent = 'Gagné 🥳';
            document.querySelector('img').style.display = 'none';
            gamePlaying = false;
            $('.btnrolldice').addClass('disabled');
            $('.btnsecuriser').addClass('disabled');
            
            let duration = 5 * 1000;
            let animationEnd = Date.now() + duration;
            let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
            }

            let interval = setInterval(function() {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            let particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('score-' + activePlayer).textContent = '0';
}

document.querySelector('.btn-new').addEventListener('click', init);

function namePlayer1 () {
    let inputPlayer1 = document.querySelector('#name0').value;
    document.querySelector('#name-0').textContent = inputPlayer1;
};

function namePlayer2 () {
    let inputPlayer2 = document.querySelector('#name1').value;
    document.querySelector('#name-1').textContent =inputPlayer2;
};
function scoreTotal () {
    let inputTotalPoint = document.querySelector('#inputtotalpoint').value;
    document.querySelector('#totalpointplayer1').textContent = " / " + inputTotalPoint;
    document.querySelector('#totalpointplayer2').textContent = " / " + inputTotalPoint;
    totalPoint = inputTotalPoint;

};

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('img').style.display = 'block';
    document.querySelector('#totalScore-0').textContent = '0';
    document.querySelector('#totalScore-1').textContent = '0';

    $('.btnrolldice').removeClass('disabled');
    $('.btnsecuriser').removeClass('disabled'); 
};

$("#playmusic").on('click', () => {
    playermusic.play();
});
$("#pausedmusic").on('click', () => {
    playermusic.pause();
});
$("#restartmusic").on('click', () => {
    playermusic.currentTime = 0;
});
