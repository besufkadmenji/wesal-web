import { useEffect, useRef, useState } from "react";

export const useCountdownTimer = (initialSeconds: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, remainingSeconds]);

  const start = () => {
    if (remainingSeconds > 0) {
      setIsActive(true);
    }
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = (seconds?: number) => {
    setIsActive(false);
    setRemainingSeconds(seconds ?? initialSeconds);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    remainingSeconds,
    isActive,
    start,
    pause,
    reset,
    formatTime,
  };
};
