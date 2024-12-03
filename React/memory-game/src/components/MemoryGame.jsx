import { useEffect, useState, useCallback } from "react";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  // Handle grid size change
  const onGridSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  // Initialize the game
  const initGame = useCallback(() => {
    setWon(false);
    setSolved([]);
    setFlipped([]);
    const totalCards = gridSize * gridSize;
    const pairs = Math.floor(totalCards / 2);
    const nums = [...Array(pairs).keys()].map((n) => n + 1);
    const shuffled = [...nums, ...nums].sort(() => Math.random() - 0.5).map((number, indx) => ({ id: indx, number }));
    setCards(shuffled);
  }, [gridSize]);

  // Check for match
  const checkMatch = useCallback(
    (secondId) => {
      const [firstId] = flipped;
      if (cards[firstId]?.number === cards[secondId]?.number) {
        setSolved((prev) => [...prev, firstId, secondId]);
      }
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 500);
    },
    [flipped, cards]
  );

  // Handle card click
  const handleClick = (id) => {
    if (disabled || won || flipped.includes(id) || solved.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    } else {
      setDisabled(true);
      setFlipped((prev) => [...prev, id]);
      checkMatch(id);
    }
  };

  // Helpers
  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  // Initialize game when gridSize changes
  useEffect(() => {
    initGame();
  }, [gridSize, initGame]);

  // Check win condition
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>

      {/* Input */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (2-10)
        </label>
        <input type="number" id="gridSize" min="2" max="10" value={gridSize} onChange={onGridSizeChange} className="border-2 border-gray-300 rounded-md px-2 py-1" />
      </div>

      {/* Game Board */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 4}rem)`,
        }}
        role="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square flex items-center justify-center text-xl font-bold
              rounded-lg cursor-pointer ${isFlipped(card.id) ? (isSolved(card.id) ? "bg-green-400 text-white" : "bg-blue-500 text-white") : "bg-gray-300 text-gray-400"}`}
            onClick={() => handleClick(card.id)}
            role="button">
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {/* Result */}
      {won && <div className="mt-4 text-4xl font-bold text-green-500 animate-bounce">You Won!</div>}

      {/* Reset Button */}
      <button onClick={initGame} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
