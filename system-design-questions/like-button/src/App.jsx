import { useState } from "react";
import "./App.css";
import LikeButton from "./Components/LikeButton";

function App() {
  const [liked, setIsliked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      setError(false);
      const resp = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: liked ? "unlike" : "like"
        })
      });
      if (resp.status === 200) {
        setIsliked((prev) => !prev);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <LikeButton liked={liked} error={error} onClick={handleClick} loading={loading}></LikeButton>
    </>
  );
}

export default App;
