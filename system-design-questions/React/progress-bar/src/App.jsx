import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  const ProgressBar = ({ value }) => {
    return (
      <div className="progress">
        <div style={{ width: `${value > 8 ? value : 8}%` }}>
          <span>{`${value} %`}</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <h2>Progress Bar</h2>
      <ProgressBar value={value} />
    </>
  );
}

export default App;
