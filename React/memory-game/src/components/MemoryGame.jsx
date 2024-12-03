import { useEffect, useState } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const onGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };
  const initGame = () => {
    setWon(false);
    const totalCards = gridSize * gridSize;
    const pairs = Math.floor(totalCards / 2);
    const nums = [...Array(pairs).keys()].map((n) => n + 1);
    const shuffled = [...nums, ...nums].sort(() => Math.random() - 0.5).map((number, indx) => ({ id: indx, number }));
    setCards(shuffled);
  };
  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 500);
    }
  };
  const handleClick = (id) => {
    if (disabled || won) return;
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };
  const isFlipped = (id) => {
    return flipped.includes(id) || solved.includes(id);
  };
  const isSolved = (id) => {
    return solved.includes(id);
  };
  useEffect(() => {
    initGame();
  }, [gridSize]);
  useEffect(() => {
    if (solved.length === cards.length) {
      setWon(true);
    }
  }, [solved]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
      {/* Input */}
      <div>
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (max 10)
        </label>
        <input type="number" id="gridSize" min="2" max="10" value={gridSize} onChange={onGridSizeChange} className="border-2 border-gray-300 rounded-md px-2 py-1" />
      </div>
      {/* game board */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`,
          width: `min(100%, ${gridSize * 4}rem)`,
        }}>
        {cards.map((val) => {
          return (
            <div
              className={`aspect-square flex items-center justify-center text-xl font-bold
            rounded-lg cursor-pointer  ${isFlipped(val.id) ? (isSolved(val.id) ? "bg-green-400 text-white" : "bg-blue-500 text-white") : "bg-gray-300 text-gray-400"}`}
              onClick={() => handleClick(val.id)}
              key={val.id}>
              {isFlipped(val.id) ? val.number : "?"}
            </div>
          );
        })}
      </div>
      {/* result */}
      {won && <div className="mt-4 text-4xl font-bold text-green-500 animate-bounce">You Won!</div>}
      {/* reseet btn */}
      <button onClick={initGame} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
