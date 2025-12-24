"use server";

import { cartFetcher } from "@/helpers/server_fetchers";

export default async function clearAllFromCart() {
  const rmfromCart = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/empty_cart`,
    method: "GET",
    apiType: "user",
  });

  try {
    const data = await rmfromCart.json();

    return {
      success: data,
    };
  } catch (e) {
    return {
      error: "Something went wrong",
    };
  }
}
