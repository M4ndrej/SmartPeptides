import { ProductNew } from "@/types/product";
import SingleProductAttributes from "../SingleProductWidgets/SingleProductAttributes";
import { FC, useMemo } from "react";
import classNames from "classnames";
import AuthorizedImage from "../Image/Image";

const productStyleImages = [
  { style: "Male Regular", image: "/images/merch-style-male-regular.svg" },
  { style: "Female Regular", image: "/images/merch-style-female-regular.svg" },
  { style: "Female Loose", image: "/images/merch-style-female-loose.svg" },
];

interface SingleMerchStyleProps {
  style: string;
  mainProduct?: ProductNew;
  selectedStyle?: string;
  selectedFit: string;
}

const SingleMerchStyle: FC<SingleMerchStyleProps> = ({
  style,
  mainProduct,
  selectedStyle,
  selectedFit,
}) => {
  const styleImage = useMemo(() => {
    return productStyleImages.find(
      (item) => item.style == `${selectedFit.slice(0, -4)} ${style}`
    )?.image;
  }, [selectedFit, style]);

  return (
    <div className="relative flex flex-row items-center gap-2">
      <div
        className={classNames(
          "relative h-12 w-12 rounded-[5px] border-2",
          selectedStyle === style ? "border-[#333333]" : "border-borderColor"
        )}
      >
        {!!styleImage && (
          <AuthorizedImage
            src={styleImage}
            width={48}
            height={48}
            alt={`${selectedFit.slice(0, -4)} ${style}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <div
        className={classNames(
          "overflow-hidden transition-all duration-200",
          selectedStyle === style ? "w-[70px]" : "w-0"
        )}
      >
        <div className="flex w-max flex-col gap-0">
          <span>t-shirt:</span>
          <span className="font-bold">{style}</span>
        </div>
      </div>
    </div>
  );
};

interface MerchStyleProps {
  mainProduct: ProductNew;
  selectedStyle: string | undefined;
  handleChangeStyle: (option: string) => void;
  handleClearStyle: () => void;
  options: string[];
  selectedFit: string;
}

const MerchStyle: FC<MerchStyleProps> = ({
  mainProduct,
  selectedStyle,
  handleChangeStyle,
  handleClearStyle,
  options,
  selectedFit,
}) => {
  if (!options.length) return null;

  return (
    <SingleProductAttributes
      mainProduct={mainProduct}
      options={options}
      selectedOption={selectedStyle}
      handleChangeOption={handleChangeStyle}
      handleClearOption={handleClearStyle}
      renderOption={(option) => (
        <SingleMerchStyle
          style={option}
          selectedFit={selectedFit}
          mainProduct={mainProduct}
          selectedStyle={selectedStyle}
        />
      )}
    />
  );
};

export default MerchStyle;
