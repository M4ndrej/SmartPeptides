// import useWindowKeydown from "@/hooks/useWindowKeydown";
import classNames from "classnames";
import { FC, ReactNode, useRef } from "react";
import SuspendRender from "../SuspendRender/SuspendRender";
import { PopoverPosition } from "@/types/popover";
import Backdrop from "../Backdrop/Backdrop";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export type PopoverElementsClasses =
  | string
  | ((isOpen: boolean, isVisible: boolean) => string);

export type ElementRenderer = (closePopover: () => void) => ReactNode;

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position?: PopoverPosition;
  containerClassNames?: PopoverElementsClasses;
  children: ElementRenderer;
  onClose?: () => void;
}

const Popover: FC<PopoverProps> = ({
  isOpen,
  setIsOpen,
  position = "right",
  containerClassNames,
  children,
  onClose,
}) => {
  const closePopover = () => {
    setIsOpen(false);
    onClose?.();
  };

  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(popoverRef, closePopover);

  //   useWindowKeydown(
  //     (key) => {
  //       if (isOpen && key === "Escape") {
  //         closePopover();
  //         (document.activeElement as HTMLElement)?.blur();
  //       }
  //     },
  //     [isOpen]
  //   );

  return (
    <SuspendRender isRendered={isOpen}>
      {(isVisible, isExiting) => (
        <>
          <Backdrop isVisible={isVisible} isExiting={isExiting} />
          <div
            ref={popoverRef}
            className={classNames(
              "fixed top-0 z-[10000] max-h-[100dvh] w-max transform bg-white  p-8 transition-transform duration-300 ease-in-out xs:p-[10px] sm:w-screen sm:p-6",
              (position === "right" || position === "left") &&
                "max-w-[600px] sm:max-w-none",
              position === "right" && "inset-y-0 right-0 translate-x-full !p-0",
              position === "left" && "inset-y-0 left-0 -translate-x-full !p-0",
              position === "top" &&
                "inset-x-0 right-0 !w-full -translate-y-full",
              position === "bottom" &&
                "inset-x-0 right-0 !w-full translate-y-full",
              isVisible && "!translate-x-0 !translate-y-0",
              containerClassNames &&
                (typeof containerClassNames == "string"
                  ? containerClassNames
                  : containerClassNames(isOpen, isVisible))
            )}
          >
            {children(closePopover)}
          </div>
        </>
      )}
    </SuspendRender>
  );
};

export default Popover;
