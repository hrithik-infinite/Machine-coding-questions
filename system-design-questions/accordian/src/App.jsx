import "./App.css";
import Accordian from "./components/Accordian";

function App() {
  const data = [
    {
      header: "Header 01",
      content: "Content 01",
    },
    {
      header: "Header 02",
      content: "Content 02",
    },
    {
      header: "Header 03",
      content: "Content 03",
    },
    {
      header: "Header 04",
      content: "Content 04",
    },
  ];

  return (
    <>
      <Accordian data={data} />
    </>
  );
}

export default App;
