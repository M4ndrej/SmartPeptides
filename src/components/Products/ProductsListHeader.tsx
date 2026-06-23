"use client";

import { fetcher } from "@/helpers/fetchers";
import { CartResponse } from "@/types/cart_types";
import { FC, useMemo } from "react";
import useSWR from "swr";
import GiftIcon from "../Icons/GiftIcon";

interface ProductsListHeaderProps {
  category: string;
  header: string;
}

const ProductsListHeader: FC<ProductsListHeaderProps> = ({
  category,
  header,
}) => {
  const { data: cartData, isLoading: cartDataLoading } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const isGift = useMemo(() => {
    const hasGift = cartData?.cart?.items?.find((item) => !!item?.is_gift_item);
    return (
      !hasGift && category === "merch" && +(cartData?.cart?.total ?? 0) > 50000
    );
  }, [category, cartData]);

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-center gap-4">
      {isGift && <GiftIcon width={45} height={45} className="mb-6" />}
      <h1 className="font-D32px-M24px pb-[16px] text-center font-bold">
        {isGift ? "Congratulations! You have a free gift." : header}
      </h1>
      <div className="h-[2px] w-[48px] bg-[#333333]" />
      {isGift && (
        <p className="mb-4">
          Because you spent <span className="font-bold">US$500</span> you can
          claim a free gift! Choose a T-shirt and we{`'`}ll deliver it to your
          address.
        </p>
      )}
    </div>
  );
};

export default ProductsListHeader;
