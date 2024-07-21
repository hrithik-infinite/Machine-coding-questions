import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./Pagination";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProduts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();
    if (data?.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
      console.log(data);
    }
  };

  useEffect(() => {
    fetchProduts();
  }, [page]);

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.map((val) => {
            return (
              <span className="products__single" key={val.id}>
                <img src={val.thumbnail} alt={val.title} />
                <span>{val.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
    </>
  );
}

export default App;
