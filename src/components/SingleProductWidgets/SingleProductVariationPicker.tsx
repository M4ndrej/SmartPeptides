import { Attribute2, ProductNew } from "@/types/product";
import SingleProductSelectWeight from "./SingleProductSelectWeight";
import { FC, RefObject } from "react";

interface SingleProductVariationPickerProps {
  mainProduct: ProductNew;
  selectedAttributes: Attribute2[] | undefined;
  handleSelectAttribute: (name: string, val: string) => void;
  weightOrVolume: string;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
  containerRef?: RefObject<HTMLDivElement>;
}

const SingleProductVariationPicker: FC<SingleProductVariationPickerProps> = ({
  mainProduct,
  selectedAttributes,
  handleSelectAttribute,
  weightOrVolume,
  hasOverlay,
  setHasOverlay,
  redBorder,
  containerRef,
}) => {
  return (
    <div className="w-full" ref={containerRef}>
      <SingleProductSelectWeight
        mainProduct={mainProduct}
        selectedWeight={
          selectedAttributes?.find((a) => a.name === weightOrVolume)?.option ||
          undefined
        }
        handleChangeWeight={(val) => handleSelectAttribute(weightOrVolume, val)}
        handleClearWeight={() => handleSelectAttribute(weightOrVolume, "")}
        weightOrVolume={weightOrVolume}
        hasOverlay={hasOverlay}
        setHasOverlay={setHasOverlay}
        redBorder={redBorder}
      />
    </div>
  );
};

export default SingleProductVariationPicker;
