/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//declare variables
const scores = [0,0];
//array to keep scores for both players
const roundScore = 0;
// keep score for each round
const activePlayer = 1;
//first player = 0 and second player = 1

const dice = Math.floor(Math.random() * 6) + 1;

// query selectors

//set value to the element
document.querySelector('#current-' + activePlayer).textContent = dice;


const scoresCount = document.querySelector('#score-' + activePlayer).textContent;



