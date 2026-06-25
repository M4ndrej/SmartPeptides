import { FC } from "react";
import XMarkIcon from "../Icons/XMarkIcon";
import classNames from "classnames";

interface ModalCloseButtonProps {
  onClose: () => void;
  className?: string;
  type?: "default" | "prod-gallery";
}

const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  onClose,
  className,
  type = "default",
}) => {
  return (
    <button
      className={classNames(
        "group/close absolute right-0 top-[-42px] flex cursor-pointer select-none items-center justify-center border-none outline-none",
        className
      )}
      onClick={onClose}
    >
      <XMarkIcon
        width={32}
        height={32}
        className={classNames("transition-all duration-200", {
          // For product gallery: gray default, white on hover
          "stroke-[#C8C8C8] group-hover/close:stroke-white":
            type === "prod-gallery",
          // Default behavior (white with blue on hover)
          "stroke-textWhite group-hover/close:stroke-[#9A9A9F]":
            type !== "prod-gallery",
        })}
      />
    </button>
  );
};

export default ModalCloseButton;
