import { formatCurrency } from "@/helpers/curency_format";
import { ProductNew, Variation } from "@/types/product";
import classNames from "classnames";
import { FC, useMemo } from "react";

interface ProductCardPriceProps {
  mainProduct: ProductNew;
  selectedVariation?: Variation;
  viewMode: string;
  section?: string;
  isMegaMenuMobile?: boolean;
}

const ProductCardPrice: FC<ProductCardPriceProps> = ({
  mainProduct,
  selectedVariation,
  viewMode,
  section,
  isMegaMenuMobile,
}) => {
  const productPrice = useMemo(() => {
    if (mainProduct.variations.length && selectedVariation) {
      return formatCurrency(+selectedVariation.price, true);
    }
    if (mainProduct.variations.length > 1 && !selectedVariation) {
      const prices = mainProduct.variations.map((v) => +v.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (min === max) {
        return formatCurrency(min, true);
      }
      return `${formatCurrency(min, true)} - ${formatCurrency(max, true)}`;
    }
    return formatCurrency(+mainProduct.price, true);
  }, [selectedVariation, mainProduct]);

  return (
    <p
      className={classNames(
        "font-D16px-M11px whitespace-nowrap text-[#333333] sm:leading-[13px]",
        viewMode === "rows" && section !== "mega-menu" && "mb-[4px]",
        section === "mega-menu" && "font-D14px-T12px-M12px",
        isMegaMenuMobile && "text-textWhite"
      )}
    >
      {productPrice}
    </p>
  );
};

export default ProductCardPrice;
