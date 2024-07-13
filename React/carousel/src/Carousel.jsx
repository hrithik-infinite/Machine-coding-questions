import { useEffect, useRef, useState } from "react";

const Carousel = ({ images = [], isLoading = false, imageLimit = images.length, imagePerSlide = 3 }) => {
  const imageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  console.log(currentIndex);
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      return prev === 0 ? imageLimit - 1 : prev - 1;
    });
  };
  const goToNext = () => {
    setCurrentIndex((prev) => {
      return prev === imageLimit - 1 ? 0 : prev + 1;
    });
  };

  if (isLoading) {
    return <>Loading....</>;
  }
  return (
    <div className="carousel" style={{ width: imagePerSlide * imgWidth }}>
      <div className="image-container" style={{ transform: `translateX(-${currentIndex * imgWidth}px)` }}>
        {images.slice(0, imageLimit > images.length ? images.length : imageLimit).map((image) => {
          return <img onLoad={() => setImgWidth(imageRef?.current?.offsetWidth)} ref={imageRef} key={image.id} src={image.url} alt={image.title} className="image" />;
        })}
      </div>
      <button className="btn prev" onClick={goToPrev}>
        Previous
      </button>
      <button className="btn next" onClick={goToNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
