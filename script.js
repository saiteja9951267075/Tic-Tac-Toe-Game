let currentPlayer = 'X';
let gameEnded = false;
let moveCount = 0;
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');

// Initialize the game board
function initGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleCellClick);
  });
  currentPlayer = 'X';
  moveCount = 0;
  gameEnded = false;
  updateStatus();
}

// Handle cell click
function handleCellClick(event) {
  if (gameEnded) return; // Don't allow clicks if the game has ended
  const cell = event.target;

  // Check if cell is already filled
  if (cell.textContent !== '') return;

  // Place the current player's mark
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  moveCount++;

  // Check if the game has ended
  if (checkWinner()) {
    showAlert(`Congratulations ${currentPlayer} Wins! 🎉`);
    gameEnded = true;
    setTimeout(restartGame, 10000); // Restart after 3 seconds
  } else if (moveCount === 9) {
    showAlert("It's a Draw! 🤝");
    gameEnded = true;
    setTimeout(restartGame, 10000); // Restart after 3 seconds
  } else {
    // Change player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

// Check for a winner
function checkWinner() {
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

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return currentPlayer; // Return the winner
    }
  }
  return null;
}

// Show the result in an alert modal
function showAlert(message) {
  const alertModal = document.getElementById('alertModal');
  const alertMessage = alertModal.querySelector('.message');
  const alertEmoji = alertModal.querySelector('.emoji');
  
  alertMessage.textContent = message;
  alertEmoji.innerHTML = currentPlayer === 'X' ? '🎉' : '🎉';

  // Display the modal
  alertModal.style.display = 'block';
  setTimeout(() => alertModal.style.opacity = 1, 100); // Fade-in
}

// Close the alert modal
function closeModal() {
  const alertModal = document.getElementById('alertModal');
  alertModal.style.display = 'none'; // Hide the modal
}

// Restart the game after a result
function restartGame() {
  const alertModal = document.getElementById('alertModal');
  alertModal.style.display = 'none'; // Hide the modal
  initGame(); // Initialize the board and start over
}

// Update the game status text
function updateStatus() {
  statusText.textContent = `${currentPlayer === 'X' ? "Player X's turn" : "Player O's turn"}`;
  statusText.classList.toggle('x-turn', currentPlayer === 'X');
  statusText.classList.toggle('o-turn', currentPlayer === 'O');
}

// Initialize the game on page load
initGame();
