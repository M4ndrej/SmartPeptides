"use client";

import { useScrollContext } from "@/context/ScrollContext";
import classNames from "classnames";
import { FC, ReactNode } from "react";
import AppScroll from "./AppScroll";

export type ScrollDirection = "up" | "down";

interface MainScrollProps {
  children: ReactNode;
  className?: string;
}

const MainScroll: FC<MainScrollProps> = ({ children, className }) => {
  const { direction, scrollTop } = useScrollContext(["direction", "scrollTop"]);

  const mainUpdateCB = (prev: number, next: number, heightFromTop: number) => {
    direction.set(prev < next ? "down" : "up");
    scrollTop.set(heightFromTop);
  };

  const contentClassNames = (_: boolean, isDragging: boolean) => {
    return classNames(
      "h-full !w-full",
      isDragging && "select-none resize-none",
      className
    );
  };

  const scrollBarClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "transition-w duration-200",
      isHovering || isDragging ? "w-3 sm:w-2" : "w-2 sm:w-1.5"
    );
  };

  const trackClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "bg-gray-scroll transition-opacity duration-200",
      isHovering || isDragging ? "opacity-75" : "opacity-0"
    );
  };

  const thumbClassNames = (isHovering: boolean, isDragging: boolean) => {
    return classNames(
      "transition-colors duration-200",
      isHovering || isDragging ? "bg-[#333333]" : "bg-[#f0f0f0]",
      isDragging ? "cursor-grabbing" : "cursor-grab"
    );
  };

  return (
    <AppScroll
      contentId={"main-scroll-content"}
      holderClassNames={"absolute inset-0"}
      scrollbarClassNames={scrollBarClassNames}
      trackClassNames={trackClassNames}
      thumbClassNames={thumbClassNames}
      contentClassNames={contentClassNames}
      scrollUpdateCB={mainUpdateCB}
    >
      {children}
    </AppScroll>
  );
};

export default MainScroll;
