import { cartFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { orderId, ...restBody } = body;

  const result = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/v1/cart/select-shipping-rate/?rate_id=${restBody.payment_method}`,
    method: "POST",
    data: {
      rate_id: restBody.payment_method,
    },
    apiType: "user",
  });

  const data = await result.json();

  return NextResponse.json(data);
}
