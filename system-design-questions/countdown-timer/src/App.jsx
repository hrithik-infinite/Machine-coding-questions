import { useState } from "react";
import "./App.css";
import useTimer from "./hooks/use-timer";

function App() {
  const [started, setStarted] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);
  const handleUserInput = e => {
    const { name, value } = e.target;
    if (name === "hour") setHr(value);
    else if (name === "min") setMin(value);
    else if (name === "sec") setSec(value);
  };
  const startTimer = () => {
    setStarted(true);
  };
  const { hours, minutes, seconds } = useTimer(hr, min, sec, started, setStarted);
  return (
    <>
      {started ? (
        <div>
          <p>Hours Left: {hours}</p>
          <p>Minutes Left: {minutes}</p>
          <p>Seconds Left: {seconds}</p>
        </div>
      ) : (
        <div>
          <label>H:</label>
          <input name="hour" value={hr} type="number" onChange={handleUserInput}></input>
          <label>M:</label>
          <input name="min" value={min} type="number" onChange={handleUserInput}></input>
          <label>S:</label>
          <input name="sec" value={sec} type="number" onChange={handleUserInput}></input>
          <button onClick={startTimer}>Start Timer</button>
        </div>
      )}
    </>
  );
}

export default App;
