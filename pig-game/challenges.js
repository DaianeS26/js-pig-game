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

//challenge 
let lastDice;
let winningScore;

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
    hideDice();
    // document.querySelector('#dice-1').style.display = 'none';
    // document.querySelector('#dice-2').style.display = 'none';


    //Select elements to set score to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //reset styles
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
};

function hideDice(){
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

function showDice(){
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}

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
    hideDice();
    

};


//Add Event Listener to roll dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        //1. Random number
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        showDice();
        document.getElementById('dice-2').src='dice-' + dice1 + '.png';
        document.getElementById('dice-2').src='dice-' + dice2 + '.png';

        //3. Update score unless number is a 1.
        // if (dice1 !== 1 && dice2 !== 1){
        //     //Add score
        //     roundScore += dice1 + dice2;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;

        // } else {
        //     //Next player turn
        //     nextPlayer();

        // }


        //3. Update score.
        //lose all score if rolls 6 twice
        // change dice2 to lastDice when playing with one dice
        if (dice1 === 6 && dice2 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
         
        //  lose turn if it rolls 1.
        } else if (dice1 !== 1 && dice2 !== 1){
    
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;


        } else {
            //Next player turn
            nextPlayer();
        }

        // lastDice = dice;
    

    }
  

});

//Add event listener to hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
    
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
         
        //User can choose final score
        let input = document.querySelector('.final-score').value
    

        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }


        //Check if player won the game
        if (scores[activePlayer] >= winningScore){
            //display winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            // hide dice
            hideDice();
            // document.querySelector('#dice-1').style.display = 'none';
            // document.querySelector('#dice-2').style.display = 'none';
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



