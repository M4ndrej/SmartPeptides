import { cartFetcher } from "@/helpers/server_fetchers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieData = cookies();
  const result = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/cart`,
    method: "GET",
    apiType: "user",
    request: request,
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

// Commented out because this is not used in the project
// export async function POST(request: Request) {
//   const body = await request.json();
//   const cookieData = cookies();

//   const res = await cartFetcher({
//     url: `${process.env.API_URL}/wc/store/cart/add-item`,
//     method: "POST",
//     data: body,
//     apiType: "user",
//   });

//   const data = await res.json();

//   const woocomerceSession = res.headers.getSetCookie();

//   woocomerceSession.map((cook) => {
//     const coookieSplit = cook.split(";");

//     const cookieSplitValue = coookieSplit[0].split("=");
//     if (
//       [`${process.env.WP_LOGGED_IN}`, "woocommerce_cart_hash"].includes(
//         cookieSplitValue[0]
//       )
//     ) {
//       //cookieData.set(cookieSplitValue[0], cookieSplitValue[1]);
//     }
//     cookieData.set(cookieSplitValue[0], cookieSplitValue[1], {
//       expires: new Date(
//         new Date().setFullYear(new Date().getFullYear() + 1)
//       ).getTime(),
//     });
//   });

//   return NextResponse.json(data);
// }
