import classNames from "classnames";
import { FC } from "react";

interface BackdropProps {
  isVisible: boolean;
  isExiting?: boolean;
  className?: string;
}

const Backdrop: FC<BackdropProps> = ({ isVisible, isExiting, className }) => {
  return (
    <div
      className={classNames(
        "transition-backdrop-blur transition-bg ease-[cubic-bezier(0.11, 0, 0.5, 0)] fixed cursor-pointer bg-backdrop backdrop-blur-[4px] duration-300 sm:delay-100",
        (isVisible || isExiting) && "inset-0 z-[9999]",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
};

export default Backdrop;
