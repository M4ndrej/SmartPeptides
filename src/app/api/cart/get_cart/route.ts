import { cartFetcher } from "@/helpers/server_fetchers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieData = cookies();

  let user_ip_address = "109.245.191.239";
  if (request) {
    const ipAddress =
      process.env.NODE_ENV === "development"
        ? "109.245.191.239"
        : request?.headers.get("X-Forwarded-For");
    const ipAddressParts = ipAddress?.split(" ");
    const realIpAddress = ipAddressParts?.[1] || ipAddress;
    user_ip_address = realIpAddress!;
  }

  const result = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/get-cart`,
    method: "GET",
    apiType: "user",
    ipAddress: user_ip_address,
  });

  const woocomerceLoggedUser = cookies().get(`${process.env.WP_LOGGED_IN}`);

  const nonceHeader = result.headers.get("Nonce");
  if (nonceHeader) {
    cookieData.set("Nonce-Cart", nonceHeader, {
      expires: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).getTime(),
    });
  }

  const data = await result.json();

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

  return NextResponse.json({
    cart: data,
    loggedUser: woocomerceLoggedUser,
    request: request.headers.get("X-Forwarded-For"),
  });
}
