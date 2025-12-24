"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export default async function updateCheckoutShippingRates(
  payment_method: string
) {
  const result = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/v1/cart/select-shipping-rate/?rate_id=${payment_method}`,
    method: "POST",
    data: {
      rate_id: payment_method,
    },
    apiType: "user",
  });

  if (result.status === 200) {
    return {
      success: true,
    };
  } else {
    return {
      error: true,
    };
  }
}
