import { useState, useEffect } from 'react';

export const useCountUp = (end, duration = 2000, isVisible, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;

    const easeOutQuad = (t) => t * (2 - t);

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = easeOutQuad(progress);
      
      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end); // Ensure we end exactly on the target value
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible, start]);

  return count;
};
