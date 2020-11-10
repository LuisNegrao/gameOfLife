let board = [];


const populate = (board, size) => {
    for (let index = 0; index < size; index++) {
        const arr = [];
        for (let j = 0; j < size; j++) {
            arr.push(0);
        }
        board.push(arr);
    }
}

const printBoard = (board) => {
    const size = board.length;

    for (let i = 0; i < size; i++) {
        let toPrint = "[ ";
        for (let j = 0; j < size; j++) {
            toPrint += board[i][j] + " ";
        }
        toPrint += "]"
        console.log(toPrint);
    }
    console.log("--------");
}
// Y X
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
}

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
    // printBoard(board)
}

const setUp = (size) => {
    populate(board, size);
    board[4][3] = 1;
    board[4][4] = 1;
    board[4][5] = 1;
    board[5][2] = 1;
    board[5][3] = 1;
    board[5][4] = 1;
    printBoard(board);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async () => {
    setUp(10);
    let i = 0;
    while (i < 3) {
        let tempBoard = [];
        populate(tempBoard, 10);
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                play(checkNeighbours(i, j), tempBoard);
            }

        }
        board = tempBoard;
        printBoard(board);
        i++;
    }
}

start();