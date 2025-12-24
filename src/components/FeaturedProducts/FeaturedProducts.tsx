"use client";

import { fetcher } from "@/helpers/fetchers";
import { CartItemType } from "@/types/cart_types";
import { ProductList } from "@/types/product";
import { FC, useMemo, useState } from "react";
import useSWR from "swr";
import DiscountsBanner from "../DiscountsBanner/DiscountsBanner";
import FeaturedProduct from "./FeaturedProduct";

interface featuredProductsProps {
  cartView?: boolean;
  cartItems?: CartItemType[] | undefined;
  hideBanners?: boolean;
  closeSidePopover?: any;
}
const FeaturedProducts: FC<featuredProductsProps> = ({
  cartView,
  hideBanners,
  cartItems,
  closeSidePopover,
}) => {
  const [selectedWater, setSelectedWater] = useState<"water" | "nacl">("water");

  const { data: productSupplies } = useSWR<ProductList>(
    `/api/products/suppliers`,
    fetcher
  );

  const bactwaters = useMemo(() => {
    return productSupplies
      ?.filter((item) => {
        return item.id === 114187 || item.id === 114191;
      })
      ?.sort((a) => (a.id === 114187 ? -1 : 1));
  }, [productSupplies]);

  const suggestedItems = useMemo(() => {
    return productSupplies?.filter((item) => {
      return item.id !== 114187 && item.id !== 114191;
    });
  }, [productSupplies]);

  return (
    <div className="mx-auto grid justify-center gap-[16px] sm:grid-cols-1 sm:flex-col sm:gap-[10px] md:mt-[64px] md:grid-cols-1 lg:grid lg:grid-cols-2">
      <div
        className={`waters-wraper relative h-[304px] w-full sm:h-[222px] ${
          hideBanners ? "hidden" : ""
        }`}
      >
        <div id="waters" className="waters hide-NaCl">
          {bactwaters?.map((product, index) => (
            <FeaturedProduct
              mainProduct={product}
              key={index}
              cartView={false}
              cartItems={cartItems || []}
            />
          ))}
        </div>
      </div>

      {suggestedItems?.map((product, index) => (
        <FeaturedProduct
          mainProduct={product}
          key={index}
          cartView={cartView}
          cartItems={cartItems || []}
          closeSidepopoverModal={closeSidePopover}
          selectedWater={selectedWater}
          setSelectedWater={setSelectedWater}
        />
      ))}
      <DiscountsBanner />
      {/* <MerchBanner /> */}
    </div>
  );
};

export default FeaturedProducts;
