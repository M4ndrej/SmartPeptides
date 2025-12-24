import { formatCurrency } from "@/helpers/curency_format";
import { CartItemType } from "@/types/cart_types";
import { FC } from "react";

interface CartItemTotalProps {
  item: CartItemType;
}

const CartItemTotal: FC<CartItemTotalProps> = ({ item }) => {
  // const quantity = +item.quantity || 0;
  // const total = formatCurrency(+item.total, false, true);
  const discountedPrice = formatCurrency(
    item.prices.total_discount_price,
    false,
    !item?.is_gift_item
    // !(quantity >= 5 || item?.is_gift_item)
  );

  return (
    <div className="font-D16px-M13px font-bold text-[#E7461E] sm:leading-[16px]">
      <div className="flex flex-col items-end">
        {/* {quantity >= 5 && (
          <span className="font-10px-ALL text-gray2 line-through">{total}</span>
        )} */}
        <span>
          {item?.is_gift_item && item.prices.total_discount_price === 0
            ? "FREE GIFT"
            : discountedPrice}
        </span>
      </div>
    </div>
  );
};

export default CartItemTotal;
