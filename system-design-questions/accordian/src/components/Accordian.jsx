/* eslint-disable react/prop-types */
import { useState } from "react";

const Accordian = ({ data = [] }) => {
    const [clickedAccordion, setClickedAccordion] = useState(null);
  const handleHeaderClick = (index) => {
    setClickedAccordion(clickedAccordion === index ? null : index);
};
  return (
    <div className="componentContainer">
    {data.map((item, index) => (
        <div key={index} className="accordionContainer">
            <div
                className="accordionHeader"
                onClick={() => handleHeaderClick(index)}
            >
                {item.header}
            </div>
            {clickedAccordion === index && (
                <div className="accordionBody">{item.content}</div>
            )}
        </div>
    ))}
</div>
  );
};

export default Accordian;
