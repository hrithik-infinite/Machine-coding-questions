import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./ProgressBar";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 0.1);
    }, 5);
  }, []);
  return (
    <div className="app">
      <ProgressBar value={value} />
    </div>
  );
}

export default App;
