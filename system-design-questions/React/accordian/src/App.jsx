import { useState } from "react";

const data = [
  {
    header: "Header 01",
    content: "Content 01"
  },
  {
    header: "Header 02",
    content: "Content 02"
  },
  {
    header: "Header 03",
    content: "Content 03"
  },
  {
    header: "Header 04",
    content: "Content 04"
  }
];
const Accordian = ({ data }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleHeaderClick = (index) => {
    if (!isOpen) {
      setClickedIndex(index);
      setIsOpen(true);
    } else {
      setClickedIndex(null);
      setIsOpen(false);
    }
  };
  return (
    <div className="mainContainer">
      {data.map((val, i) => (
        <div className="accordianContainer">
          <div className="accordionHeader" key={i} onClick={() => handleHeaderClick(i)}>
            {val.header}
          </div>
          {clickedIndex === i && <div className="accordionBody">{val.content}</div>}
        </div>
      ))}
    </div>
  );
};
function App() {
  return (
    <>
      <h2>Accordian</h2>
      <Accordian data={data} />
    </>
  );
}

export default App;
