import React, { useState } from "react";

const Rating = ({ initialRating, onChange, maxRating = 5 }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
    onChange && onChange(index);
  };

  const getRatingClass = (index) => {
    if (rating >= index) {
      return "text-yellow-500";
    } else if (hoverRating >= index) {
      return "text-yellow-500";
    } else {
      return "text-gray-300";
    }
  };

  const getRatingFraction = (rating) => {
    const fraction = rating % 1;
    if (fraction === 0.5) {
      return "half";
    } else if (fraction > 0) {
      return "more";
    } else {
      return "none";
    }
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer ${getRatingClass(index + 1)}`}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(index + 1)}
        >
          {getRatingFraction(rating) === "half" &&
          index + 1 === Math.floor(rating) + 1 ? (
            <>&#9734;</>
          ) : index + 1 <= Math.floor(rating) ? (
            <>&#9733;</>
          ) : index + 1 === Math.floor(rating) + 1 &&
            getRatingFraction(rating) === "more" ? (
            <>&#9734;</>
          ) : (
            <>&#9734;</>
          )}
        </span>
      ))}
      <span className="ml-2 font-semibold">{rating}</span>
    </div>
  );
};

export default Rating;
