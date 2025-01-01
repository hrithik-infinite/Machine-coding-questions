/* eslint-disable react/prop-types */
const StarRating = ({ size, onChange, rating }) => {
  return (
    <div className="stars">
      {Array(size)
        .fill("")
        .map((_, i) => {
          const val = i + 1;
          let starClass = "star_symbol";
          if (rating >= val) starClass += " active";
          return (
            <span key={i} className={starClass} onClick={() => onChange(val)}>
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
