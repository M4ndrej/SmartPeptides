"use server";

import { generateFilterParamString } from "@/helpers/shop_filters";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { ProductNew } from "@/types/product";

export interface ProductNavigation {
  previousProduct?: ProductNew;
  nextProduct?: ProductNew;
}

export async function fetchProductNavigation(
  currentProductId: number
): Promise<ProductNavigation> {
  try {
    const specProdUser = await isSpecificProductsUser();

    const paramObject: any = {
      category: "peptides,blends,cosmetic,supplies",
    };

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
    const allProducts = await fetchProducts(paramString);

    if (!allProducts || allProducts.length === 0) {
      return { previousProduct: undefined, nextProduct: undefined };
    }

    // Find current product index in the array
    const currentProductIndex = allProducts.findIndex(
      (item) => item.id == currentProductId
    );

    if (currentProductIndex === -1) {
      // Current product not found in the list
      return { previousProduct: undefined, nextProduct: undefined };
    }

    let previousProduct: ProductNew | undefined;
    let nextProduct: ProductNew | undefined;

    if (currentProductIndex > 0) {
      previousProduct = allProducts[currentProductIndex - 1];
    } else {
      previousProduct = allProducts[allProducts.length - 1];
    }

    if (currentProductIndex < allProducts.length - 1) {
      nextProduct = allProducts[currentProductIndex + 1];
    } else {
      nextProduct = allProducts[0];
    }

    return { previousProduct, nextProduct };
  } catch (error) {
    console.error("Error fetching product navigation:", error);
    return { previousProduct: undefined, nextProduct: undefined };
  }
}
