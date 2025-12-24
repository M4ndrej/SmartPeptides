import React, { FC } from "react";
import classNames from "classnames";
interface OverlayProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ isOpen, onClose, customClass }) => {
  return (
    <div
      id="overlay"
      onClick={onClose}
      className={classNames(
        "ease-[cubic-bezier(0.11, 0, 0.5, 0)] pointer-events-none fixed left-0 top-0 z-[9999999999] h-full w-full bg-backdrop opacity-0 backdrop-blur-[4px] transition-opacity duration-200",
        {
          "pointer-events-auto z-[9999999999] opacity-100": isOpen,
        },
        customClass
      )}
    ></div>
  );
};

export default Overlay;
