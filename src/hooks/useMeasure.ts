import { RefObject, useEffect, useState } from "react";

export type MeasureResult = {
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
};

const useMeasure = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<MeasureResult>({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          const { x, y, top, left, right, bottom, height, width } =
            entries[0].contentRect;
          setDimensions({ x, y, top, left, right, bottom, height, width });
        }
      });
      resizeObserver.observe(node);
      return () => {
        resizeObserver.unobserve(node);
        resizeObserver.disconnect();
      };
    }
  }, [ref]);

  return dimensions;
};

export default useMeasure;
