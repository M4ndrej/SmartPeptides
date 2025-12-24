import { Attribute2, ProductNew, Variation } from "@/types/product";
import MerchColors from "./MerchColors";
import MerchSize from "./MerchSize";
import { FC, RefObject } from "react";
import MerchVariations from "./MerchVariations";
import MerchVersions from "./MerchVersions";
import MerchFullStyle from "./MerchFullStyle";

interface MerchVariationPickerProps {
  mainProduct: ProductNew;
  handleSelectAttribute: (name: string, val: string) => void;
  selectedAttributes: Attribute2[];
  selectedVariation?: Variation;
  handleChangeVariation: (variation: Variation) => void;
  includeAllVariations?: boolean;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
  containerRef?: RefObject<HTMLDivElement>;
}

const MerchVariationPicker: FC<MerchVariationPickerProps> = ({
  mainProduct,
  handleSelectAttribute,
  selectedAttributes,
  selectedVariation,
  handleChangeVariation,
  includeAllVariations = true,
  hasOverlay,
  setHasOverlay,
  redBorder,
  containerRef,
}) => {
  return (
    <div className="flex w-full flex-col gap-2" ref={containerRef}>
      {/* Select Variation */}
      {includeAllVariations && (
        <MerchVariations
          mainProduct={mainProduct}
          selectedVariation={selectedVariation}
          handleChangeVariation={handleChangeVariation}
        />
      )}

      {/* Select Version */}
      {mainProduct.attributes.find((a) => a.name === "Version") && (
        <MerchVersions
          mainProduct={mainProduct}
          selectedVersion={
            selectedAttributes.find((a) => a.name === "Version")?.option
          }
          handleChangeVersion={(val) => handleSelectAttribute("Version", val)}
          handleClearVersion={() => handleSelectAttribute("Version", "")}
          hasOverlay={hasOverlay}
          setHasOverlay={setHasOverlay}
          redBorder={redBorder}
        />
      )}

      {/* Select Style */}
      {mainProduct.attributes.find((a) => a.name === "Style") && (
        <MerchFullStyle
          mainProduct={mainProduct}
          selectedFullStyle={
            selectedAttributes.find((a) => a.name === "Style")?.option
          }
          handleChangeFullStyle={(val) => handleSelectAttribute("Style", val)}
          handleClearFullStyle={() => handleSelectAttribute("Style", "")}
          hasOverlay={hasOverlay}
          setHasOverlay={setHasOverlay}
          redBorder={redBorder}
        />
      )}

      {/* Select Colors */}
      {mainProduct.attributes.find((a) => a.name === "Color") && (
        <MerchColors
          mainProduct={mainProduct}
          selectedColor={
            selectedAttributes.find((a) => a.name === "Color")?.option
          }
          handleChangeColor={(val) => handleSelectAttribute("Color", val)}
          handleClearColor={() => handleSelectAttribute("Color", "")}
          hasOverlay={hasOverlay}
          setHasOverlay={setHasOverlay}
          redBorder={redBorder}
        />
      )}

      {/* Select Size */}
      {mainProduct.attributes.find((a) => a.name === "Size") && (
        <MerchSize
          mainProduct={mainProduct}
          selectedSize={
            selectedAttributes.find((a) => a.name === "Size")?.option
          }
          handleChangeSize={(val) => handleSelectAttribute("Size", val)}
          handleClearSize={() => handleSelectAttribute("Size", "")}
          hasOverlay={hasOverlay}
          setHasOverlay={setHasOverlay}
          redBorder={redBorder}
        />
      )}
    </div>
  );
};

export default MerchVariationPicker;
