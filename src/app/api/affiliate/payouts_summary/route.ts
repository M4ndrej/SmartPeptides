import { fetchAffiliatePayoutsSummary } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchAffiliatePayoutsSummary();

  if (!data) return NextResponse.error();
  return NextResponse.json(data);
}
