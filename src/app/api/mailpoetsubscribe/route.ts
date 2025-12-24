import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  var myHeaders = new Headers();

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await hfetch(
    `${process.env.API_URL}/myaffiliate/v2/mailpoet-subscribe?email=${body.email}`,
    requestOptions
  );
  const result = await res.json();

  return NextResponse.json(result);
}
