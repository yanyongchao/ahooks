import { EffectCallback, useRef } from 'react';

export function useMemoizedFn(effect: EffectCallback) {
  const fnRef = useRef(effect);

  fnRef.current = effect;

  const memoizedFn = useRef(() => {
    fnRef.current();
  });

  return memoizedFn;
}
