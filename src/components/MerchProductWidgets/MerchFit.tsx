import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC } from "react";
import classNames from "classnames";

interface SingleMerchFitProps {
  fit: string;
  selectedFit?: string;
}

const SingleMerchFit: FC<SingleMerchFitProps> = ({ fit, selectedFit }) => {
  return (
    <div
      className={classNames(
        "flex cursor-pointer select-none items-center justify-center rounded-[4px]  border-[1px] px-[15px] py-[7px]  text-[16px] leading-[24px] transition duration-200 sm:px-[16px] sm:py-[8px] sm:text-[14px] sm:font-normal sm:leading-[22px]",
        fit == selectedFit
          ? "border-[#E7461E] bg-[#E7461E] text-textWhite"
          : "border-borderColor text-gray2 hover:border-[#E7461E] hover:text-[#E7461E]"
      )}
    >
      {fit}
    </div>
  );
};

interface MerchFitProps {
  mainProduct: ProductNew;
  selectedFit: string | undefined;
  handleChangeFit: (option: string) => void;
  options: string[];
}

const MerchFit: FC<MerchFitProps> = ({
  mainProduct,
  selectedFit,
  handleChangeFit,
  options,
}) => {
  if (!options?.length) return null;

  return (
    <SingleProductAttributes
      title="STYLE"
      withSelectedText={false}
      mainProduct={mainProduct}
      options={options}
      selectedOption={selectedFit}
      handleChangeOption={handleChangeFit}
      renderOption={(option) => (
        <SingleMerchFit fit={option} selectedFit={selectedFit} />
      )}
    />
  );
};

export default MerchFit;
