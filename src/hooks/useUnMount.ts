import { useEffect, EffectCallback, useRef } from 'react';

export function useUnmount(effect: EffectCallback) {
  const fnRef = useRef(effect);

  fnRef.current = effect;

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
}
