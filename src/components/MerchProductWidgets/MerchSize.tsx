import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC, useState } from "react";
import classNames from "classnames";
import RulerIcon from "../Icons/RulerIcon";
import MerchSizeGuide from "./MerchSizeGuide";

const getSortedSizes = (sizes?: string[]) => {
  const sizeOrder = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  return (
    sizes?.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)) ??
    sizeOrder
  );
};

interface SingleMerchSizeProps {
  size: string;
  selectedSize?: string;
}

const SingleMerchSize: FC<SingleMerchSizeProps> = ({ size, selectedSize }) => {
  return (
    <div
      className={classNames(
        "flex h-10 w-10 select-none items-center justify-center rounded-[5px] border-2 bg-white",
        selectedSize === size ? "border-[#333333]" : " border-borderColor"
      )}
    >
      {size}
    </div>
  );
};

interface MerchSizeProps {
  mainProduct: ProductNew;
  selectedSize: string | undefined;
  handleChangeSize: (option: string) => void;
  handleClearSize: () => void;
  hasOverlay?: boolean;
  setHasOverlay?: (val: boolean) => void;
  redBorder?: boolean;
}

const MerchSize: FC<MerchSizeProps> = ({
  mainProduct,
  selectedSize,
  handleChangeSize,
  handleClearSize,
  hasOverlay,
  setHasOverlay,
  redBorder,
}) => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const sizeAttribute = mainProduct.attributes.find((a) => a.name === "Size");

  if (!sizeAttribute) return null;

  const options = getSortedSizes(sizeAttribute.options);

  return (
    <>
      <SingleProductAttributes
        title="SIZE"
        mainProduct={mainProduct}
        options={options}
        selectedOption={selectedSize}
        handleChangeOption={handleChangeSize}
        handleClearOption={handleClearSize}
        hasOverlay={hasOverlay}
        setHasOverlay={setHasOverlay}
        redBorder={redBorder}
        renderOption={(option) => (
          <SingleMerchSize size={option} selectedSize={selectedSize} />
        )}
      />
      <div
        className="group flex w-fit cursor-pointer items-center justify-start gap-2 text-black transition-colors duration-300 hover:text-[#333333]"
        onClick={() => setIsSizeOpen(true)}
      >
        <RulerIcon className="transition-colors duration-300 group-hover:fill-[#333333]" />
        <span className="select-none text-sm underline">Size guide</span>
      </div>
      <MerchSizeGuide isOpen={isSizeOpen} setIsOpen={setIsSizeOpen} />
    </>
  );
};

export default MerchSize;
