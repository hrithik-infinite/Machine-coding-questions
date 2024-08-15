import React from "react";
/* eslint-disable react/prop-types */
import "./style.css";

const SuggestionList = ({ suggestions = [], highlight, dataKey, onSuggestionClick }) => {
  const getHighlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <span key={index} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: "bold" } : {}}>
        {part}
      </span>
    ));
  };

  return (
    <React.Fragment>
      {suggestions.map((sugg, index) => {
        const currSugg = dataKey ? sugg[dataKey] : sugg;
        return (
          <li key={index} onClick={() => onSuggestionClick(currSugg)} className="suggestion-item">
            {getHighlightText(currSugg, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionList;
