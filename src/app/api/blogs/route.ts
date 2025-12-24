import { hfetch } from "@/helpers/fetchers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageIndex = searchParams.get("page");
  const perPage = searchParams.get("per_page");

  const url = new URL(
    `${process.env.API_URL}/wp/v2/posts?page=${pageIndex}&per_page=${perPage}`
  );
  if (searchParams.get("categories")) {
    const categories = searchParams.get("categories")!;
    url.searchParams.append("categories", categories);
  }

  if (searchParams.get("search")) {
    const search = searchParams.get("search")!;
    url.searchParams.append("search", search);
  }

  if (searchParams.get("before")) {
    const before = searchParams.get("before")!;
    url.searchParams.append("before", before);
  }

  if (searchParams.get("after")) {
    const after = searchParams.get("after")!;
    url.searchParams.append("after", after);
  }

  const blogs = await hfetch(url);

  const totalCount = blogs.headers.get("x-wp-total");
  const totalPages = blogs.headers.get("x-wp-totalpages");

  const res = { blogs: [], pagination: {} };
  res.blogs = await blogs.json();
  res.pagination = { count: totalCount, pages: totalPages };

  return NextResponse.json(res);
}
