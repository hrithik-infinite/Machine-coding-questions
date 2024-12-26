import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./Components/ProgressBar";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <ProgressBar width={value} />
    </div>
  );
}

export default App;
