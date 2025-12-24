"use client";

import QuickviewIcon from "@/components/Icons/QuickviewIcon";
import Tooltip from "@/components/Tooltip/Tooltip";
import classNames from "classnames";
import { FC } from "react";

type QuickViewButtonProps = {
  viewMode: string;
  onPress?: () => void;
};

const QuickViewButton: FC<QuickViewButtonProps> = ({ viewMode, onPress }) => {
  return (
    <div
      onClick={onPress}
      className={classNames({
        "group/btnQuickView cart-img-btn ease-[cubic-bezier(0.11, 0, 0.5, 0)] absolute right-[16px] top-[72px] bg-white transition duration-300 hover:bg-black sm:right-[8px] sm:top-[48px]":
          true,
        hidden: viewMode === "rows",
      })}
    >
      <div>
        <Tooltip
          text="Quickview"
          distance="left-[-93px] top-[9px] sm:top-[6px] scale-[.7] translate-x-[30px] group-hover/btnQuickView:translate-x-[0] group-hover/btnQuickView:scale-[1] opacity-0 transition duration-150 group-hover/btnQuickView:opacity-100"
          pointerSide="right"
        />
      </div>
      <QuickviewIcon customClass="group-hover/btnQuickView:[&_path]:!stroke-white group-hover/btnQuickView:[&_circle]:!stroke-white sm:w-[19px] sm:h-[19px]" />
    </div>
  );
};

export default QuickViewButton;
