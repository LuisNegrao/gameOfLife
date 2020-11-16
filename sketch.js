let board = [];
const boardSize = 100;

function setup() {
  createCanvas(boardSize *10, boardSize*10);
  start();
}

const resolution = 10;

function draw() {
  background(0);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (board[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }
  board[5][5] = 1;

  
  let change = false;
  console.log(change);
  let tempBoard = [];
  populate(tempBoard, 10);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      change = play(checkNeighbours(i, j), tempBoard);
    }
  }
  board = tempBoard;
  //printBoard(board);
}
const populate = (board) => {
  for (let index = 0; index < boardSize; index++) {
    const arr = [];
    for (let j = 0; j < boardSize; j++) {
      arr.push(floor(random(2)));
    }
    board.push(arr);
  }
};

const printBoard = (board) => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    let toPrint = "[ ";
    for (let j = 0; j < size; j++) {
      toPrint += board[i][j] + " ";
    }
    toPrint += "]";
    console.log(toPrint);
  }
  console.log("--------");
};
const checkNeighbours = (x, y) => {
  let alive = 0;

  const isalive = board[x][y] === 1 ? true : false;

  for (let i = -1; i < 2; i++) {
    if (x + 1 > board.length - 1 || y + 1 > board.length - 1 || y - 1 < 0) {
    } else {
      if (board[x + 1][y + i] === 1) {
        alive++;
      }
    }
  }
  for (let i = -1; i < 2; i++) {
    if (x - 1 < 0 || y + 1 > board.length - 1 || y - 1 < 0) {
    } else {
      if (board[x - 1][y + i] === 1) {
        alive++;
      }
    }
  }
  for (let i = -1; i < 2; i++) {
    if (y + 1 > board.length - 1 || y - 1 < 0) {
    } else {
      if (y == y + i) {
      } else if (board[x][y + i] == 1) {
        alive++;
      }
    }
  }
  let dead = 8 - alive;
  //  console.log({alive,dead,isalive ,x,y});
  return { alive, dead, isalive, x, y };
};

const play = ({ alive, dead, isalive, x, y }, tempBoard) => {
  let stateChange = false;
  if (isalive && alive < 2) {
    tempBoard[x][y] = 0;
    stateChange = true;
  } else if (isalive && alive > 3) {
    tempBoard[x][y] = 0;
    stateChange = true;
  } else if (!isalive && alive === 3) {
    console.log({ alive, dead, isalive, x, y });
    tempBoard[x][y] = 1;
    stateChange = true;
  } else {
    tempBoard[x][y] = board[x][y];
  }
  return stateChange;
};

const start = async () => {
  populate(board);
};
