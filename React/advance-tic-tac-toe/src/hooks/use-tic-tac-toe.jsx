import React, { useState } from "react";

const initBoard = (size) => Array(size * size).fill(null);

const useTicTacToe = (boardSize) => {
  const [board, setBoard] = useState(initBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  const generateWinningPatterns = () => {
    const patterns = [];
    for (let i = 0; i < boardSize; i++) {
      const h = [];
      const v = [];
      for (let j = 0; j < boardSize; j++) {
        h.push(i * boardSize + j);
        v.push(j * boardSize + i);
      }
      patterns.push(h, v);
    }
    const d1 = [];
    const d2 = [];
    for (let i = 0; i < boardSize; i++) {
      d1.push(i * (boardSize + 1));
      d2.push((i + 1) * (boardSize - 1));
    }
    patterns.push(d1, d2);
    return patterns;
  };
  const WINNING_PATTERNS = generateWinningPatterns();
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      let countX = 0;
      let countO = 0;
      for (let j = 0; j < pattern.length; j++) {
        const cell = currentBoard[pattern[j]];
        if (cell === "X") {
          countX++;
        } else if (cell === "O") {
          countO++;
        }
      }
      if (countX === boardSize) return "X";
      if (countO === boardSize) return "O";
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw`;
    return `Player ${isXNext ? "X" : "O"}'s turn`;
  };

  const resetGame = () => {
    setBoard(initBoard(boardSize));
    setIsXNext(true);
  };

  return { board, handleClick, getStatusMessage, resetGame };
};

export default useTicTacToe;
