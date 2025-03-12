import { useEffect, useState } from "react";

function App() {
  const [liked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCount((Math.random() * 100).toFixed(0));
  }, []);
  const fakeLikeAPI = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  };
  const handleLike = (isLikedFlag) => {
    setIsLoading(true);
    fakeLikeAPI()
      .then(() => {
        setIsLiked((prev) => !prev);
        setCount((prev) => (isLikedFlag ? Number(prev) - 1 : Number(prev) + 1));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const LikeButton = ({ isLiked, onClick, isLoading }) => {
    return (
      <button className="like-btn" onClick={() => onClick(isLiked)} disabled={isLoading}>
        {isLiked ? "Dislike" : "Like"}
      </button>
    );
  };

  return (
    <>
      <LikeButton isLiked={liked} onClick={handleLike} isLoading={isLoading} />
      <div className="counter">{count}</div>
    </>
  );
}

export default App;
