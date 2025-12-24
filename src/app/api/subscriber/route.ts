import { globalFetcher } from "@/helpers/server_fetchers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") ?? "";

  const result = await globalFetcher({
    url: `${process.env.API_URL}/mysubscribers/v2/get-subscriber?email=${email}`,
    method: "GET",
    apiType: "global",
  });

  const data = await result.json();

  return NextResponse.json(data);
}
