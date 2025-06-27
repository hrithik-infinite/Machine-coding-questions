import "./App.css";
import UseEffect from "./components/use-effect";
import UseRef from "./components/use-ref";
import UseState from "./components/use-state";

function App() {
  return (
    <>
      <h1>UseState</h1>
      <UseState />
      <h1>UseEffect</h1>
      <UseEffect />
      <h1>UseRef</h1>
      <UseRef />
    </>
  );
}

export default App;
