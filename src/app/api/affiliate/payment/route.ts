import { globalFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET() {
  const product = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_payments`,
    method: "GET",
    apiType: "global",
  });

  const prod = await product.json();

  return NextResponse.json(prod);
}
