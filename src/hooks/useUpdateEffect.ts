import { useEffect, DependencyList, EffectCallback } from 'react';
import { useIsFirstRender } from './useIsFirstRender';

type effectHookType = typeof useEffect;

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (isFirst) return;
    effect();
  }, deps);
}
