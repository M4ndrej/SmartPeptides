import { globalFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order_number = searchParams.get("order_number");

  const result = await globalFetcher({
    url: `${process.env.API_URL}/wc/v3/orders/${order_number}`,
    method: "GET",
    apiType: "global",
  });

  const res = await result.json();

  return NextResponse.json(res);
}
