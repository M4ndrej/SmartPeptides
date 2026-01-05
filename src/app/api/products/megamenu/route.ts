import { NextResponse } from "next/server";
import {
  menuBlendIds,
  menuCosmeticIds,
  menuPeptideIds,
  menuSuppliesIds,
} from "@/data/peptides_id_data";
import { fetchProducts, isSpecificProductsUser } from "@/server/services";
import { generateFilterParamString } from "@/helpers/shop_filters";
import { MegaMenuProductList } from "@/types/product";

export async function GET() {
  const specProdUser = await isSpecificProductsUser();

  const peptideIdsToUse = specProdUser?.is_tirz_user
    ? menuPeptideIds
    : menuPeptideIds.map((id) => (id == 56914 ? 58351 : id));
  const peptideParams = generateFilterParamString({
    include: peptideIdsToUse.join(","),
  });

  const supplyIdsToUse = specProdUser?.is_tirz_user
    ? menuSuppliesIds
    : menuSuppliesIds.map((id) => (id == 11557 ? 111781 : id));
  const supplyParams = generateFilterParamString({
    include: supplyIdsToUse.join(","),
  });

  const blendParams = generateFilterParamString({
    include: menuBlendIds.join(","),
    category: 'blends'
  });
  const cosmeticParams = generateFilterParamString({
    include: menuCosmeticIds.join(","),
    category: 'cosmetic'
  });

  const [peptides, supplies, blends, cosmetics] = await Promise.all([
    fetchProducts(peptideParams),
    fetchProducts(supplyParams),
    fetchProducts(blendParams),
    fetchProducts(cosmeticParams),
  ]);

  return NextResponse.json({
    peptides,
    supplies,
    blends,
    cosmetics,
  } as MegaMenuProductList);
}
