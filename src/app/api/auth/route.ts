import { hfetch } from "@/helpers/fetchers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wpamId = searchParams.get("wpamId");
  // const responseCookies = JSON.parse(searchParams.get("cookies")!);

  // const cookieData = cookies();
  // responseCookies?.map((cookie: string) => {
  //   const coookieSplit = cookie.split(";");

  //   const cookieSplitValue = coookieSplit[0].split("=");
  //   cookieData.set(cookieSplitValue[0], cookieSplitValue[1]);
  // });

  //https://api.valuepeptide.com//wp-json/myauth/v2/init_affiliate?wpam_id=163

  if (wpamId && wpamId !== "undefined") {
    var myHeaders = new Headers();
    if (request) {
      const ipAddress = request?.headers.get("X-Forwarded-For");
      const ipAddressParts = ipAddress?.split(" ");
      const realIpAddress = ipAddressParts?.[1] || ipAddress;
      myHeaders.append("X-Forwarded-For", realIpAddress!);
    }

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await hfetch(
      `${process.env.API_URL}/myauth/v2/init_affiliate?wpam_id=${wpamId}`,
      requestOptions
    );
    const data = await res.json();
    const woocomerceSession = res.headers.getSetCookie();
    woocomerceSession.map((cook) => {
      const coookieSplit = cook.split(";");
      const cookieSplitValue = coookieSplit[0].split("=");
      if (cookieSplitValue[0] === "wpam_id") {
        cookies().set("wpam_id", cookieSplitValue[1], {
          expires: new Date(
            new Date().setDate(new Date().getDate() + 30)
          ).getTime(),
        });
      }
    });
  }

  return NextResponse.json({ success: true });
}
