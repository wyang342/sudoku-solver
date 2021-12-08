import React, { useState } from 'react';
import Cell from './Cell';
import { solveSudoku, checkIfSolved } from '../logic/solveSudoku';

const getInitialBoard = () => {
    let initialBoard = [[], [], [], [], [], [], [], [], []];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            initialBoard[row][col] = 0;
        }
    }

    return initialBoard;
}

const showBoard = (board, setBoard) => {
    let actualBoard = [[], [], [], [], [], [], [], [], []]

    // probably not very efficient to call checkIfSolved() on every showBoard()
    if (checkIfSolved(board)) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                actualBoard[row][col] = <Cell bgColor="#77dd77" key={row.toString() + ", " + col.toString()} className="item" initialVal={board[row][col]} />
            }
        }
    } else {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                actualBoard[row][col] = <Cell key={row.toString() + ", " + col.toString()} className="cell" initialVal={board[row][col]} />
            }
        }
    }

    for (let row = 0; row < 9; row++) {
        actualBoard[row] = <div className="row" key={row}>{actualBoard[row]}</div>
    }

    return actualBoard;
}

const handleSubmit = async (evt, setBoard) => {
    evt.preventDefault();

    let boardToSolve = [[], [], [], [], [], [], [], [], []];

    // boardToSolve <- input
    for (let i = 0; i < 81; i++) {
        let rowNum = Math.floor(i / 9);
        boardToSolve[rowNum][i - 9 * rowNum] = evt.target[i].value;
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let guess = parseInt(boardToSolve[row][col]);

            if (isNaN(guess)) {
                alert("Please enter digits. For empty cells, please enter '0'.");
                return;
            }
        }
    }

    let solvedBoard = await solveSudoku(boardToSolve, setBoard);
    setBoard(solvedBoard);
}

const Board = () => {
    const [board, setBoard] = useState(getInitialBoard());

    return (
        <form onSubmit={(evt) => handleSubmit(evt, setBoard)}>
            <div className="container">{showBoard(board, setBoard)}</div>
            <button type="submit" className="button">Solve</button>
            <button type="button" className="button" onClick={() => window.location.reload()}>Reset</button>
        </form >
    );
}

export default Board;