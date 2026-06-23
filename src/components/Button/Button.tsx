"use client";

import classNames from "classnames";
import { forwardRef, useRef, useState } from "react";
import Spinner from "../SvgComponents/Spinner";

interface ButtonProps {
  text: string;
  highlighted?: boolean;
  onPress?: () => Promise<any>;
  customClass?: string;
  smallerButton?: boolean;
  showSpiner?: boolean;
  disabled?: boolean;
  reverseColors?: boolean;
  customHighlightedHover?: string;
  id?: string;
  count?: number;
  showSpinerOutside?: boolean;
  customSpinnerClass?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      highlighted,
      onPress,
      customClass,
      smallerButton,
      showSpiner,
      disabled,
      reverseColors,
      customHighlightedHover,
      count,
      id,
      showSpinerOutside,
      customSpinnerClass,
    },
    ref
  ) => {
    const [spiner, setSpiner] = useState<boolean>(false);
    const buttonPressed = useRef<boolean>();

    const handleButtonPress = async () => {
      if (buttonPressed.current || disabled) return;

      buttonPressed.current = true;
      if (showSpiner) setSpiner(true);
      await onPress?.();
      buttonPressed.current = false;
      setSpiner(false);
    };

    const longWord =
      text.split(" ").join().replaceAll(",", "").split("").length > 23;

    return (
      <button
        type="button"
        ref={ref}
        id={id}
        onClick={handleButtonPress}
        className={classNames(
          {
            "inline-flex select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border border-[#333333] px-[32px] py-[12px] font-medium text-[#333333] !transition-all !duration-300 sm:w-full":
              true,
            "transition-all duration-300 ":
              !disabled &&
              !spiner &&
              !showSpinerOutside &&
              !customHighlightedHover,
            "bg-[#333333] text-textWhite hover:text-textWhite": highlighted,
            "hover:bg-[#f0f0f0] hover:text-[#333333] dark:hover:bg-transparent":
              !highlighted,
            "h-[48px]": !smallerButton,
            "h-[44px]": smallerButton,
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
            "sm:!px-[24px]": showSpiner,
          },
          !disabled &&
            !spiner &&
            !showSpinerOutside &&
            customHighlightedHover &&
            `transition-all duration-300 ${customHighlightedHover}`,
          `${customClass}`
        )}
      >
        <Spinner
          reverseColors={reverseColors}
          customClass={
            spiner || showSpinerOutside
              ? `!mr-[16px] transtion-mr opacity-100 duration-200 ease-linear ${customSpinnerClass}`
              : "opacity-0"
          }
        />
        {longWord && (
          <span className="max-w-[87%] overflow-hidden text-ellipsis whitespace-nowrap">
            {text}
          </span>
        )}{" "}
        {!longWord && text}{" "}
        {count && <span className="ml-[5px]">({count})</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
