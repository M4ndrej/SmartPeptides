"use server";

import { cartFetcher } from "@/helpers/server_fetchers";
import { cookies } from "next/headers";

export async function addToCart(
  products: {
    product_id: string | number;
    quantity: number;
  }[]
) {
  const cookieData = cookies();

  const result = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/add-to-cart`,
    method: "POST",
    data: {
      products: products,
    },
    apiType: "user",
  });

  const woocomerceSession = result.headers.getSetCookie();

  woocomerceSession.map((cook) => {
    const coookieSplit = cook.split(";");
    const cookieSplitValue = coookieSplit[0].split("=");
    if (
      [`${process.env.WC_SESSION}`, "woocommerce_cart_hash"].includes(
        cookieSplitValue[0]
      )
    ) {
      cookieData.set(cookieSplitValue[0], cookieSplitValue[1], {
        expires: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).getTime(),
      });
    }
  });

  const data = await result.json();
  return {
    success: data,
  };
}
