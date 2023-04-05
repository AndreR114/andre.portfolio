"use strict";
/*Selecting point elements*/

const score0Element = document.querySelector("#playerPoints0");

const score1Element = document.getElementById("playerPoints1");

const activePlayer0 = document.querySelector(".player00");
const activePlayer1 = document.querySelector(".player01");

const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const btnReset = document.querySelector(".reset");

const currentElement1 = document.querySelector("#currentPointsP1");
const currentElement0 = document.querySelector("#currentPointsP0");

/*Selecting the dice and create a dice point container*/

const diceElement = document.querySelector("#dice");
let currentPoints = 0;
let scores = [0, 0];

/*Variable for the active player*/

let activePlayer = 0;

//switching player function

const switchPlayer = function () {
  document.querySelector("#currentPointsP" + activePlayer).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentPoints = 0;
  activePlayer0.classList.toggle("active");
  activePlayer1.classList.toggle("active");
};

/*Starting conditions*/
diceElement.classList.add("hidden");
let gameStartet = false;

//Reset the game to the starting conditions, the dice stays visible or just start the game
btnReset.addEventListener("click", function () {
  diceElement.classList.remove("hidden");
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentPoints = 0;
  currentElement0.textContent = currentPoints;
  currentElement1.textContent = currentPoints;
  gameStartet = true;
  document
    .querySelector(".player0" + activePlayer)
    .classList.remove("playerWinner");
  activePlayer = 0;
  activePlayer0.classList.add("active");
  activePlayer1.classList.remove("active");
  scores = [0, 0];
});

/*Rolling dice functions*/

btnRoll.addEventListener("click", function () {
  //Check if game is started
  if (gameStartet) {
    //Generate a random dice Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display the dice
    diceElement.src = "dice-" + dice + ".png";

    //Check if player rolled a 1, if yes switch player
    if (dice !== 1) {
      //Add dice number to current score
      currentPoints += dice;
      document.querySelector("#currentPointsP" + activePlayer).textContent =
        currentPoints;
    } else {
      //Switch player
      switchPlayer();
    }
  } else {
    alert("Start a new game first!");
  }
});

btnHold.addEventListener("click", function () {
  //add points to the actplayer one
  scores[activePlayer] += currentPoints;
  document.querySelector("#playerPoints" + activePlayer).textContent =
    scores[activePlayer];
  //Check if score is not 100
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(".player0" + activePlayer)
      .classList.add("playerWinner");
    document
      .querySelector(".player0" + activePlayer)
      .classList.remove("active");
    gameStartet = false;
  } else {
    //Switching player
    switchPlayer();
  }
});
