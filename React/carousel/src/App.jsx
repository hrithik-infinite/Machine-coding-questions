import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./Carousel";

function App() {
  const [loading, setLoading] = useState();
  const [images, setImages] = useState();

  const fetchImages = async (limit = 10) => {
    setLoading(true);
    try {
      const resp = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
      const data = await resp.json();
      setImages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages(20);
  }, []);

  return (
    <>
      <div className="carousel_container">
        <Carousel images={images} isLoading={loading} />
      </div>
    </>
  );
}

export default App;
