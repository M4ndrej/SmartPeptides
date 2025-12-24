import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get("amount");
  const res = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/apply_credit?amount=${amount}`,
    method: "GET",
    apiType: "user",
  });
  const data = await res.json();

  return NextResponse.json(data);
}
