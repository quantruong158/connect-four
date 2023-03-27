const COL_SIZE = 7;
const ROW_SIZE = 6;

function insertPlayer(board, player, x) {
  if (board[0][x - 1] != 0) {
    alert("OUT OF SLOTS!!!");
    return -1;
  }
  for (let i = ROW_SIZE - 1; i > -1; i--) {
    if (board[i][x - 1] === 0) {
      board[i][x - 1] = player;
      return i;
    }
  }
}
function checkWinner(board, x, y, player) {
  function checkHorizontal(board, x, y, player) {
    let count = -1;
    for (let i = 0; i < 4; i++) {
      if (board[y][x + i] === player) {
        count += 1;
        if (x + i === COL_SIZE - 1) break;
      } else break;
    }
    for (let i = 0; i < 4; i++) {
      if (board[y][x - i] === player) {
        count += 1;
        if (x - i === 0) break;
      } else break;
    }
    return count >= 4;
  }
  function checkVertical(board, x, y, player) {
    let count = 0;
    for (let i = 0; i < 4; i++) {
      if (board[y + i][x] === player) {
        count += 1;
        if (y + i === ROW_SIZE - 1) break;
      } else break;
    }
    return count >= 4;
  }
  function checkDiagonal(board, x, y, player) {
    let count = -1;
    for (let i = 0; i < 4; i++) {
      if (board[y - i][x + i] === player) {
        count += 1;
        if (y - i === 0 || x + i === COL_SIZE - 1) break;
      } else break;
    }
    for (let i = 0; i < 4; i++) {
      if (board[y + i][x - i] === player) {
        count += 1;
        if (y + i === ROW_SIZE - 1 || x - i === 0) break;
      } else break;
    }
    if (count >= 4) return true;
    count = -1;
    for (let i = 0; i < 4; i++) {
      if (board[y - i][x - i] === player) {
        count += 1;
        if (y - i === 0 || x - i === 0) break;
      } else break;
    }
    for (let i = 0; i < 4; i++) {
      if (board[y + i][x + i] === player) {
        count += 1;
        if (y + i === ROW_SIZE - 1 || x + i === COL_SIZE - 1) break;
      } else break;
    }
    return count >= 4;
  }
  return (
    checkVertical(board, x, y, player) ||
    checkHorizontal(board, x, y, player) ||
    checkDiagonal(board, x, y, player)
  );
}
function checkDraw(board) {
  for (let i = 0; i < COL_SIZE; i++) {
    if (board[0][i] === 0) {
      return false;
    }
  }
  return true;
}
let player;
let board;
let gameOver = true;
let gameDraw = false;

function mainRestart() {
  initializeGame();
}
function restart() {
  close();
  initEndGame();
  initializeGame();
}

function initializeGame() {
  player = 1;
  gameOver = false;
  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  initUI();
}

function changePlayer(player) {
  if (player == 1) {
    showBlue();
    player = 2;
  } else {
    showRed();
    player = 1;
  }
  return player;
}
function columnClicked() {
  if (!gameOver) {
    const i = parseInt(this.getAttribute("columnIndex"));
    const j = insertPlayer(board, player, i + 1);
    if (j != -1) {
      const box = document.querySelector(`#b${j}${i}`);
      if (player === 1) {
        box.style.background = red;
      } else {
        box.style.background = blue;
      }
      box.classList.add("bounce-animation");
      if (checkWinner(board, i, j, player)) {
        endGame();
      }
      if (checkDraw(board)) {
        gameDraw = true;
        endGame();
      }
      player = changePlayer(player);
    }
  }
}

function close() {
  const ele = document.querySelector(".end-game-container");
  ele.classList.remove("appear");
  setTimeout(() => {
    ele.classList.remove("fade-transition");
  }, 20);
}
function initEndGame() {
  const endGame = document.querySelector(".end-game-container");
  const classToKeep = "end-game-container";
  [...endGame.classList].forEach((className) => {
    if (className !== classToKeep) {
      endGame.classList.remove(className);
    }
  });
}

const red =
  "radial-gradient(circle, rgba(245,24,24,1) 0%, rgba(212,0,0,1) 100%)";
const blue =
  "radial-gradient(circle, rgba(21,34,242,1) 0%, rgba(1,82,176,1) 100%)";
const darkGrey = "rgb(63, 63, 63)";

function initUI() {
  mainRestartButton.style.display = "flex";
  startButton.style.display = "none";
  let boxes = document.querySelectorAll(".game-box");
  boxes.forEach((box) => {
    box.style.background = "";
    box.style.backgroundColor = darkGrey;
    box.classList.remove("bounce-animation");
  });
  showRed();
  const columns = document.querySelectorAll(".game-column");
  columns.forEach((column) => {
    column.classList.add("active");
  });
}

function endGameUI() {
  let playerText;
  if (!gameDraw) playerText = player === 1 ? "RED" : "BLUE";
  else {
    playerText = "NOBODY";
    gameDraw = false;
  }
  prompt.innerHTML = `${playerText} WON!!!`;
  const egc = document.querySelector(".end-game-container");
  egc.classList.add("appear");
  setTimeout(() => {
    egc.classList.add("fade-transition");
  }, 20);
  const columns = document.querySelectorAll(".game-column");
  columns.forEach((column) => {
    column.classList.remove("active");
  });
}

function showRed() {
  playerOne.style.background = red;
  playerTwo.style.background = "";
}
function showBlue() {
  playerOne.style.background = "";
  playerTwo.style.background = blue;
}

const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const mainRestartButton = document.querySelector(".main-restart");
const restartButton = document.querySelectorAll(".restart-button");
const closeButton = document.querySelector(".close-button");
const startButton = document.querySelector(".start-button");
const columns = document.querySelectorAll(".game-column");
const prompt = document.getElementById("end-game-prompt");

startButton.addEventListener("click", initializeGame);
mainRestartButton.addEventListener("click", mainRestart);
restartButton[1].addEventListener("click", restart);
closeButton.addEventListener("click", close);
columns.forEach((column) => {
  column.addEventListener("click", columnClicked);
});
function endGame() {
  gameOver = true;
  endGameUI();
}
