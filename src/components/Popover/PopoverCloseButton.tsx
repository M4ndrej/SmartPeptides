import classNames from "classnames";
import { FC } from "react";
import XMarkIcon from "../Icons/XMarkIcon";
import { PopoverPosition } from "@/types/popover";

interface PopoverCloseButtonProps {
  position: PopoverPosition;
  closePopover: () => void;
  className?: string;
  width?: number;
  height?: number;
}

const PopoverCloseButton: FC<PopoverCloseButtonProps> = ({
  closePopover,
  className,
  width = 32,
  height = 32,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "group absolute right-[10px] top-4 z-[2] select-none xl:right-4",
        className
      )}
      onClick={closePopover}
    >
      <XMarkIcon width={width} height={height} className="!stroke-gray2" />
    </button>
  );
};

export default PopoverCloseButton;
