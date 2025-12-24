import { MouseEvent } from "react";

export const isMouseEventAtPossition = (
  e: MouseEvent | globalThis.MouseEvent,
  endLimit: number,
  element: HTMLDivElement
) => {
  const clickTargetElement = element.getBoundingClientRect();
  const clikOnElementLeft = e.clientX - clickTargetElement.left;
  return (
    clikOnElementLeft > clickTargetElement.width - endLimit &&
    clikOnElementLeft < clickTargetElement.width
  );
};

export const isClickInsideScrollBar = (
  barRect: DOMRect | undefined,
  e: MouseEvent
): "top" | "center" | "bottom" | undefined => {
  if (barRect) {
    if (
      e.pageX < barRect.left + barRect.width &&
      e.pageX > barRect.left &&
      e.pageY > barRect.top &&
      e.pageY < barRect.top + barRect.height
    ) {
      return "center";
    } else if (e.pageY < barRect.top) {
      return "top";
    } else if (e.pageY > barRect.top + barRect.height) {
      return "bottom";
    }
  }

  return undefined;
};
