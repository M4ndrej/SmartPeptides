// useValueTransition.ts
import { useEffect, useRef, useState } from "react";

export function useValueTransition(
  isOpen: boolean,
  delay: number,
  triggerValue?: any
): [boolean, boolean, boolean] {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevTriggerValueRef = useRef(triggerValue);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen && !prevIsOpenRef.current) {
      // Modal is opening
      setIsMounted(true);
      setIsTransitioning(true);
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, delay);
    } else if (!isOpen && prevIsOpenRef.current) {
      // Modal is closing
      setIsTransitioning(true);
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setIsMounted(false);
      }, delay);
    }

    prevIsOpenRef.current = isOpen;

    return () => clearTimeout(timeoutId);
  }, [isOpen, delay]);

  useEffect(() => {
    if (prevTriggerValueRef.current !== triggerValue && isMounted) {
      // Modal content is changing
      setIsTransitioning(true);
      const timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, delay);

      prevTriggerValueRef.current = triggerValue;

      return () => clearTimeout(timeoutId);
    }
  }, [triggerValue, delay, isMounted]);

  return [isMounted, isTransitioning, isOpen];
}
