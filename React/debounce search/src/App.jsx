import { useState, useCallback } from "react";

function debounce(func, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);
  const debouncedFetch = useCallback(debounce(fetchRes), []);
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedFetch(e.target.value);
  };
  async function fetchRes(query) {
    const resp = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    const data = await resp.json();
    setRes(data.recipes);
  }
  return (
    <>
      <h1>Debounce Search</h1>
      <input id="search" placeholder="Search" value={query} onChange={handleChange}></input>
      <ul>{res && res.length > 0 && res.map((val) => <li key={val.id}>{val.name}</li>)}</ul>
    </>
  );
}

export default App;
