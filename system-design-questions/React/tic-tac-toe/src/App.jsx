import useTicTacToe from "./hooks/use-tic-tac-toe";

function App() {
  const boardSize = 4;
  const { board, handleClick, resetGame, getCurrentStatus } = useTicTacToe(boardSize);
  return (
    <div className="game" style={{ "--board-size": boardSize }}>
      <div className="status">
        {getCurrentStatus()}
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board">
        {board.map((val, i) => (
          <button className="cell" disabled={!!val} key={i} onClick={() => handleClick(i)}>
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
