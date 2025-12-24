"use client";

import { FC, useMemo, useState } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import Quantity from "../Quantity/Quantity";
import { mutate } from "swr";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { CartItemType } from "@/types/cart_types";
import updateCartItemQuantity from "@/app/actions/cart/update_quantity/actions";
import AuthorizedImage from "../Image/Image";
import CartItemSinglePrice from "./CartItemSinglePrice";
import XMarkIcon from "../Icons/XMarkIcon";
import CartItemTotal from "./CartItemTotal";
import CartItemMerchVariations from "./CartItemMerchVariations";
import { getComProductSlug } from "@/helpers/product_helper";

type CartItemProps = {
  item: CartItemType;
  closePopover?: () => void;
  handleRemoveFromCart?: () => void;
};

const CartItem: FC<CartItemProps> = ({
  item,
  closePopover,
  handleRemoveFromCart,
}) => {
  const [updating, setUpdating] = useState(false);

  const handleQuantatyChange = async (quantity: number) => {
    const updateCartData = {
      key: item.key,
      quantity: quantity,
    };

    setUpdating(true);

    const handleUpdateQuantity = await updateCartItemQuantity(updateCartData);

    if (handleUpdateQuantity.success) {
      mutate("/api/cart/get_cart", {
        cart: handleUpdateQuantity.success.cart.data,
        loggedUser: "success",
      });
    }
    setUpdating(false);
  };

  const itemName = item?.link.split("/");
  const itemURL = itemName[itemName.length - 2];
  const router = useRouter();

  const navigateToProductHandler = () => {
    closePopover && closePopover();
    setTimeout(() => {
      router.push(`/${getComProductSlug({ slug: itemURL })}`);
    }, 500);
  };

  const productQuantaty = +item.quantity || 0;

  const isMerch = useMemo(
    () => item?.categories?.some((c) => c.slug === "merch"),
    [item]
  );

  const isGift = useMemo(() => item?.is_gift_item, [item]);

  return (
    <div>
      <div
        className={classNames({
          "flex w-full items-center": true,
          "pointer-events-none opacity-20": updating,
        })}
      >
        <div className="flex flex-1">
          <div
            className="mr-[16px] flex h-[72px] w-[58px] cursor-pointer select-none bg-lightgray sm:h-[70px]"
            onClick={navigateToProductHandler}
          >
            <AuthorizedImage
              src={item.image?.src}
              height={70}
              width={70}
              alt="Motsc"
              className={classNames(
                "object-cover",
                item.id === 114189 && "sm:scale-90",
                isMerch && "scale-75"
              )}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div
              onClick={navigateToProductHandler}
              className="font-D16px-M12px cursor-pointer  font-bold transition-[color] duration-300 ease-in-out hover:text-[#E7461E]"
            >
              {item.title}{" "}
            </div>
            <div className="mr-[16px] mt-[8px] flex items-center sm:mr-[0px]">
              {!isGift && (
                <Quantity
                  changeQuantaty={handleQuantatyChange}
                  handleRemoveFromCart={handleRemoveFromCart}
                  quantityNumber={productQuantaty}
                  smallerSize={true}
                />
              )}
              {isMerch && (
                <CartItemMerchVariations item={item} isGift={isGift} />
              )}
              <CartItemSinglePrice item={item} />
            </div>
          </div>
          <div
            className={classNames({
              "flex flex-1 flex-col items-end justify-between pb-[4px] sm:pb-[7px]":
                true,
              "!pb-[8px] sm:!pb-[13px]": productQuantaty < 4,
            })}
          >
            <div
              className="flex h-[28px] w-[28px] translate-y-[-2px] cursor-pointer items-center justify-center rounded-[24px] transition duration-200"
              onClick={handleRemoveFromCart}
            >
              <XMarkIcon
                width={28}
                height={28}
                strokeWidth={0.5}
                className="transition-150 !stroke-gray2 duration-150 hover:!stroke-[#E7461E]"
              />
            </div>
            <CartItemTotal item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
