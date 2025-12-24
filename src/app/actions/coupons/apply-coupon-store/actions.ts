"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export async function applyCouponStoreValue(couponCode: string) {
  const result = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/apply-coupon-store-value?coupon_code=${encodeURIComponent(couponCode)}`,
    method: "POST",
    apiType: "user",
  });
  const data = await result.json();

  if (data.success) {
    return {
      success: data,
    };
  }
  return {
    errors: data.message,
  };
}
