const checkIfValid = (guess, rowIndex, colIndex, board) => {
    // check row
    const row_vals = board[rowIndex];
    if (row_vals.includes(guess)) return false;

    // check col
    for (let i = 0; i < 9; i++) {
        if (board[i][colIndex] === guess) return false;
    }

    // check 3x3 box
    let rowIndex_start = Math.floor(rowIndex / 3) * 3
    let colIndex_start = Math.floor(colIndex / 3) * 3
    for (let rowIndex_2 = rowIndex_start; rowIndex_2 < rowIndex_start + 3; rowIndex_2++) {
        for (let colIndex_2 = colIndex_start; colIndex_2 < colIndex_start + 3; colIndex_2++) {
            if (board[rowIndex_2][colIndex_2] === guess) return false;
        }
    }

    // if is valid
    return true;
}

const findNextZero = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return [i, j];
        }
    }

    // if no 0 exists anywhere in the board
    return null;
}

const findValidNums = (rowIndex, colIndex, board) => {
    let arrToReturn = [];
    for (let num = 1; num <= 9; num++) {
        if (checkIfValid(num, rowIndex, colIndex, board)) arrToReturn.push(num);
    }
    return arrToReturn;
}

const checkIfSolved = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

const delay = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 10);
    });
}

const solveHelper = async (board, setBoard) => {
    await delay();

    board = JSON.parse(JSON.stringify(board));
    setBoard(board);

    // Base case: if sudoku is solved, then return the board
    if (checkIfSolved(board)) return board;

    const [rowIndex, colIndex] = findNextZero(board);

    let validGuesses = findValidNums(rowIndex, colIndex, board);

    // Base case: if there are no valid guesses, then puzzle can't be solved
    if (validGuesses.length === 0) return null;

    // recursively call solveHelper with the valid guess included in the board
    for (let i = 0; i < validGuesses.length; i++) {
        board[rowIndex][colIndex] = validGuesses[i];
        let recursiveResult = await solveHelper(board, setBoard);

        if (recursiveResult != null) {  // if the guess eventually leads to a solution
            return recursiveResult;
        }
        // else try again with next guess
    }

    // if none of the guesses lead to a solution
    return null;
}

const solveSudoku = async (board, setBoard) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = parseInt(board[i][j]);
        }
    }

    return await solveHelper(board, setBoard);
}

export {
    solveSudoku, checkIfSolved, checkIfValid
};