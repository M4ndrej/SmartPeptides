import { globalFetcher } from "@/helpers/server_fetchers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");

  const wishlistCookie = await globalFetcher({
    url: `${process.env.API_URL}/mywishlist/v2/add-wishlist-item/?product_id=${product_id}`,
    method: "POST",
    apiType: "user",
  });

  const d = await wishlistCookie.json();

  if (d.status) {
    const cookieData = cookies();
    const wishlistCookie = cookies().get("Wishlist");

    let cookieArray = [];
    if (wishlistCookie?.value) {
      cookieArray = JSON.parse(wishlistCookie?.value);
    }

    cookieArray.push(+product_id!);
    cookieData.set("Wishlist", JSON.stringify(cookieArray), {
      expires: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).getTime(),
    });

    return NextResponse.json({});
  }

  return NextResponse.json({}, { status: 500, statusText: "SERVER ERROR" });
}
