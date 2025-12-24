import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const res = await cartFetcher({
    url: `${process.env.API_URL}/mycart/v2/check-payment-email?email=${email}`,
    method: "GET",
    apiType: "user",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
