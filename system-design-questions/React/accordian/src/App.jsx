import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        console.log(json);
      });
  }, []);

  const toggleActive = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="main-div">
      {data.map((val, i) => (
        <div key={i} className="accordion-container">
          <div className="accordion" onClick={() => toggleActive(i)}>
            <span>{val.title}</span>
            <span className="caret">{activeIndex === i ? "▴" : "▾"}</span>
          </div>
          {activeIndex === i && <div className="accordion-content">{val.content}</div>}
        </div>
      ))}
    </div>
  );
}

export default App;
