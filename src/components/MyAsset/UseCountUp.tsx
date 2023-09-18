import { scroll } from "framer-motion";
import { useEffect, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

type UseCountNumProps = {
  end: number;
  start?: number;
  duration?: number;
};

export default function UseCountNum({
  end,
  start = 0,
  duration = 2000,
}: UseCountNumProps): number {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => {
      clearInterval(counter);
    };
  }, [end, frameRate, start, totalFrame]);

  return count;
}
