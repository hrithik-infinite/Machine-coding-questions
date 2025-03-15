import { useState } from "react";

const DropDown = ({ data = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");

  const onSelectVal = (selectedValue) => {
    setVal(selectedValue);
    setIsOpen(false);
    onSelect(selectedValue);
  };

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropDown">
      <div className="dropdown-container" onClick={toggleDropDown}>
        {val || "Select an option"}
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {data.map((option, i) => (
            <li className="dropdown-item" key={i} onClick={() => onSelectVal(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function App() {
  const data = ["Option 01", "Option 02", "Option 03", "Option 04", "Option 05", "Option 06"];

  const handleSelection = (selectedData) => {
    console.log(selectedData);
  };

  return (
    <>
      <h2>Dropdown</h2>
      <DropDown data={data} onSelect={handleSelection} />
    </>
  );
}

export default App;
