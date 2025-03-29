import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const fetchData = async (page) => {
    setLoading(true);
    const resp = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
    const dataFromAPI = await resp.json();

    if (dataFromAPI.products.length === 0) {
      setHasMore(false);
    } else {
      setData((prev) => [...prev, ...dataFromAPI.products]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && hasMore) {
          fetchData(page);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, page]
  );
  return (
    <div className="infinite-scroll-container">
      <h1 className="title">Infinite Scrolling</h1>
      <div>
        {data.map((val, i) => (
          <div key={val.id} className="item" ref={i === data.length - 1 ? lastItemRef : null}>
            <h2 className="item-title">{val.title}</h2>
            <p className="item-content">{val.description}</p>
          </div>
        ))}
      </div>
      {loading && <div className="loading-message">Loading more items...</div>}
      {!hasMore && !loading && data.length > 0 && <div className="end-message">You've reached the end!</div>}
      {!hasMore && !loading && data.length === 0 && <div className="no-items-message">No items found</div>}
    </div>
  );
}

export default App;
