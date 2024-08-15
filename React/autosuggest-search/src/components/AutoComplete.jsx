import { useEffect, useState } from "react";
import "./style.css";
import SuggestionList from "./SuggestionList";
/* eslint-disable react/prop-types */
const AutoComplete = ({ placeholder = "", fetchSuggestion, dataKey = "", customeLoading = "Loading...", onSelect = () => {}, onChange = () => {}, onBlur = () => {}, onFocus = () => {}, customStyles = {}, staticData }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onSelect(suggestion);
  };

  const getSuggestion = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((val) => val.toLowerCase().includes(query.toLowerCase()));
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      setSuggestion(result);
    } catch (error) {
      setError("Failed");
      setSuggestion([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue?.length > 1) {
      getSuggestion(inputValue);
    } else {
      setSuggestion([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="container">
      <input type="text" value={inputValue} placeholder={placeholder} style={customStyles} onBlur={onBlur} onFocus={onFocus} onChange={handleInputChange} />
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">{customeLoading}</div>}
      {suggestion && suggestion.length > 0 && (
        <ul className="suggestion-list">
          <SuggestionList dataKey={dataKey} highlight={inputValue} suggestions={suggestion} onSuggestionClick={handleSuggestionClick} />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
