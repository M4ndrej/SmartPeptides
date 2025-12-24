import { WidgetContainerProps } from "@/types/chat";
import classNames from "classnames";
import React, { FC } from "react";
import AnimateHeight from "react-animate-height";
import { isMobile } from "react-device-detect";

export const WidgetContainer: FC<WidgetContainerProps> = ({
  children,
  isChatWidgetOpen,
}) => {
  return (
    <div
      className={classNames({
        "absolute bottom-[74px] right-0 origin-bottom-right transform overflow-hidden rounded-[8px] bg-lightgray shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] transition-all duration-500 ease-out sm:fixed sm:bottom-0 sm:left-0 sm:w-[100vw] sm:rounded-none":
          true,
        "h-[522px] w-[326px] translate-y-[20px] scale-0 opacity-0":
          !isChatWidgetOpen,
        "h-[522px] w-[326px] translate-y-0 scale-100 opacity-100":
          isChatWidgetOpen,
        "sm:h-[100dvh]": isChatWidgetOpen,
        "sm:h-0": !isChatWidgetOpen,
      })}
    >
      <AnimateHeight
        height={isChatWidgetOpen ? (isMobile ? "100%" : 522) : 0}
        className="[&>*:first-child]:h-[522px] sm:[&>*:first-child]:h-[calc(100%-100px)]"
      >
        {children}
      </AnimateHeight>
    </div>
  );
};
