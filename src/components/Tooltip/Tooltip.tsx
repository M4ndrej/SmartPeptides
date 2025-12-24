"use client";

import { FC } from "react";
import TooltipPointer from "./TooltipPointer";
interface TooltipProps {
  text: string;
  pointerSide: string;
  distance?: string;
  customClass?: string;
}

const Tooltip: FC<TooltipProps> = ({
  text,
  pointerSide,
  distance,
  customClass,
}) => {
  return (
    <div
      className={`font-12px-ALL pointer-events-none absolute flex h-[21px] min-w-fit items-center justify-center rounded-[5px] bg-darkgray px-[11px] pb-[3px] pt-[3px] text-center text-textWhite  ${distance} ${customClass}`}
    >
      {pointerSide === "left" && <TooltipPointer pointerSide="left" />}
      {text} {pointerSide === "right" && <TooltipPointer pointerSide="right" />}
    </div>
  );
};

export default Tooltip;
