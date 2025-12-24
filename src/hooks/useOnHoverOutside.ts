import { useEffect, RefObject } from "react";

const useOnHoverOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: (hoveredElement: HTMLElement | null) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(
        event.clientX,
        event.clientY
      );

      if (
        !hoveredElement ||
        (ref.current && ref.current.contains(hoveredElement))
      ) {
        return;
      }

      handler(hoveredElement as HTMLElement);
    };

    document.addEventListener("mouseover", listener);

    return () => {
      document.removeEventListener("mouseover", listener);
    };
  }, [ref, handler]);
};

export default useOnHoverOutside;
