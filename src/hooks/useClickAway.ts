import { useEffect } from 'react';
import type { MutableRefObject } from 'react';

type TargetType = HTMLElement | Element | Window | Document;
type BasicTarget<T extends TargetType = Element> = MutableRefObject<T>;

export function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string | string[],
) {
  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];
      if (targets.some((target) => target.current.contains(event.target))) {
        return;
      }
      onClickAway(event);
    };
    const eventNames = Array.isArray(eventName) ? eventName : [eventName];
    eventNames.forEach((eventName) =>
      window.addEventListener(eventName, handler),
    );
    return () =>
      eventNames.forEach((eventName) =>
        window.removeEventListener(eventName, handler),
      );
  }, []);
}
