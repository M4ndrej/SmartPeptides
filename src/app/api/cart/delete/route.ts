import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/v1/cart/remove-item`,
    method: "POST",
    data: body,
    apiType: "user",
  });
  const data = await res.json();

  return NextResponse.json(data);
}
