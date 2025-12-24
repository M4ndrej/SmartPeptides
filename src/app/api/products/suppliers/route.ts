import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET() {
  const params = generateFilterParamString({
    category: "peptide-supplies",
    orderby: "date-asc",
  });

  let products = await fetchProducts(params);

  const specProdUser = await isSpecificProductsUser();
  if (!specProdUser?.is_syringe_user) {
    products = products.filter((p) => p.id !== 11557);
  }

  return NextResponse.json(products);
}
