/* eslint-disable react/prop-types */
import { useState } from "react";

const DropDown = ({ options = [], onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };
  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption}
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
