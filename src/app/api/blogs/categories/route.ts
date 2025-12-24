import { globalFetcher } from "@/helpers/server_fetchers";
import { NextResponse } from "next/server";

export async function GET() {
  const blogList = await globalFetcher({
    url: `${process.env.API_URL}/wp/v2/categories/?per_page=50`,
    method: "GET",
    apiType: "global"
  });

  const result = await blogList.json();

  return NextResponse.json(result);
}
