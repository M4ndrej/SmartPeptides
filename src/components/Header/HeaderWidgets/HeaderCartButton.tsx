"use client";

import { useSidePopoverContext } from "@/context/SidePopoverContext";
import { UPDATE_CART_ITEMS } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import { FC, useEffect } from "react";
import useSWR from "swr";
import BagIcon from "../../Icons/BagIcon";

const HeaderCartButton: FC = () => {
  const appContext = useThemeContext();
  const { handlePopoverAction } = useSidePopoverContext();

  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );
  const itemCount = cartData?.cart?.items_count ?? 0;
  const totalPriceInCart = cartData?.cart?.totals?.price;
  const totalPrice = formatCurrency(
    totalPriceInCart ? +totalPriceInCart : 0,
    false,
    false
  );

  useEffect(() => {
    if (cartData?.cart) {
      const cartItems = cartData.cart?.items?.map((item) => {
        return { key: item.key, id: item.id, quantity: item.quantity };
      });
      appContext.dispatch({
        type: UPDATE_CART_ITEMS,
        payload: cartItems,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  return (
    <div className="flex items-center justify-end gap-1 overflow-visible">
      <div className="cart-total font-D16px-M11px pt-[2px] text-right font-medium sm:text-[10px]">
        {totalPrice}
      </div>
      <button
        type="button"
        className="group/cart z-3 relative flex h-[36px] items-center justify-center sm:!h-6 "
        onClick={() => handlePopoverAction(true, "cart")}
      >
        {!!itemCount && (
          <div
            className={classNames(
              "font-D13px-M11px absolute right-[-5px] top-0 flex h-[20px] w-[20px] cursor-pointer select-none items-center justify-center rounded-full bg-[#333333] text-textWhite sm:right-[-3px] sm:top-[-3px] sm:h-[14px] sm:w-[14px] sm:pt-[1px]",
              itemCount > 9 &&
                "right-[-4px] !h-[23px] !w-[23px] pt-[1px] text-[12px] leading-[15px] sm:right-[-8px] sm:top-[-4px] sm:!h-[20px] sm:!w-[20px] sm:pt-0"
            )}
          >
            {itemCount}
          </div>
        )}
        <BagIcon className="transition-colors duration-300 group-hover/cart:!fill-[#333333] sm:!h-6 sm:!w-6" />
      </button>
    </div>
  );
};

export default HeaderCartButton;
