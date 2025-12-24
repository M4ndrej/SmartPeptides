import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = new URL(`${process.env.API_URL}/wp/v2/posts?per_page=50`);

  const blogs = await hfetch(url);
  const res = await blogs.json();

  return NextResponse.json(res);
}
