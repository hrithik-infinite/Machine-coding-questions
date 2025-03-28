import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

function App() {
  const [prod, setProd] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProds();
  }, [page]);
  const fetchProds = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();
    if (data?.products) {
      setProd(data.products);
      setTotalPages(Math.ceil(data.total / 10));
      console.log(data.products);
    }
  };
  return (
    <>
      <h1>Pagination</h1>
      {prod.length > 0 && (
        <div className="prods">
          {prod.map((val) => (
            <div className="products__single" key={val.id}>
              <img src={val.thumbnail} alt={val.title} />
              <span>{val.title}</span>
            </div>
          ))}
        </div>
      )}
      {prod.length > 0 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
    </>
  );
}

export default App;
