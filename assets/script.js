import TicTacToe from "https://unpkg.com/@sahilsinghrana/tictactoe.js@1.0.0-beta/dist/index.mjs";

let game = new TicTacToe();

const resultDiv = document.getElementById("result");
const boardDiv = document.getElementById("board");

const getPlayerChar = (player) => {
  if (player === 1) {
    return "O";
  }
  if (player === 0) {
    return "X";
  }
  return "-";
};

const handleRestartBtn = () => {
  game = new TicTacToe();
  printBoard();
  resultDiv.innerHTML = "";
  resultDiv.classList = "";
  boardDiv.classList.add("init");
};

const checkAndHandleWin = () => {
  const gameStatus = game.gameStatus;
  const winner = game.winner;
  if (gameStatus === 1) {
    const winCoordinates = game.winCoordinates || [];
    winCoordinates.forEach((coord) => {
      const [x, y] = coord;
      const winnableBtn = getPlayBtnFromCoords(x, y);
      if (winnableBtn) {
        winnableBtn.classList.add("win");
      }
    });

    const textElement = document.createElement("h2");
    const winnerChar = getPlayerChar(winner);
    if (winner === 1 || winner === 0) {
      textElement.innerText = `${winnerChar} WON!`;
    } else {
      textElement.innerText = `DRAW!`;
    }

    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    restartBtn.classList.add("restartBtn");
    restartBtn.addEventListener("click", handleRestartBtn);
    resultDiv.classList.add("active");

    resultDiv.appendChild(textElement);
    resultDiv.appendChild(restartBtn);
  }
};

const play = (x, y) => () => {
  boardDiv.classList.remove("init");
  game.play(x, y);
  const gameBoard = game.board;
  printBoard();

  checkAndHandleWin();
};

const getBtnIdStr = (x, y) => {
  return `btn_${x}_${y}`;
};

const setPlayBtnId = (el, x, y) => {
  el.id = getBtnIdStr(x, y);
};

const getPlayBtnFromCoords = (x, y) => {
  return document.getElementById(getBtnIdStr(x, y));
};

const printBoard = () => {
  const gameBoard = game.board;
  boardDiv.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const rowElement = document.createElement("div");

    rowElement.classList = "boardRow";
    for (let j = 0; j < 3; j++) {
      const button = document.createElement("button");
      const playerAtCurrentPos = gameBoard.getPos(i, j);
      if (playerAtCurrentPos !== -1) {
        button.disabled = true;
      }
      button.innerText = getPlayerChar(playerAtCurrentPos);
      button.classList = "playBtn";
      setPlayBtnId(button, i, j);
      button.setAttribute("type", "button");
      button.addEventListener("click", play(i, j, button));
      rowElement.appendChild(button);
    }
    boardDiv.appendChild(rowElement);
  }
};

printBoard();
