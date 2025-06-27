import { useRef } from "react";

export default function UseRef() {
  const ref = useRef(5);
  console.log("rerender");
  return (
    <div>
      <h5>Q-1: What is useRef in React?</h5>
      {/*
        useRef is a React Hook that allows you to persist values across renders without causing a re-render when the value changes.
        It's commonly used to access and interact with DOM elements directly.
      */}

      <h5>Q-2: How to persist a value across renders using useRef?</h5>
      {/*
        const countRef = useRef(0);
        function handleClick() {
          countRef.current++;
          // UI does not re-render, but value is u  pdated
        }
      */}

      {/* Q-3: How to access a DOM element using useRef? */}
      {/*
        const inputRef = useRef();
        function focusInput() {
          inputRef.current.focus();
        }
        // In JSX:
        // <input ref={inputRef} />
        // <button onClick={focusInput}>Focus Input</button> 
      */}

      <p>{ref.current}</p>
    </div>
  );
}
