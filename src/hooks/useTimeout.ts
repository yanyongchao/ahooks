import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number) {
  const fnRef = useRef(callback);

  fnRef.current = callback;

  useEffect(() => {
    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}
