/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores;
let roundScore;
let activePlayer;
//state variable
let gamePlaying;

// Initialize game
init();

//Start Game Function
function init(){
    //declare variables
    scores = [0,0];
    //array to keep scores for both players
    roundScore = 0;
    // keep score for each round
    activePlayer = 0;
    //first player = 0  begins and second player = 1
    gamePlaying = true;


    //hide dice 
    document.querySelector('.dice').style.display = 'none';

    //Select elements to set score to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //show buttons
    // document.querySelector('.btn-roll').style.display = 'block';
    // document.querySelector('.btn-hold').style.display = 'block';

    //reset styles
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
};

//Calls next player
function nextPlayer(){
    //ternary operator (if active player === 0 then active player will be 1 and vice-versa)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //returns score to 0 if player rolls a 1
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //Add or remove class active for current player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide dice if player rolls 1
    document.querySelector('.dice').style.display = 'none';



};


//Add Event Listener to roll dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
            //1. Random number
        const dice = Math.floor(Math.random() * 6) + 1;
        //2. Display result
        const diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src='dice-' + dice + '.png';
        
        //3. Update score unless number is a 1.
        if (dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;


        } else {
            //Next player turn
            nextPlayer();
        
     }
    }
  

});

//Add event listener to hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 100){
            //display winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            // hide dice
            document.querySelector('.dice').style.display = 'none';
            //Change style
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
            //state variable to end game
            gamePlaying = false;
            
            //hide buttons
            // document.querySelector('.btn-roll').style.display = 'none';
            // document.querySelector('.btn-hold').style.display = 'none';

        } else {
        //Next player turn
        nextPlayer();
        }
    }


});

//Add Event Listener to play new game button

document.querySelector('.btn-new').addEventListener('click', init);



