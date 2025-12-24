import { globalFetcher } from "@/helpers/server_fetchers";
import { AffiliateCustomerList } from "@/types/affiliates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const res = await globalFetcher({
    url: `${process.env.API_URL}/myaffiliate/v2/get_profile_lifetime_customers?${searchParams.toString()}`,
    method: "GET",
    apiType: "global",
  });

  const data = (await res.json()) as AffiliateCustomerList;
  return NextResponse.json(data);
}
