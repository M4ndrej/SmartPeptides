import { ProductNew, Variation } from "@/types/product";
import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";

interface SingleProductSinglePriceProps {
  product: ProductNew | Variation;
}

const SingleProductSinglePrice: FC<SingleProductSinglePriceProps> = ({
  product,
}) => {
  return (
    <div className="font-D20px-M18px font-medium leading-[28px] text-darkgray">
      {product && <>{formatCurrency(+product.price!, true)}</>}
    </div>
  );
};

export default SingleProductSinglePrice;
