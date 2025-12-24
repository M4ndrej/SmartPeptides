"use client";

import useDebounce from "@/hooks/useDebounce";
import { FC, ReactNode } from "react";

export type SuspendRenderChildrenRenderer = (
  isVisible: boolean,
  isExiting: boolean
) => ReactNode;

type SuspendRenderProps = {
  children: ReactNode | SuspendRenderChildrenRenderer;
  isRendered: boolean;
  delay?: number;
  enterDelay?: number;
};

const SuspendRender: FC<SuspendRenderProps> = ({
  children,
  isRendered,
  delay = 300,
  enterDelay = 30,
}) => {
  const isVisible = useDebounce(isRendered, enterDelay);
  const isExiting = useDebounce(isRendered, delay);

  return (
    <>
      {(isRendered || isExiting) &&
        (typeof children === "function"
          ? children(isVisible, isExiting)
          : children)}
    </>
  );
};

export default SuspendRender;
