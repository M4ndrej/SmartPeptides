import { ProductNew } from "@/types/product";

export const renderLabel = (product: ProductNew) => {
  if (product.on_sale) return "onsale";
  if (product.total_sales >= 500) return "bestseller";
  if (product.featured) return "featured";

  const productDate = new Date(product.date_created);
  const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  if (productDate >= twoMonthsAgo) return "new";
  return "";
};

export function getComProductSlug<T extends { slug: string }>(
  product?: T,
  withPrelink = true
) {
  const modSlug = product?.slug?.replace("-com", "") ?? "";
  return withPrelink ? `product/${modSlug}` : modSlug;
}
