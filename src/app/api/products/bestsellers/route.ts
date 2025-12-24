import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET() {
  const params = generateFilterParamString({
    category: "peptides",
    orderby: "total-sales",
    per_page: 13,
  });

  let products = await fetchProducts(params);

  const specProdUser = await isSpecificProductsUser();
  if (!specProdUser?.is_tirz_user) {
    products = products.filter((p) => p.id !== 56914);
  }
  products = products.slice(0, 12);
  return NextResponse.json(products);
}
