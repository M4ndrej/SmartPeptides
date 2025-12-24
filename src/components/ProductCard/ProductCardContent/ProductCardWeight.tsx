import VariationButton from "@/components/VariationButton/VariationButton";
import { useThemeContext } from "@/context/theme-provider";
import { CartItemContext } from "@/types/cart_types";
import { ProductNew } from "@/types/product";
import classNames from "classnames";
import { FC, useMemo } from "react";

interface WeightVariationButtonProps {
  mainProduct: ProductNew;
  weight: string;
  selectedWeight?: string;
  handleSelectWeight: (option: string) => void;
  isMegaMenuMobile?: boolean;
}

const WeightVariationButton: FC<WeightVariationButtonProps> = ({
  mainProduct,
  weight,
  selectedWeight,
  handleSelectWeight,
  isMegaMenuMobile,
}) => {
  const appContext: any = useThemeContext();
  const { cartItems } = appContext.state;

  const currentVariation = mainProduct.variations.find(
    (item) => item.attributes[0].option === weight
  );

  const isVariationInCart =
    (cartItems as CartItemContext[])?.findIndex(
      (item) => item.id == +currentVariation?.id!
    ) > -1;

  return (
    <VariationButton
      onClick={() => handleSelectWeight(weight)}
      variationValue={weight}
      variationSelected={weight === selectedWeight}
      variationAddedToCart={isVariationInCart}
      isMegaMenuMobile={isMegaMenuMobile}
    />
  );
};

interface ProductCardWeightProps {
  mainProduct: ProductNew;
  selectVariationActive?: boolean;
  selectFirstVariation?: boolean;
  toggleOverlay?: () => void;
  viewMode?: string;
  section?: string;
  selectedWeight?: string;
  handleSelectWeight: (val: string) => void;
  isMegaMenuMobile?: boolean;
}

const ProductCardWeight: FC<ProductCardWeightProps> = ({
  mainProduct,
  selectVariationActive,
  selectFirstVariation,
  toggleOverlay,
  viewMode,
  section,
  selectedWeight,
  handleSelectWeight,
  isMegaMenuMobile,
}) => {
  const productWeightOptions = useMemo(() => {
    const options = mainProduct?.attributes?.[0]?.options;
    if (!options || options.length < 2) return [];
    return options;
  }, [mainProduct]);

  return (
    <div
      className={classNames(
        "relative mr-[-4px] flex items-center gap-[4px] bg-white p-[4px] transition duration-200",
        !selectFirstVariation &&
          !selectVariationActive &&
          !toggleOverlay &&
          "mr-[-4px] rounded-[5px] border-[2px] border-white dark:!border-none dark:!bg-transparent",
        selectVariationActive && !selectFirstVariation && "z-[99999999991]",
        selectVariationActive &&
          !selectFirstVariation &&
          !toggleOverlay &&
          "mr-[-4px] rounded-[5px] border-[2px] !border-red",
        (viewMode === "5x5" ||
          viewMode === "rows" ||
          section === "mega-menu") &&
          "ml-[-4px]",
        isMegaMenuMobile && "!border-none !bg-transparent !text-darkgray"
      )}
    >
      {productWeightOptions?.map((weight) => (
        <WeightVariationButton
          key={weight}
          mainProduct={mainProduct}
          weight={weight}
          selectedWeight={selectedWeight}
          handleSelectWeight={handleSelectWeight}
          isMegaMenuMobile={isMegaMenuMobile}
        />
      ))}
      {!toggleOverlay && (
        <span
          className={classNames(
            "absolute bottom-[-18px] left-[50%] translate-x-[-50%] whitespace-nowrap text-[8px] font-bold leading-[10px] text-red opacity-0 transition duration-200 sm:left-0 sm:translate-x-0",
            selectVariationActive &&
              !selectFirstVariation &&
              !toggleOverlay &&
              "opacity-100",
            section === "mega-menu" && "left-0"
          )}
        >
          Select weight
        </span>
      )}
    </div>
  );
};

export default ProductCardWeight;
