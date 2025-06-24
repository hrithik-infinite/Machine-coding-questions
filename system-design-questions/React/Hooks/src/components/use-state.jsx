import { useState } from "react";

export default function UseState() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState();
  const handleInc = () => {
    // Calling setCount three times with functional update
    // React batches state updates, but functional form ensures latest state
    // So final count increases by 3 on every click
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const handleIp = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      <h5>Ques 1: Explain useState in React</h5>
      {/*
        useState is a React Hook to add state in functional components.
        Syntax: const [state, setState] = useState(initialValue);
        - state: current value
        - setState: function to update the value
        On state change, component re-renders automatically.
      */}

      <div>Current Count: {count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>

      <h5>Ques 2: What's the output of handleInc?</h5>
      <button onClick={handleInc}>Increase by 3</button>
      {/*
        Inside handleInc:
        - setCount(prev => prev + 1) is called three timese
        - Using functional form ensures latest value is used
        - React batches state updates but functional updates stack correctly
        Final Output: Count increases by 3 on every button click
      */}

      <h5>Ques 3: What is Two-Way Data Binding and how to achieve it?</h5>
      {/*
        Two-Way Data Binding:
        - Syncs state and UI both ways
        - When state changes -> UI updates
        - When user updates input -> state updates
        Here:
        - value binds state to input
        - onChange updates state on user input
        - Achieves two-way binding
      */}
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>{name}</div>
      <h5>Ques 3: Build as form containing First name, last name , email use only one state to manage all fields?</h5>
      <form onSubmit={() => {}}>
        <input placeholder="First Name" type="text" name="firstname" onChange={handleIp} />
        <input placeholder="Last Name" type="text" name="lastname" onChange={handleIp} />
        <input placeholder="Email" type="email" name="email" onChange={handleIp} />
      </form>
      <div>{JSON.stringify(userData)}</div>
    </div>
  );
}
