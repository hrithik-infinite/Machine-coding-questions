import { useState } from "react";

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="componentContainer">
      <button
        onClick={() => {
          setIsOpen(prev => !prev);
        }}>
        Show Popover
      </button>
      {isOpen && (
        <div className="popoverContainer">
          <div className="triangle"></div>
          <div className="popoverHeader">Header</div>
          <div className="popoverBody">Content</div>
        </div>
      )}
    </div>
  );
};

export default Popover;
