import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const fetchSuggestion = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      return data.recipes;
    } catch (e) {
      throw new Error(e);
    }
  };
  const staticData = [
    "apple",
    "banana",
    "cherry",
    "grape",
    "orange",
    "mango",
    "peach",
    "pear",
    "pineapple",
    "strawberry",
    "watermelon",
    "blueberry",
    "kiwi",
    "papaya",
    "plum",
    "pomegranate",
    "raspberry",
    "blackberry",
    "coconut",
    "fig",
    "guava",
    "lemon",
    "lime",
    "nectarine",
  ];

  return (
    <>
      <AutoComplete
        placeholder={"Enter Recipe"}
        fetchSuggestion={fetchSuggestion}
        dataKey={"name"}
        customeLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
        // staticData={staticData}
      />
    </>
  );
}

export default App;
