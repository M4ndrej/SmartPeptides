import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC } from "react";
import classNames from "classnames";

const getSortedColors = (colors?: string[]) => {
  const colorOrder = ["Black", "White"];
  return (
    colors?.sort((a, b) => colorOrder.indexOf(a) - colorOrder.indexOf(b)) ??
    colorOrder
  );
};

interface SingleMerchColorProps {
  color: string;
  mainProduct?: ProductNew;
  selectedColor?: string;
}

const SingleMerchColor: FC<SingleMerchColorProps> = ({
  color,
  selectedColor,
}) => {
  return (
    <div
      className={classNames(
        "h-10 w-10 rounded-[5px] border-2",
        selectedColor === color ? "border-[#9A9A9F]" : "border-borderColor",
        color == "White" && "bg-textWhite",
        color == "Black" && "bg-black2"
      )}
    />
  );
};

interface MerchColorsProps {
  mainProduct: ProductNew;
  selectedColor: string | undefined;
  handleChangeColor: (option: string) => void;
  handleClearColor: () => void;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const MerchColors: FC<MerchColorsProps> = ({
  mainProduct,
  selectedColor,
  handleChangeColor,
  handleClearColor,
  hasOverlay,
  setHasOverlay,
  redBorder,
}) => {
  const colorAttribute = mainProduct.attributes.find((a) => a.name === "Color");

  if (!colorAttribute) return null;

  const options = getSortedColors(colorAttribute.options);

  return (
    <SingleProductAttributes
      title="COLOR"
      mainProduct={mainProduct}
      options={options}
      selectedOption={selectedColor}
      handleChangeOption={handleChangeColor}
      handleClearOption={handleClearColor}
      hasOverlay={hasOverlay}
      setHasOverlay={setHasOverlay}
      redBorder={redBorder}
      renderOption={(option) => (
        <SingleMerchColor color={option} selectedColor={selectedColor} />
      )}
    />
  );
};

export default MerchColors;
