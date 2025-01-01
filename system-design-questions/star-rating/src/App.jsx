import { useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating";

function App() {
  const [rating, setRating] = useState(0);
  const handleChange = r => setRating(r);

  return (
    <>
      <h2>Star Rating</h2>
      <StarRating onChange={handleChange} rating={rating} size={5} />
      <p>Current Rating : {rating} </p>
    </>
  );
}

export default App;
