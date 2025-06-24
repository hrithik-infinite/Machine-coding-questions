import { useEffect, useLayoutEffect, useState } from "react";

export default function UseEffect() {
  const [data, setData] = useState();
  const fetchUser = async () => {
    const resp = await fetch("https://dummyjson.com/test");
    const data = await resp.json();
    setData(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(int);
    };
  }, []);
  useLayoutEffect(() => {
    // for(let i = 0 ;i <1e10 ; i++){
    //     i;
    // }
  }, []);

  return (
    <div>
      <h5>Q-1 : What is use effect in react</h5>
      {/* Answer: useEffect is a React Hook that lets you perform side effects in function components,
            such as fetching data, updating the DOM, or setting up subscriptions.
            It runs after the render and can be controlled to run on specific state or prop changes. */}
      <h5>Q-2: why is dependency array used in use effect</h5>
      {/*
                    The dependency array in useEffect controls when the effect runs:
                    1. No dependency array: useEffect runs after every render.
                             useEffect(() => { ... });
                    2. Empty dependency array ([]): useEffect runs only once after the initial render (componentDidMount).
                             useEffect(() => { ... }, []);
                    3. With dependencies ([dep1, dep2]): useEffect runs after the initial render and whenever any dependency changes.
                             useEffect(() => { ... }, [dep1, dep2]);
            */}
      <h5>Q-3 Example of useEffect for data fetching</h5>
      <div>{JSON.stringify(data)}</div>

      <h5>Q-4: how to perform cleanup in useEffect? Explain with example</h5>
      <div>{seconds}</div>
      <h5>Q-5: Explain useLayoutEffect and how is it different from useEffect</h5>
      {/*
            useLayoutEffect is a React Hook that works similarly to useEffect, but it fires synchronously after all DOM mutations and before the browser paints.
            This means updates inside useLayoutEffect are applied before the user sees any changes, making it useful for reading layout or synchronously re-rendering.
            Difference: useEffect runs asynchronously after the paint, while useLayoutEffect runs synchronously before the paint.
        */}
    </div>
  );
}
