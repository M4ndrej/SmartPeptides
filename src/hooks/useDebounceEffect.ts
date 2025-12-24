import { DependencyList, useCallback, useEffect, useRef } from "react";

export declare type UseDebounceEffectReturn = [
  () => boolean | null,
  () => void,
];

function useDebounceEffect(
  func: () => void,
  delay: number = 0,
  deps: DependencyList = []
): UseDebounceEffectReturn {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<() => void>(func);

  useEffect(() => {
    callbackRef.current = func;
  }, [func]);

  const isPending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
      timeoutRef.current = null;
    }, delay);

    return () => {
      cancel();
    };
  }, [...deps, delay, cancel]);

  return [isPending, cancel];
}

export default useDebounceEffect;
