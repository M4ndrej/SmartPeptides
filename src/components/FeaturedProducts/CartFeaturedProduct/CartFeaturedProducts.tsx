"use client";

import Spinner from "@/components/SvgComponents/Spinner";
import { fetcher } from "@/helpers/fetchers";
import { CartItemType } from "@/types/cart_types";
import { ProductNew } from "@/types/product";
import { FC, useMemo } from "react";
import useSWR from "swr";
import CartFeaturedProduct from "./CartFeaturedProduct";
import BacterioProductWrapper from "@/components/BacterioProduct/BacterioProductWrapper";
import { hasProductCategoryInCart } from "@/helpers/product_cart_helpers";

interface CartFeaturedProductsProps {
  cartItems?: CartItemType[];
  closeSidePopover?: () => void;
}

const CartFeaturedProducts: FC<CartFeaturedProductsProps> = ({
  cartItems,
  closeSidePopover,
}) => {
  const { data: featuredItems, isLoading: isSuppliersLoading } = useSWR<
    ProductNew[]
  >(`/api/products/suppliers`, fetcher);

  const hasCosmeticPeptide = useMemo(
    () => hasProductCategoryInCart("cosmetic-peptides", cartItems),
    [cartItems]
  );

  const suggestedItems = useMemo(
    () =>
      hasCosmeticPeptide
        ? featuredItems
        : featuredItems?.filter((item) => item.id !== 114195),
    [hasCosmeticPeptide, featuredItems]
  );

  console.log(suggestedItems);

  return (
    <div className="mx-auto grid grid-cols-2 justify-center gap-[16px] sm:grid-cols-1 sm:gap-[10px]">
      {isSuppliersLoading ? (
        <div className="col-span-2 flex w-full justify-center">
          <Spinner customClass="!mr-0" />
        </div>
      ) : (
        suggestedItems
          ?.filter((mainProduct) => mainProduct.id !== 114187)
          ?.map((mainProduct, index) =>
            mainProduct.id === 114191 ? (
              <BacterioProductWrapper
                naclProduct={mainProduct}
                waterProduct={
                  suggestedItems.find((item) => item.id === 114187)!
                }
                key={index}
                cartItems={cartItems || []}
                closeSidepopoverModal={closeSidePopover}
              />
            ) : (
              <CartFeaturedProduct
                mainProduct={mainProduct}
                key={index}
                cartItems={cartItems || []}
                closeSidepopoverModal={closeSidePopover}
              />
            )
          )
      )}
    </div>
  );
};

export default CartFeaturedProducts;
