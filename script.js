// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// the element that contains the rows and squares
let boardElement;

// current player global starts at X
let currentPlayer = '❌';

// variable to keep track if a player has won
let playerWin = false;

// reset button
const resetButton = document.createElement('button');
resetButton.innerText = 'reset';

// output message element
const outputDisplay = document.createElement('div');
outputDisplay.className = 'output-div';

// function to output messages
const output = (message) => {
  outputDisplay.innerText = message;
};

// function to build board
// rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  boardContainer.innerHTML = ''; // start with an empty container
  boardElement = document.createElement('div'); // create a div to store squares
  boardElement.classList.add('board'); 
  boardContainer.appendChild(boardElement);

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) { // i is row number
    const row = board[i]; 
    const rowElement = document.createElement('div'); // create a row element
    rowElement.classList.add('row');

    for (let j = 0; j < row.length; j += 1) { // j is column number
      const square = document.createElement('div'); // create a square element
      square.classList.add('square');
      rowElement.appendChild(square); // square goes into row

      square.innerText = board[i][j]; // contents of square is contents of array at i,j
      square.addEventListener('click', () => { // add event listener to run click function
        squareClick(i, j); // pass in coordinates of square to access contents of board
      });
    }

    boardElement.appendChild(rowElement); // adds row to the board
  }
};

// function to check for win
const checkWin = (board, row, col) => {
  // check for row win
  if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
    console.log('row win');
    return true;
  }
  
  if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
    console.log('column win');
    return true;
  } 

  if ((row === 0 && col === 0) || (row === 2 && col === 2) || (row === 1 && col === 1)) {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    console.log('diagonal 1 win');
    return true;
    }
  }

  if ((row === 0 && col === 2) || (row === 2 && col === 0) || (row === 1 && col === 1)) {
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    console.log('diagonal 2 win');
    return true;
    }
  }
};

const resetGame = () => {
  console.log('reset game');
  currentPlayer = '❌';
  playerWin = false;
  board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
  ];
  buildBoard(board);
  output('');
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === '❌') { // if current player is X, 
    currentPlayer = '⭕'; // switch to O
  } else {
    currentPlayer = '❌'; // if not switch to X
  }
};

// function to update value of square
const squareClick = (row, col) => {
  console.log('coordinates', row, col);

  // see if the clicked square has been clicked on before
  if (board[row][col] === '') {
    board[row][col] = currentPlayer; // if empty, set the contents of array to the current player
    console.log(board[row][col])
    buildBoard(board); // redraw the board
    
    playerWin = checkWin(board, row, col); // check for win\
    console.log('player wins', playerWin);

    if (playerWin) {
      output(`${currentPlayer} wins!`)
      setTimeout(resetGame, 3000);
      return;
    }

    togglePlayer(); // change player turn
    console.log('next player', currentPlayer);
  }
};

const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();

resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);
document.body.appendChild(outputDisplay);