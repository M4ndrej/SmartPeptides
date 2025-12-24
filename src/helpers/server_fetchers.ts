import { cookies } from "next/headers";
import { hfetch } from "./fetchers";

type FetchMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
type FetcherProps<T> = {
  url: string;
  method: FetchMethods;
  data?: T;
  apiType: "user" | "global";
  isFormData?: boolean;
  request?: Request | null;
  ipAddress?: string;
};

export const globalFetcher = <T>({
  url,
  method,
  data,
  apiType,
  isFormData,
}: FetcherProps<T>) => {
  var myHeaders = new Headers();

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  if (woocomerceLoggedUser) {
    myHeaders.append(
      "Cookie",
      `${woocomerceLoggedUser?.name}=${woocomerceLoggedUser?.value}`
    );
  }

  const wishlistCookie = cookies().get("Wishlist");

  if (wishlistCookie) {
    const wishCookieValue = JSON.parse(wishlistCookie.value);
    const wcookies = `[${wishCookieValue.join(",")}]`;
    myHeaders.append("Cookie", `${process.env.WISHLIST_KEY}=${wcookies}`);
  }

  const cartNonceCookie = cookies().get("Nonce-Cart");

  if (cartNonceCookie) {
    myHeaders.append("nonce", cartNonceCookie.value);
  }

  var requestOptions: RequestInit = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (method == "POST" && data && !isFormData) {
    requestOptions.body = JSON.stringify(data);
    myHeaders.append("Content-Type", "application/json");
  }

  let fetchUrl = new URL(url);

  if (apiType === "global") {
    fetchUrl.searchParams.append("consumer_key", process.env.CONSUMER_KEY!);
    fetchUrl.searchParams.append(
      "consumer_secret",
      process.env.CONSUMER_SECRET!
    );
  }

  return hfetch(fetchUrl.toString(), requestOptions);
};

export const cartFetcher = <T>({
  url,
  method,
  data,
  apiType,
  ipAddress,
}: FetcherProps<T>) => {
  var myHeaders = new Headers();
  if (ipAddress) {
    const ipAddressParts = ipAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || ipAddress;
    myHeaders.set("X-Forwarded-For", realIpAddress!);
  }

  const userCookieIpAddress = cookies().get("user_ip_address");

  if (userCookieIpAddress) {
    myHeaders.append("X-Forwarded-For", userCookieIpAddress.value);
  }

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  if (woocomerceLoggedUser) {
    myHeaders.append(
      "Cookie",
      `${woocomerceLoggedUser?.name}=${woocomerceLoggedUser?.value}`
    );
  }

  const wp_woocommerce_session = cookies().get(`${process.env.WC_SESSION}`);

  if (wp_woocommerce_session) {
    myHeaders.append(
      "Cookie",
      `${wp_woocommerce_session?.name}=${wp_woocommerce_session?.value}`
    );
  }

  const woocommerce_cart_hash = cookies().get("woocommerce_cart_hash");

  const cart_saved_cart = cookies().get("saved_cart_data");
  if (cart_saved_cart) {
    myHeaders.append(
      "Cookie",
      `${cart_saved_cart?.name}=${cart_saved_cart?.value}`
    );
    cookies().delete("saved_cart_data");
  }

  if (woocommerce_cart_hash) {
    myHeaders.append(
      "Cookie",
      `${woocommerce_cart_hash?.name}=${woocommerce_cart_hash?.value}`
    );
  }

  const cartNonceCookie = cookies().get("Nonce-Cart");

  if (cartNonceCookie) {
    myHeaders.append("nonce", cartNonceCookie.value);
  }

  const wpam_id = cookies().get("wpam_id");
  if (wpam_id) {
    myHeaders.append("Cookie", `${wpam_id?.name}=${wpam_id?.value}`);
  }

  var requestOptions: RequestInit = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (method == "POST" && data) {
    requestOptions.body = JSON.stringify(data);
    myHeaders.append("Content-Type", "application/json");
  }

  let fetchUrl = new URL(url);

  if (apiType === "global") {
    fetchUrl.searchParams.append("consumer_key", process.env.CONSUMER_KEY!);
    fetchUrl.searchParams.append(
      "consumer_secret",
      process.env.CONSUMER_SECRET!
    );
  }

  return hfetch(fetchUrl.toString(), requestOptions, true);
};
