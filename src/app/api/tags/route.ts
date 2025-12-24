import { fetchTags } from "@/server/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientParams = request.nextUrl.searchParams;
  const categoryList = clientParams.get("category") ?? undefined;
  const tags = await fetchTags(categoryList);
  return NextResponse.json(tags);
}
