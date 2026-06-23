"use client";

import { FC } from "react";
import SearchIcon from "../../Icons/SearchIcon";
import { useSidePopoverContext } from "@/context/SidePopoverContext";
import classNames from "classnames";

interface HeaderSearchButtonProps {
  isSmaller?: boolean;
}

const HeaderSearchButton: FC<HeaderSearchButtonProps> = ({ isSmaller }) => {
  const { handlePopoverAction } = useSidePopoverContext();
  return (
    <button
      className="group/search flex items-center justify-center"
      type="button"
      onClick={() => handlePopoverAction(true, "search")}
    >
      <SearchIcon
        className={classNames(
          "!fill-black transition-colors duration-300 group-hover/search:!fill-[#333333]",
          isSmaller ? "!h-6 !w-6 sm:!h-5 sm:!w-5" : "sm:!h-6 sm:!w-6"
        )}
      />
    </button>
  );
};

export default HeaderSearchButton;
