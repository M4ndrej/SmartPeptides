import { cartFetcher } from "@/helpers/server_fetchers";
import { ICheckout } from "@/types/payment";
import { isUserLoggedIn } from "@/utils/isUserLoggedIn";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await cartFetcher({
    url: `${process.env.API_URL}/wc/store/checkout/`,
    method: "GET",
    apiType: "user",
  });

  const isUserLogged = isUserLoggedIn();

  const data: ICheckout = await result.json();
  data.isUserLoggedIn = isUserLogged;

  return NextResponse.json(data);
}
