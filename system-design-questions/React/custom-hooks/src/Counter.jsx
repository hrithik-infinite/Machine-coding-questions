import { useState } from "react";
import useCustomEffect from "./hooks/use-custom-effect";

function Counter() {
  const [count, setCount] = useState(0);
  //   const [count1, setCount1] = useState(0);

  const handleDecrement = () => setCount(count - 1);
  const handleIncrement = () => setCount(count + 1);
  useCustomEffect(() => {
    console.log("Effect Triggered", count);
    return () => {
      console.log("Cleanup");
    };
  },[]);
  console.log("Rendered");
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Counter;
