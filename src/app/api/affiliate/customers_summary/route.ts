import { fetchAffiliateCustomersSummary } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchAffiliateCustomersSummary();

  if (!data) return NextResponse.error();
  return NextResponse.json(data);
}
