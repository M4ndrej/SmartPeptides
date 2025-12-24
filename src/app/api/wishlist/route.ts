import { globalFetcher } from "@/helpers/server_fetchers";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieData = cookies();

  const result = await globalFetcher({
    url: `${process.env.API_URL}/mywishlist/v2/wishlist`,
    method: "GET",
    apiType: "user",
  });

  const data = await result.json();

  if (data?.wishlist?.wishlist_list.length)
    cookieData.set("Wishlist", JSON.stringify(data?.wishlist?.wishlist_list), {
      expires: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).getTime(),
    });

  return NextResponse.json(data);
}
