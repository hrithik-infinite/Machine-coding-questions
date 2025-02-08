import useTicTacToe from "../hooks/use-tic-tac-toe";

function TicTacToe({ boardSize = 3 }) {
  console.log(boardSize);
  const { board, handleClick, getStatusMessage, resetGame } = useTicTacToe(boardSize);
  return (
    <div className="game" style={{ "--board-size": boardSize }}>
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="board">
        {board.map((b, index) => {
          return (
            <button className="cell" key={index} onClick={() => handleClick(index)} disabled={b !== null}>
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;
