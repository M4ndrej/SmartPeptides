import { fetchAffiliateSalesSummary } from "@/server/affiliateServices";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetchAffiliateSalesSummary();

  if (!data) return NextResponse.error();
  return NextResponse.json(data);
}
