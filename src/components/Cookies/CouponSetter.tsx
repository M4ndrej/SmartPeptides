"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { addCouponCode } from "@/app/actions/coupons/add/actions";
import { mutate } from "swr";

const CouponSetter = () => {
  const searchParams = useSearchParams();

  const couponCode = searchParams.get("coupon_code");

  const applyCouponCB = async (coupon: string) => {
    const apply = await addCouponCode(coupon);
    if (apply.success) {
      await mutate("/api/cart/get_cart");
    }
  };

  useEffect(() => {
    if (couponCode) {
      applyCouponCB(couponCode);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [couponCode]);

  return null;
};

export default CouponSetter;
