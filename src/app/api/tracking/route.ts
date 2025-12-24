import { fetchTrackingData } from "@/server/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const orderId = queryParams.get("order_id");
  const email = queryParams.get("email");
  if (!orderId || !email) {
    return NextResponse.error();
  }
  const trackingData = await fetchTrackingData(+orderId, email);
  if (!trackingData) {
    return NextResponse.error();
  }
  return NextResponse.json(trackingData);
}
