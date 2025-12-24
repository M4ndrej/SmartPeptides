import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  const params = generateFilterParamString({
    search: searchTerm ?? "",
    per_page: 10,
    category: "peptides,peptide-supplies,cosmetic-peptides,peptide-blends",
  });

  let products = await fetchProducts(params);

  const specProdUser = await isSpecificProductsUser();
  if (!specProdUser?.is_tirz_user) {
    products = products.filter((p) => p.id !== 56914);
  }
  if (!specProdUser?.is_syringe_user) {
    products = products.filter((p) => p.id !== 11557);
  }

  return NextResponse.json(products);
}
