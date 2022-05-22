import { useEffect, useRef } from 'react';

export function useInterval(
  callback: () => void,
  delay: number,
  options?: {
    immediate?: boolean;
  },
) {
  const fnRef = useRef(callback);

  fnRef.current = callback;

  useEffect(() => {
    if (options?.immediate) {
      fnRef.current();
    }

    const timer = setInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}
