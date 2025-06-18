import { useState } from "react";

function App() {
  const [chips, setChips] = useState(["1", "2", "3"]);
  const [val, setVal] = useState("");
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      const item = val.trim();
      if (item) {
        setChips([...chips, item]);
        setVal("");
      }
    }
  };
  const handleDelete = (i) => {
    setChips(chips.filter((_, idx) => idx !== i));
  };
  return (
    <div className="App">
      <h2>Chips Input</h2>
      <input placeholder="Type a chip and press tag" type="text" onChange={(e) => setVal(e.target.value)} value={val} onKeyDown={handleSubmit} className="input-box" />
      <div className="chips-data">
        {chips.map((val, i) => (
          <div className="item" key={i}>
            <span>{val}</span> <button onClick={() => handleDelete(i)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
