import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC, useMemo } from "react";
import classNames from "classnames";

interface SingleProductSingleWeightProps {
  size: string;
  selectedWeight?: string;
}

const SingleProductSingleWeight: FC<SingleProductSingleWeightProps> = ({
  size,
  selectedWeight,
}) => {
  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none items-center justify-center rounded-[4px]  border-[1px] px-[15px] py-[7px]  text-[16px] leading-[24px] transition duration-200 sm:px-[16px] sm:py-[8px] sm:text-[14px] sm:font-normal sm:leading-[22px]",
        size == selectedWeight
          ? "border-[#E7461E] bg-[#E7461E] text-white"
          : "border-gray2 text-gray2 hover:border-[#E7461E] hover:text-[#E7461E]"
      )}
    >
      {size}
    </div>
  );
};

interface SingleProductSelectWeightProps {
  mainProduct: ProductNew;
  selectedWeight: string | undefined;
  handleChangeWeight: (option: string) => void;
  handleClearWeight: () => void;
  weightOrVolume: string;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const SingleProductSelectWeight: FC<SingleProductSelectWeightProps> = ({
  mainProduct,
  selectedWeight,
  handleChangeWeight,
  handleClearWeight,
  weightOrVolume,
  hasOverlay,
  setHasOverlay,
  redBorder,
}) => {
  const weightAttributes = mainProduct.attributes.find(
    (a) => a.name === weightOrVolume
  );

  const title = useMemo(() => {
    if (mainProduct.id === 114187) return "";
    if (selectedWeight)
      return weightOrVolume === "Weight" ? "WEIGHT" : "VOLUME";
    return weightOrVolume === "Weight" ? "SELECT WEIGHT" : "SELECT VOLUME";
  }, [selectedWeight, mainProduct]);

  if (!weightAttributes) return null;

  return (
    <SingleProductAttributes
      title={title}
      mainProduct={mainProduct}
      options={weightAttributes.options}
      selectedOption={selectedWeight}
      handleChangeOption={handleChangeWeight}
      handleClearOption={handleClearWeight}
      hasOverlay={hasOverlay}
      setHasOverlay={setHasOverlay}
      redBorder={redBorder}
      renderOption={(option) => (
        <SingleProductSingleWeight
          size={option}
          selectedWeight={selectedWeight}
        />
      )}
    />
  );
};

export default SingleProductSelectWeight;
