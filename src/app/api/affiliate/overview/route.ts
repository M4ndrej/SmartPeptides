import { fetchAffiliateOverview } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = fetchAffiliateOverview();

  if (!data) return NextResponse.error();
  return NextResponse.json(data);
}
