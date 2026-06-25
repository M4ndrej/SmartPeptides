import { ProductNew } from "@/types/product";
import { FC, ReactNode } from "react";
import XMarkIcon from "../Icons/XMarkIcon";
import classNames from "classnames";

interface SingleProductAttributesProps {
  title?: string;
  withSelectedText?: boolean;
  options: string[];
  mainProduct?: ProductNew;
  selectedOption: string | undefined;
  handleChangeOption: (option: string) => void;
  handleClearOption?: () => void;
  renderOption: (option: string) => ReactNode;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const SingleProductAttributes: FC<SingleProductAttributesProps> = ({
  title,
  withSelectedText = true,
  mainProduct,
  options,
  selectedOption,
  handleChangeOption,
  handleClearOption,
  renderOption,
  hasOverlay,
  redBorder,
}) => {
  return (
    <div
      className={classNames(
        "relative flex w-max flex-col gap-2 border-2 border-transparent px-2 py-2",
        hasOverlay &&
          !selectedOption &&
          !redBorder &&
          "z-[99999999999991] bg-white",
        hasOverlay &&
          !selectedOption &&
          redBorder &&
          "z-[99999999999991] rounded-[5px] border-2 !border-red"
      )}
    >
      {title && (
        <div className="flex gap-1">
          <span className="font-bold">{title}</span>
          {withSelectedText && <span>: {selectedOption}</span>}
        </div>
      )}
      <div className="flex items-center justify-start gap-4 sm:flex-wrap">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleChangeOption(option)}
            className="cursor-pointer"
          >
            {renderOption(option)}
          </div>
        ))}
        {mainProduct && mainProduct.variations.length && selectedOption && (
          <div className="flex gap-x-[10px]">
            {selectedOption && handleClearOption && (
              <div
                onClick={handleClearOption}
                className="group flex cursor-pointer items-center justify-center gap-[2px]"
              >
                <XMarkIcon
                  strokeWidth={1.5}
                  width={14}
                  height={14}
                  className="mt-[1px] !stroke-gray2 group-hover:!stroke-[#9A9A9F]"
                />
                <span className="font-13px-ALL select-none uppercase text-gray2 group-hover:text-gray">
                  Clear
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductAttributes;
