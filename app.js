const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

let isXTurn = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  const cell = event.target;
  const currentPlayer = isXTurn ? 'X' : 'O';
  cell.textContent = currentPlayer;
  cell.style.color = isXTurn ? '#ff66b2' : '#6666ff';
  if (checkWinner(currentPlayer)) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    return;
  }
  if (isDraw()) {
    setTimeout(() => alert("It's a draw!"), 100);
    return;
  }
  isXTurn = !isXTurn;
}

function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  isXTurn = true;
}
