import React from "react";
import { useState } from "react";

const StarRating = ({ size, rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };
  return (
    <div className="star__rating">
      {Array(size)
        .fill("")
        .map((_, i) => {
          const starValue = i + 1;
          let starClass = "star";
          if (hoveredRating >= starValue) {
            starClass += " hover";
          } else if (rating >= starValue) {
            starClass += " active";
          }
          return (
            <span key={i} className={starClass} onMouseEnter={() => handleStarHover(starValue)} onMouseLeave={() => handleStarHover(0)} onClick={() => onChange(starValue)}>
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
