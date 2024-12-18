import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const data = [
    "apple",
    "banana",
    "mango"
  ]
  const fetchSuggestion = async() =>{

  }
  return (
    <>
    <h1>AutoComplete</h1>
      <AutoComplete
      placeholder = {"Enter Receipe"}
      fetchSuggestion = {fetchSuggestion}
      dataKey = {"name"}
      customLoader = {<>Loadinnngggggggggg</>}
      onSelect = {(res) => console.log(res)}
      customStyles = {{}}
      // staticData={data}
      />
    </>
  );
}

export default App;
