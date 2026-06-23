import { ProductNew } from "@/types/product";
import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";

interface SingleProductPriceRangeProps {
  mainProduct: ProductNew;
}

const SingleProductPriceRange: FC<SingleProductPriceRangeProps> = ({
  mainProduct,
}) => {
  return (
    <div
      className={`${
        mainProduct?.variations.length > 1 && "pt-[12px] sm:pt-[8px]"
      }`}
    >
      <div className="font-D20px-M18px font-medium leading-[28px] text-[#333333]">
        {mainProduct.variations.length > 1 && (
          <>
            {mainProduct.variations[0].sku === "10017"
              ? formatCurrency(
                  +mainProduct.variations[mainProduct.variations.length - 1]
                    .price,
                  true
                )
              : formatCurrency(+mainProduct.variations[0].price, true)}{" "}
            -{" "}
            {mainProduct.variations[0].sku === "10017"
              ? formatCurrency(+mainProduct.variations[0].price, true)
              : formatCurrency(
                  +mainProduct.variations[mainProduct.variations.length - 1]
                    .price,
                  true
                )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProductPriceRange;
