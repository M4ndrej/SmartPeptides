import { RefObject, useCallback, useEffect, useRef } from "react";

export type ElementDimensions = {
  width: number;
  height: number;
};

const areDimensionsEqual = (prev: ElementDimensions, curr: ElementDimensions) =>
  prev.width === curr.width && prev.height === curr.height;

function useResizeObserver<T extends HTMLElement | null>(
  ref: RefObject<T>,
  handler: (dimensions: ElementDimensions) => void
) {
  const dimensions = useRef<ElementDimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) return;
      const entry = entries[0];
      const newDimensions = {
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      };
      const isEqual = areDimensionsEqual(dimensions.current, newDimensions);
      if (!isEqual) {
        dimensions.current = newDimensions;
        handler(newDimensions);
      }
    },
    [handler]
  );

  useEffect(() => {
    const node = ref.current || (document.documentElement as HTMLElement);

    const resizeObserver = new ResizeObserver((entries) =>
      handleResize(entries)
    );
    resizeObserver.observe(node);

    return () => {
      if (node) {
        resizeObserver.unobserve(node);
      }
    };
  }, [handleResize]);
}

export default useResizeObserver;
