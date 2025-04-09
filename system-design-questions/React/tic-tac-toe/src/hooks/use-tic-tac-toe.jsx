import { useState } from "react";

const initBoard = (size) => Array(size * size).fill(null);
const useTicTacToe = (size) => {
  const [board, setBoard] = useState(initBoard(size));
  const [isXNext, setIsXNext] = useState(true);
  const generateWinningPatterns = (size) => {
    const patterns = [];
    for (let i = 0; i < size; i++) {
      const horizontal = [];
      const vertical = [];
      const d1 = [];
      const d2 = [];
      for (let j = 0; j < size; j++) {
        horizontal.push(i * size + j);
        vertical.push(j * size + i);
      }
      d1.push(i * (size + 1));
      d2.push((i + 1) * (size - 1));

      patterns.push(horizontal, vertical, d1, d2);
    }
    return patterns;
  };
  const WINNING_PATTERNS = generateWinningPatterns(size);
  const calculateWinner = (current) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      let countX = 0;
      let countO = 0;
      for (let j = 0; j < pattern.length; j++) {
        const cell = current[pattern[j]];
        if (cell === "X") {
          countX++;
        } else if (cell === "O") {
          countO++;
        }
      }
      if (countX === size) return "X";
      if (countO === size) return "O";
    }
    return null;
  };
  const handleClick = (i) => {
    const winner = calculateWinner(board);
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(initBoard(size));
    setIsXNext(true);
  };

  const getCurrentStatus = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw`;
    return `Player ${isXNext ? "X" : "O"}'s turn`;
  };

  return { board, handleClick, resetGame, getCurrentStatus };
};

export default useTicTacToe;
