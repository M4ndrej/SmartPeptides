"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export default async function updateCartItemQuantity(productInfo: {
  key: string;
  quantity: number;
}) {
  const res = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/update-cart-item-quantity/?key=${productInfo.key}&quantity=${productInfo.quantity}`,
    method: "PUT",
    apiType: "user",
  });

  try {
    const data = await res.json();

    return {
      success: data,
    };
  } catch (e: any) {
    return {
      errors: e.message,
    };
  }
}
