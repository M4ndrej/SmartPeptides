import { FC } from "react";
import classNames from "classnames";
import { PopoverPosition } from "@/types/popover";
import ArrowRight from "../Icons/ArrowRight";
import ArrowLeft from "../Icons/ArrowLeft";

interface PopoverArrowProps {
  position: PopoverPosition;
  closePopover: () => void;
  text?: string;
  count?: number;
  className?: string;
}

const PopoverArrow: FC<PopoverArrowProps> = ({
  position,
  closePopover,
  text,
  count,
  className,
}) => {
  const shouldShowCount = count !== null && count !== undefined;
  return (
    <button
      type="button"
      className={classNames(
        "absolute top-[316px] max-w-fit cursor-pointer select-none bg-[#333333] transition-all duration-300 hover:bg-[#333333] sm:hidden",
        (position === "top" || position === "bottom") && "hidden",
        position === "right" && "left-0 -translate-x-[100%] rounded-l-[5px]",
        position === "left" && "right-0 translate-x-[100%] rounded-r-[5px]",
        className
      )}
      onClick={closePopover}
    >
      <div
        className={classNames(
          "font-14px-ALL flex h-[44px] items-center py-[10px] font-medium text-textWhite",
          position === "right" && "right-[100%]",
          position === "right" && !!text && "pl-4 sm:pl-0",
          position === "left" && "flex-row-reverse",
          position === "left" && !!text && "pr-4 sm:pr-0"
        )}
      >
        <span className="inline-block truncate sm:hidden md:min-w-0 md:max-w-[98px] from834:max-w-none">
          {text}
        </span>
        {shouldShowCount && <span className="ml-1 sm:hidden">({count})</span>}

        {position === "right" ? (
          <ArrowRight width={32} height={32} className="stroke-textWhite" />
        ) : (
          <ArrowLeft width={32} height={32} className="stroke-textWhite" />
        )}
      </div>
    </button>
  );
};

export default PopoverArrow;
