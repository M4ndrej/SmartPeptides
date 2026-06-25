"use client";

import { FC } from "react";
import CheckmarkIcon from "../Icons/CheckmarkIcon";
import classNames from "classnames";

interface VariationButtonProps {
  variationSelected?: boolean;
  variationAddedToCart?: boolean;
  variationValue: string;
  onClick?: () => void;
  largerBtns?: boolean;
  isMegaMenuMobile?: boolean;
}
const VariationButton: FC<VariationButtonProps> = ({
  variationSelected,
  variationAddedToCart,
  variationValue,
  onClick,
  largerBtns,
  isMegaMenuMobile,
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames({
        "font-D10px-M8px group flex h-[18px] max-h-[18px] cursor-pointer select-none items-center justify-center gap-[4px] rounded-[2px] border-[1px] border-gray2 px-[4px] py-[3px] text-gray2 sm:h-[16px] sm:max-h-[16px] sm:px-[5px] lg:hover:border-[#9A9A9F] lg:hover:text-gray":
          true,
        "!border-[#9A9A9F] bg-[#9A9A9F] text-textWhite lg:hover:!border-[#257fca] lg:hover:bg-[#9A9A9F] lg:hover:text-textWhite":
          (variationSelected && variationAddedToCart) || variationSelected,
        "!border-[#9A9A9F] bg-transparent text-darkgray [&_path]:xl:hover:stroke-white":
          !variationSelected && variationAddedToCart,
        "!h-[21px] !max-h-[21px] !px-[8px] !py-[4px] !text-[11px] !leading-[13px]":
          largerBtns,
        ...(isMegaMenuMobile
          ? { "!border-textWhite !text-textWhite": true }
          : {}),
      })}
    >
      <p
        className={classNames({
          "mt-[1px]": largerBtns,
        })}
      >
        {variationValue}
      </p>
      {variationAddedToCart && (
        <CheckmarkIcon
          customClass={`${variationSelected ? "stroke-white" : "stroke-[#9A9A9F] group-hover:xl:!stroke-white"} `}
          largerBtns={largerBtns}
        />
      )}
    </div>
  );
};

export default VariationButton;
