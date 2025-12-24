"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export async function removeCouponCode(couponCode: string) {
  const result = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/remove-coupon/?coupon_code=${couponCode}`,
    method: "POST",
    apiType: "user",
  });
  const data = await result.json();
  if (data.success) {
    return {
      success: data,
    };
  } else {
    return {
      errors: data.error,
    };
  }
}
