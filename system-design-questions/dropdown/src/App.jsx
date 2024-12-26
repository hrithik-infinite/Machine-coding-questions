import "./App.css";
import DropDown from "./Components/DropDown";

function App() {
  const data = {
    title: "Title 01",
    options: ["Option 01", "Option 02", "Option 03", "Option 04", "Option 05", "Option 06"]
  };
  const handleSelection = (data) => {
    alert(data);
  };
  return (
    <div>
      <DropDown title={data.title} options={data.options} onSelect={handleSelection} />
    </div>
  );
}

export default App;
