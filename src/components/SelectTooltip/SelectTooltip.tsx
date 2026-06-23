"use client";

import classNames from "classnames";
import { FC } from "react";

interface SelectWeightTooltio {
  selectVariationActive?: boolean;
  className?: string;
  text?: string;
}

const SelectTooltip: FC<SelectWeightTooltio> = ({
  selectVariationActive,
  className,
  text,
}) => {
  return (
    <div
      className={classNames(
        "font-D12px-M11px duration-400 pointer-events-none absolute right-[-2px] top-[-2px] flex  origin-right scale-x-[.7] select-none items-center whitespace-nowrap rounded-[46px] bg-[#333333] pl-[10px] pr-[50px] uppercase text-textWhite opacity-0 transition  sm:h-[36px] sm:pr-[38px] md:h-[44px] lg:h-[44px]",
        selectVariationActive ? "z-[99999999991] !scale-x-[1] opacity-100" : "",
        className
      )}
    >
      {text ?? "Select options"}
    </div>
  );
};

export default SelectTooltip;
