"use strict"

//Selceting the Elements

const player0Element = document.querySelector(".player0");
const player1Element = document.querySelector(".player1");

const playerPunkteElement0 = document.querySelector(".punkteText0");
const playerPunkteElement1 = document.querySelector(".punkteText1");

const playerCurrent0 = document.querySelector(".currentPunkteP0");
const playerCurrent1 = document.querySelector(".currentPunkteP1");

const btnNewGameElement = document.querySelector(".newGame");
const btnRollElement = document.querySelector(".roll");
const btnHoldElement = document.querySelector(".hold");

const diceElement = document.querySelector("#dice");

//Start attributes

let gameStarted = false;
let activePlayer = 0;
let currentPoints;

diceElement.classList.add("hide");

//Switchplayer Funktion

const switchPlayer = function () {
  currentPoints = 0;
  document.querySelector(".currentPunkteP" + activePlayer).textContent =
    currentPoints;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("playerActive");
  player1Element.classList.toggle("playerActive");
};

//Savecontainer for the pointerEvents

let score = [0, 0];

//Handle clickelements

btnNewGameElement.addEventListener("click", function () {
  //Reset the game
  gameStarted = true;
  currentPoints = 0;
  score = [0, 0];
  playerPunkteElement0.textContent = 0;
  playerPunkteElement1.textContent = 0;
  playerCurrent0.textContent = currentPoints;
  playerCurrent1.textContent = currentPoints;

  player0Element.classList.add("playerActive");
  player1Element.classList.remove("playerActive");

  document
    .querySelector(".player" + activePlayer)
    .classList.remove("playerWinner");
  activePlayer = 0;

  //show the dice

  diceElement.classList.remove("hide");
});

btnRollElement.addEventListener("click", function () {
  //create random Number
  if (gameStarted) {
    const randomDiceNr = Math.trunc(Math.random() * 6) + 1;
    diceElement.src = "dice-" + randomDiceNr + ".png";
    //check if tis a 1 and if its true switchplayer
    if (randomDiceNr !== 1) {
      currentPoints += randomDiceNr;
      document.querySelector(".currentPunkteP" + activePlayer).textContent =
        currentPoints;
    } else {
      //Switch player
      switchPlayer();
    }
  } else {
    alert("Start an new game first!");
  }
});

//handling the hold event

btnHoldElement.addEventListener("click", function () {
  if (gameStarted) {
    //add points to active player and switch player
    score[activePlayer] += currentPoints;
    document.querySelector(".punkteText" + activePlayer).textContent =
      score[activePlayer];
  } else {
    alert("Start a new game first");
  }
  //check if points are 100
  if (score[activePlayer] >= 100) {
    document
      .querySelector(".player" + activePlayer)
      .classList.add("playerWinner");
    gameStarted = false;
  } else {
    switchPlayer();
  }
  //show winner and deactivate hold and roll button
});
