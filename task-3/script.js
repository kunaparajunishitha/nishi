document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('reset-btn');
    const cells = [];
  
    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
      }
    }
  
    function handleCellClick() {
      if (!gameActive) return;
      
      if (!this.textContent) {
        this.textContent = currentPlayer;
        moves++;
  
        if (checkWinner()) {
          status.textContent = `${currentPlayer} wins!`;
          gameActive = false;
        } else if (moves === 9) {
          status.textContent = 'It\'s a tie!';
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `${currentPlayer}'s turn`;
        }
      }
    }
  
    function checkWinner() {
      const winningCombos = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
      ];
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          cells[a[0] * 3 + a[1]].textContent &&
          cells[a[0] * 3 + a[1]].textContent === cells[b[0] * 3 + b[1]].textContent &&
          cells[a[0] * 3 + a[1]].textContent === cells[c[0] * 3 + c[1]].textContent
        ) {
          cells[a[0] * 3 + a[1]].style.color = 'red';
          cells[b[0] * 3 + b[1]].style.color = 'red';
          cells[c[0] * 3 + c[1]].style.color = 'red';
          return true;
        }
      }
  
      return false;
    }
  
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = 'black';
      });
  
      currentPlayer = 'X';
      gameActive = true;
      moves = 0;
      status.textContent = `${currentPlayer}'s turn`;
    }
  
    resetBtn.addEventListener('click', resetGame);
  });
  