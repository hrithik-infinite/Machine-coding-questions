import { useState } from "react";

function App() {
  const [current, setCurrent] = useState(1);
  const [size] = useState(5);
  const handleClick = (i) => {
    setCurrent(i);
  };
  const RatingComponent = ({ rating, onClick, size }) => {
    return (
      <div className="stars">
        {Array(size)
          .fill("")
          .map((_, i) => {
            let ratingClass = "star_symbol";
            if (rating >= i + 1) ratingClass += " active";
            return (
              <span key={i} onClick={() => onClick(i + 1)} className={ratingClass}>
                &#9733;
              </span>
            );
          })}
      </div>
    );
  };
  return (
    <>
      <h2>Star Rating</h2>
      <RatingComponent rating={current} onClick={handleClick} size={size} />
      <p>Current Rating : {current} </p>
    </>
  );
}

export default App;
