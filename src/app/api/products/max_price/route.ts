import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts } from "@/server/services";
import { NextResponse } from "next/server";

export async function GET() {
  const params = generateFilterParamString({
    orderby: "price-desc",
    per_page: 1,
  });
  const products = await fetchProducts(params);

  const product = products[0];
  let price = product.price;

  if (product.variations.length) {
    product.variations.forEach((v) => {
      if (+v.price > +price) {
        price = v.price;
      }
    });
  }

  return NextResponse.json({ price });
}
