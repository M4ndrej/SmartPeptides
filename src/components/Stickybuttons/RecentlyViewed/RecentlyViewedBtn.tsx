"use client";
import Tooltip from "@/components/Tooltip/Tooltip";
import { FC } from "react";

interface RecentlyViewedBtnProps {
  handlePopoverAction: (open: boolean, type: string, fromTop: boolean) => void;
}

const RecentlyViewedBtn: FC<RecentlyViewedBtnProps> = ({
  handlePopoverAction,
}) => {
  return (
    <div className="group/recently-btn relative flex h-[52px] w-[52px] items-center justify-center rounded-[52px] bg-white shadow-globalShadow">
      <div
        onClick={() => handlePopoverAction(true, "recentlyViewed", false)}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-[52px] text-center"
      >
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 6.5V16L17 20"
            stroke="#898989"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition duration-300 group-hover/recently-btn:stroke-[#E7461E]"
          />
          <circle
            cx="13.5"
            cy="13.5"
            r="12.75"
            stroke="#898989"
            strokeWidth="1.5"
            className="transition duration-300 group-hover/recently-btn:stroke-[#E7461E]"
          />
        </svg>
      </div>
      <div>
        <Tooltip
          text="Recently Viewed"
          distance="left-[-135px] top-[16px] scale-[.7] translate-x-[30px] group-hover/recently-btn:translate-x-[0] group-hover/recently-btn:scale-[1] ease-[cubic-bezier(0.11, 0, 0.5, 0)] opacity-0 transition duration-150 group-hover/recently-btn:opacity-100"
          pointerSide="right"
        />
      </div>
    </div>
  );
};

export default RecentlyViewedBtn;
