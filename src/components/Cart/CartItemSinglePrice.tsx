import { formatCurrency } from "@/helpers/curency_format";
import { CartItemType } from "@/types/cart_types";
import { FC } from "react";

interface CartItemSinglePriceProps {
  item: CartItemType;
}

const CartItemSinglePrice: FC<CartItemSinglePriceProps> = ({ item }) => {
  // const quantity = +item.quantity || 0;
  // const discount = quantity >= 10 ? 0.08 : quantity >= 5 ? 0.05 : 0;
  return (
    <div className="font-D16px-M13px ml-[10px] flex items-center gap-[8px] text-gray2 sm:ml-[8px] sm:leading-[16px]">
      x{" "}
      <div className="flex flex-col">
        {/* <div className="font-10px-ALL text-gray2">
          discounted version
          {!!discount && (
            <div>
              <span className="line-through">
                {formatCurrency(+item.price, false, true)}
              </span>{" "}
              {`(-${discount * 100}%)`}
            </div>
          )}
          add X more for X discount
          {[5, 10].includes(quantity + 1) && (
            <div>
              <span className="sm:hidden">add</span>{" "}
              <span className="md:hidden from834:hidden">+</span>1{" "}
              <span className="sm:hidden">more</span> for{" "}
              <strong>
                {quantity === 4 ? "5%" : "8%"}
                <span> disc</span>
                <span className="sm:hidden">ount</span>
              </strong>{" "}
            </div>
          )}
        </div> */}
        <span>{formatCurrency(item.prices.discount_price, false, true)}</span>
      </div>
    </div>
  );
};

export default CartItemSinglePrice;
