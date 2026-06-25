"use client";

import classNames from "classnames";
import { FC, ReactNode } from "react";
import Scroll, { ResizeCB, ScrollUpdateCB } from "./Scroll";

interface InsideScrollProps {
  children: ReactNode;
  className?: string;
  updateCB?: ScrollUpdateCB;
  resizeCB?: ResizeCB;
}

const InsideScroll: FC<InsideScrollProps> = ({
  children,
  className,
  updateCB,
  resizeCB,
}) => {
  const contentClassNames = (_: boolean, isDragging: boolean) => {
    return classNames(isDragging && "select-none resize-none", className);
  };

  const scrollBarClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "transition-w duration-200",
      isHovering || isDragging ? "w-2" : "w-1"
    );
  };

  const trackClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "bg-gray-scroll transition-all duration-200",
      isHovering || isDragging ? "opacity-75" : "opacity-0"
    );
  };

  const thumbClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "bg-[#9A9A9F] transition-opacity duration-fast",
      isHovering || isDragging ? "opacity-100" : "opacity-50",
      isDragging ? "cursor-grabbing" : "cursor-grab"
    );
  };

  return (
    <Scroll
      scrollbarClassNames={scrollBarClassNames}
      trackClassNames={trackClassNames}
      thumbClassNames={thumbClassNames}
      contentClassNames={contentClassNames}
      scrollUpdateCB={updateCB}
      resizeCB={resizeCB}
    >
      {children}
    </Scroll>
  );
};

export default InsideScroll;
