import { useRef } from 'react';
import throttle from 'lodash/throttle';
import { useUnmount } from './useUnmount';
export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

type noop = (...args: any) => any;

export function useThrottleFn(callback: noop, options: ThrottleOptions) {
  if (typeof callback !== 'function') {
    console.error('fn must be function');
  }
  const fnRef = useRef(callback);
  fnRef.current = callback;
  const wait = options?.wait ?? 1000;
  const throttled = throttle(
    (...args) => {
      return fnRef.current(...args);
    },
    wait,
    options,
  );
  useUnmount(() => {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}
