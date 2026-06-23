"use client";

import { fetcher } from "@/helpers/fetchers";
import { ProductList } from "@/types/product";
import { FC } from "react";
import useSWR from "swr";
import ProductSlider from "./ProductSlider";

type BestsellerSliderProps = {
  products?: ProductList;
};

const BestsellerSlider: FC<BestsellerSliderProps> = ({ products }) => {
  const url = !products ? `/api/products/bestsellers/` : null;
  const { data, isLoading } = useSWR<ProductList>(url, fetcher);
  const prods = products || data;

  return (
    <div className="w-full">
      <div className="w-full text-center">
        <h2 className="font-D32px-M24px font-bold">Best Sellers</h2>
        <div className="mx-auto mb-[40px] mt-[16px] h-[2px] w-[48px] bg-[#333333]"></div>
      </div>
      <div className="relative m-auto flex max-w-[1264px] sm:px-0 xl:px-[16px]">
        <ProductSlider
          products={prods}
          isLoading={isLoading}
          loadingNumber={12}
          dotsType="progress"
        />
      </div>
    </div>
  );
};

export default BestsellerSlider;
