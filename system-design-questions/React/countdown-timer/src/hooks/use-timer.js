import { useEffect, useState } from "react";

const useTimer = (hrs, mins, secs, started, setStarted) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!started) return;
    const totalInput = Number(secs) + Number(mins) * 60 + Number(hrs) * 3600;
    setLeft(totalInput);

    const interval = setInterval(() => {
      setLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, secs, mins, hrs, setStarted]);
  const hours = Math.floor(left / 3600);
  const minutes = Math.floor((left % 3600) / 60);
  const seconds = left % 60;

  return { hours, minutes, seconds };
};

export default useTimer;
