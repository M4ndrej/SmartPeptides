import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientParams = request.nextUrl.searchParams;
  const paramObject = Object.fromEntries(clientParams);

  const specProdUser = await isSpecificProductsUser();
  if (!specProdUser?.is_tirz_user) {
    paramObject.exclude = paramObject?.exclude
      ? paramObject.exclude + ",56914"
      : "56914";
  }
  if (!specProdUser?.is_syringe_user) {
    paramObject.exclude = paramObject?.exclude
      ? paramObject.exclude + ",11557"
      : "11557";
  }

  const paramString = generateFilterParamString(paramObject);
  let products = await fetchProducts(paramString);
  return NextResponse.json(products);
}
