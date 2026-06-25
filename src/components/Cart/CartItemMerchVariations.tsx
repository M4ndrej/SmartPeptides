import { CartItemType } from "@/types/cart_types";
import classNames from "classnames";
import { FC } from "react";

interface CartItemMerchVariationsProps {
  item: CartItemType;
  isGift?: boolean;
}

const CartItemMerchVariations: FC<CartItemMerchVariationsProps> = ({
  item,
  isGift,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-start gap-2",
        !isGift && "ml-4 "
      )}
    >
      {item?.variation
        ?.filter((v) => ["Color", "Size"].includes(v.attribute))
        ?.map((v) => (
          <div
            key={v.attribute}
            className={classNames(
              "relative flex h-[27px] w-[27px] items-center justify-center rounded-[5px] border-2",
              v.attribute === "Color" ? "border-lightgray" : "border-[#9A9A9F]",
              v.attribute === "Color" && v.value === "white" && "bg-white",
              v.attribute === "Color" && v.value == "black" && "bg-black"
            )}
          >
            {v.attribute === "Size" && (
              <span className="text-sm font-bold capitalize text-darkgray">
                {v.value}
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default CartItemMerchVariations;
