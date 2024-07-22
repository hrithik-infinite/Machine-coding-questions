import { useState } from "react";
import "./App.css";
import StarRating from "./StarRating";

function App() {
  const [currentRating, setCurrentRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
  };
  return (
    <div>
      <h2>Star Rating</h2>
      <StarRating size={5} rating={currentRating} onChange={handleRatingChange} />
      <p>Current Rating : {currentRating}</p>
    </div>
  );
}

export default App;
