import { fetchAvailablePayments } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeSend = searchParams.get("timeSend");
  const availablePayments = await fetchAvailablePayments();
  return NextResponse.json(availablePayments);
}
