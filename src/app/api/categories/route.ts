import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  const res = await hfetch(
    `${process.env.API_URL}/wp/v2/categories/${categoryId}`
  );

  const category = await res.json();

  return NextResponse.json(category);
}
