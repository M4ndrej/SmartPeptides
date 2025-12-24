import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET() {
  const rmfromCart = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/empty_cart`,
    method: "GET",
    apiType: "user",
  });

  const data = await rmfromCart.json();

  return NextResponse.json({ success: data });
}
