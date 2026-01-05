const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

function handleClick() {
  const index = this.dataset.index;
  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.style.color = currentPlayer === "X" ? "#ef4444" : "#6366f1";

  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(pattern);
      statusText.textContent = `🎉 Player ${board[a]} Wins!`;
      isGameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    isGameActive = false;
  }
}

function highlightWin(pattern) {
  pattern.forEach(i => cells[i].classList.add("win"));
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = "";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}
