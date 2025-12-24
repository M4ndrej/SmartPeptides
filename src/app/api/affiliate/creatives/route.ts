import { fetchAffiliateCreatives } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchAffiliateCreatives();
  return NextResponse.json(data);
}
