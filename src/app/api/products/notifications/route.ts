import { NextResponse } from "next/server";
import { notificationIds } from "@/data/peptides_id_data";
import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts } from "@/server/services";

export async function GET() {
  const notificationParams = generateFilterParamString({
    include: notificationIds.join(","),
  });
  const products = await fetchProducts(notificationParams);
  return NextResponse.json(products);
}
