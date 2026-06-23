"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import Spinner from "../SvgComponents/Spinner";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  highlighted?: boolean;
  customClass?: string;
  smallerButton?: boolean;
  showSpiner?: boolean;
  disabled?: boolean;
  reverseColors?: boolean;
  customHighlightedHover?: string;
  id?: string;
  count?: number;
  tabIndex?: number;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      text,
      highlighted,
      customClass,
      smallerButton,
      showSpiner,
      disabled,
      reverseColors,
      customHighlightedHover,
      count,
      id,
      tabIndex,
    },
    ref
  ) => {
    const { pending: spiner } = useFormStatus();
    const longWord =
      text.split(" ").join().replaceAll(",", "").split("").length > 23;

    return (
      <button
        ref={ref}
        id={id}
        type="submit"
        disabled={disabled || spiner}
        tabIndex={tabIndex}
        className={classNames(
          {
            "ml-auto inline-flex w-full select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border border-[#333333] px-[32px] py-[12px] font-medium text-[#333333] !transition-all !duration-300 sm:w-full":
              true,
            "transition-all duration-300 ":
              !disabled && !spiner && !customHighlightedHover,
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
            customHighlightedHover &&
            `transition-all duration-300 ${customHighlightedHover}`,
          `${customClass}`
        )}
      >
        <Spinner
          reverseColors={reverseColors}
          customClass={
            spiner
              ? "!mr-[16px] transtion-mr opacity-100  duration-200 ease-linear"
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

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
