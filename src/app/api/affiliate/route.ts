import { fetchAffiliateData } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchAffiliateData();
  return NextResponse.json(data ?? {});
}
