import { CartItemType } from "@/types/cart_types";
import { ProductNew } from "@/types/product";

export const filterProdByCat = (slug: string, products?: ProductNew[]) => {
  return products?.filter((p) => p.categories?.[0].slug === slug);
};

export const isAnyProductInCart = (
  products?: ProductNew[],
  cartItems?: CartItemType[]
) => {
  if (!cartItems || !products) return false;
  return products?.some(
    (item) => item.name === cartItems?.find((c) => c.name === item.name)?.name
  );
};

export const hasProductInCart = (
  cartItems: CartItemType[],
  productId: number,
  weightOrVolume?: string
) => {
  return cartItems.some(
    (item) =>
      item.product_id === productId &&
      (!weightOrVolume || item.variation?.[0]?.value === weightOrVolume)
  );
};

export const hasProductCategoryInCart = (
  categorySlug: string,
  cartItems?: CartItemType[]
) => {
  return (
    cartItems?.some((item) =>
      item.categories?.some((cat) => cat.slug === categorySlug)
    ) ?? false
  );
};
