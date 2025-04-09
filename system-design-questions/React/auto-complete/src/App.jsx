import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [isRes, setIsRes] = useState(false);
  const [ipVal, setIpVal] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const fetchData = async () => {
    if (isRes) {
      if (cache[ipVal]) {
        console.log("CACHE HIT");
        setResults(cache[ipVal]);
      } else {
        console.log("API CALL :", ipVal);
        console.log("CACHE MISS");
        const resp = await fetch(`https://dummyjson.com/recipes/search?q=${ipVal}`);
        const data = await resp.json();
        setResults(data?.recipes || []);
        setCache((prevCache) => ({ ...prevCache, [ipVal]: data?.recipes }));
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ipVal]);

  return (
    <>
      <h1>Auto Complete Component</h1>
      <input className="inputBox" type="text" value={ipVal} onChange={(e) => setIpVal(e.target.value)} onFocus={() => setIsRes(true)} onBlur={() => setIsRes(false)}></input>
      {isRes && (
        <div className="suggestionList">
          <ul className="res-list">
            {results.map((res) => (
              <li key={res.id}>{res.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
