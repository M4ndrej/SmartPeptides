import { fetchUserOrders } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "";
  const perPage = searchParams.get("per_page") ?? "";

  const data = await fetchUserOrders(+page, +perPage);
  return NextResponse.json(data);
}
