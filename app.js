/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, roundScore, scores;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var btnNew = document.querySelector('.btn-new');
var dice = document.querySelector('.dice');
var currentPanels = document.getElementsByClassName('player-current-box');
init();

btnRoll.addEventListener('click',function(){
    var diceNum = rollDice();
    dice.style.display = 'block';
    dice.src = 'dice-'+diceNum+'.png';

    if (diceNum !== 1){
        dice.style.display = 'block';
        roundScore += diceNum;
        document.querySelector('#current-'+activePlayer).textContent = roundScore;

    }else{
        setTimeout(nextPlayer,250);
    }
});

btnHold.addEventListener('click',function(){
    scores[activePlayer] += roundScore;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    document.querySelector('#current-'+activePlayer).textContent = 0;
    if (scores[activePlayer] >= 100){
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
        btnRoll.style.display = 'none';
        btnHold.style.display = 'none';
        currentPanels[0].style.display = 'none';
        currentPanels[1].style.display = 'none';
        dice.style.display = 'none';
    }else{
        nextPlayer();
    }
});

btnNew.addEventListener('click',function(){
    btnRoll.style.display = 'block';
    btnHold.style.display = 'block';
    init();
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    currentPanels[0].style.display = 'block';
    currentPanels[1].style.display = 'block';
});

function rollDice(){
    min = Math.ceil(1);
    max = Math.floor(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init(){
    activePlayer = 0; 
    roundScore = 0;
    scores = [0,0];
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    dice.style.display = 'none';
}

function nextPlayer(){
    dice.style.display = 'none';
    roundScore = 0;
    document.querySelector('#current-'+activePlayer).textContent = 0;
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}