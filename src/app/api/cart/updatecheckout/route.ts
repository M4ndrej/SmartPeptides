import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const payment_method = searchParams.get("payment_method");

  const res = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/update-cart-payment-method/?payment_method=${payment_method}`,
    method: "POST",
    apiType: "user",
  });
  const data = await res.json();

  return NextResponse.json(data);
}
