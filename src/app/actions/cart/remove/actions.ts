"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export default async function removeFromCart(productInfo: { key: string }) {
  const res = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/remove-from-cart/?key=${productInfo.key}`,
    method: "DELETE",
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
