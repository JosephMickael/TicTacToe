const PLAYER_1 = "x";
const PLAYER_2 = "circle";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// select all elements that has "data-cell" in it
const cellElements = document.querySelectorAll("[data-cell]");
// console.log(cellElements);
const winningMessage = document.getElementById("winning-message");
const winText = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");
const resetBtn = document.getElementById("reset");
let p = document.getElementsByTagName("p");
p = p[0];

let playerTurn;

startGame();

restartButton.addEventListener("click", startGame);
resetBtn.addEventListener("click", startGame);

function startGame() {
  playerTurn = 0;
  p.innerHTML = "Player 1 start";

  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_1);
    cell.classList.remove(PLAYER_2);
    cell.removeEventListener("click", addPlayerTurn);
    // once ==> click only one time if true
    cell.addEventListener("click", addPlayerTurn, { once: true });
  });

  winningMessage.classList.remove("show");
}

/**
 * @param {HTMLCollection} element
 */
function addPlayerTurn(element) {
  const cell = element.target;
  const playerType = playerTurn ? PLAYER_2 : PLAYER_1;
  cell.classList.add(playerType);
  winner(playerType);
  swapTurn();
}

/**
 * show the winner or for game over
 * @param {string} playerType
 */
function winner(playerType) {
  if (playerType == PLAYER_1) p.innerHTML = "Player 2 turn";
  else p.innerHTML = "Player 1 turn";

  if (checkForWinner(playerType)) {
    winningMessage.classList.add("show");
    winText.innerHTML = playerWinner(playerType);
  }

  if (isDraw() && !checkForWinner(playerType)) {
    winningMessage.classList.add("show");
    winText.innerHTML = "Draw :(";
  }
}

/**
 * return the winner
 * @param {string} playerType
 * @returns
 */
function playerWinner(playerType) {
  if (playerType == PLAYER_1) return "Player 1 Wins!";
  else if (playerType == PLAYER_2) return "Player 2 Wins!";
}

function swapTurn() {
  playerTurn = !playerTurn;
}

/**
 * check for winner
 * array.some() ==> verify at least 1
 * array.every() ==> verify all array values
 * some and every retruns true or false
 * @param {string} playerType
 * @returns
 */
function checkForWinner(playerType) {
  return winConditions.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(playerType);
    });
  });
}

/**
 * [..array] => get the rest of a specified array (destructing)
 * every returns true if condition verified
 * @returns
 */
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_1) || cell.classList.contains(PLAYER_2)
    );
  });
}
