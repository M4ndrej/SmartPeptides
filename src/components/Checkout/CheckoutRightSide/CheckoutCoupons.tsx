"use client";

import { removeCouponCode } from "@/app/actions/coupons/remove/actions";
import XMarkIcon from "@/components/Icons/XMarkIcon";
import Spinner from "@/components/SvgComponents/Spinner";
import { formatCurrency } from "@/helpers/curency_format";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import { FC, useState } from "react";
import { mutate } from "swr";

interface CheckoutCouponsProps {
  cartData: CartResponse;
  isProcessing?: boolean;
}

const CheckoutCoupons: FC<CheckoutCouponsProps> = ({
  cartData,
  isProcessing,
}) => {
  const [removeCouponLoading, setRemoveCouponLoading] = useState("");

  const handleRemoveCouponCode = async (code: string) => {
    setRemoveCouponLoading(code);
    const remove_coupon = await removeCouponCode(code);
    if (remove_coupon.success) {
      mutate("/api/cart/get_cart", {
        cart: remove_coupon.success.cart.data,
        loggedUser: "success",
      });
      mutate("/api/checkout");
      setRemoveCouponLoading("");
    } else {
    }
  };

  if (!cartData.cart.coupons.length) return null;

  return cartData.cart.coupons.map((coupon, i) => (
    <div key={i} className="font-D16px-M13px mt-[16px] flex justify-between">
      <p>{coupon.code === "store credit" ? "Store Credits" : "Coupon"}</p>
      <p>
        {" "}
        <span
          className={classNames(
            "flex items-center overflow-hidden text-[#E7461E]",
            isProcessing && "processing"
          )}
        >
          {removeCouponLoading == coupon.code ? (
            <Spinner customClass="mr-[8px]" />
          ) : (
            <span
              className={classNames(
                "mr-[8px] flex items-center gap-x-[8px]",
                removeCouponLoading && "cursor-wait",
                !removeCouponLoading &&
                  "cursor-pointer [&_circle]:hover:fill-[#E7461E]"
              )}
              onClick={() =>
                !removeCouponLoading ? handleRemoveCouponCode(coupon.code) : {}
              }
            >
              <XMarkIcon width={24} height={24} className="!stroke-gray3" />
              {coupon.code !== "store credit" && (
                <span className="rounded-[4px] border-2 border-dotted border-gray3 px-[16px] py-[3px] text-black hover:bg-gray4">
                  {coupon.code}
                </span>
              )}
            </span>
          )}

          {formatCurrency(+`-${+coupon.amount}`, false, false)}
        </span>
      </p>
    </div>
  ));
};

export default CheckoutCoupons;
