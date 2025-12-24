import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId");

  try {
    const res = await hfetch(`${process.env.API_URL}/wp/v2/users/${authorId}`);

    const category = await res.json();

    return NextResponse.json(category);
  } catch (e) {}
}
