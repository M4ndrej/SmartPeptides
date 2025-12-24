"use server";

import { cartFetcher } from "@/helpers/server_fetchers";
import { cookies, headers } from "next/headers";

export default async function logoutUser() {
  const cook = cookies();
  const headersList = headers();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const xForwardedIpAddress =
    process.env.NODE_ENV === "development"
      ? "109.245.191.239"
      : headersList.get("X-Forwarded-For"); // if there is no ip address get my ip

  const logout = await cartFetcher({
    url: `${process.env.API_URL}/myauth/v2/user-logout`,
    method: "GET",
    apiType: "user",
    ipAddress: xForwardedIpAddress!,
  });

  if (logout.status === 200) {
    const data = await logout.json();

    // delete all cookies related to logged user
    cook.delete(`${process.env.WP_LOGGED_IN}`);
    cook.delete(`${process.env.WC_SESSION}`);
    cook.delete("woocommerce_cart_hash");
    cook.delete("woocommerce_items_in_cart");
    cook.delete("Nonce-Cart");
    cook.delete("loggedUser");
    cook.delete("validatedEmail");

    return { success: data };
  } else {
    return { error: "Unable to logout, plase try again!" };
  }
}
