"use client";

import Spinner from "@/components/SvgComponents/Spinner";
import { orderColumns } from "@/data/profile_data";
import { fetcher } from "@/helpers/fetchers";
import { OrdersList } from "@/types/orders";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import MyOrder from "@/components/MyOrder/MyOrder";
import { PaginationType } from "@/types/global";
import classNames from "classnames";
import MyOrdersEmptyState from "./MyOrdersEmptyState";
import { CartMainResponse, CartResponse } from "@/types/cart_types";
import { useProfileContext } from "../ProfileContext";

interface PageProps {
  index: number;
  cart: CartMainResponse | undefined;
  handlePageData: (postCount: number, pageCount: number) => void;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}

const OrdersPage: FC<PageProps> = ({
  index,
  cart,
  handlePageData,
  setIsLoading,
}) => {
  let url = `/api/user/profile/orders?per_page=10&page=${index + 1}`;
  const { data, error, isLoading } = useSWR<{
    orders: OrdersList;
    pagination: PaginationType;
  }>(url, fetcher);

  const pagination = data ? data.pagination : { count: 0, pages: 0 };

  const totalPages = pagination.pages;
  const totalOrders = pagination.count;

  useEffect(() => {
    if (totalOrders > 0 && totalPages > 0)
      handlePageData(totalOrders, totalPages);
  }, [handlePageData, totalOrders, totalPages]);

  useEffect(() => {
    if (setIsLoading) setIsLoading(isLoading);
  }, [setIsLoading, isLoading]);

  const ordersList = useMemo(() => {
    if (!data || !data?.orders?.length) return [];
    return data.orders.filter((item) => item?.hasOwnProperty("id"));
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner widthHeight="h-8 w-8" />
      </div>
    );
  }

  if (!ordersList.length) return <MyOrdersEmptyState />;
  return ordersList.map((order, i) => (
    <MyOrder
      orderColumns={orderColumns}
      order={order}
      key={i}
      autoOpen={i == 0}
      cart={cart}
      hasReorder={true}
      showTracking={true}
    />
  ));
};

const MyOrders: FC = () => {
  const { userData } = useProfileContext();
  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageData = (postCount: number, pageCount: number) => {
    setTotalCount(postCount);
    setTotalPages(pageCount);
  };

  return (
    <div>
      <div className="font-D24px-M18px flex items-center font-bold md:text-[24px] md:leading-[29px]">
        My Orders
        <span className="ml-[5px] sm:block">
          {!isLoading ? `(${totalCount})` : ""}
        </span>
      </div>
      <div className="mt-[24px] sm:mt-[16px]">
        <div className="mb-[16px] ml-[16px] mr-[6px] flex font-bold sm:hidden">
          {!isLoading &&
            orderColumns.map((col, i) => (
              <div key={i} className={`${col.style} `}>
                {col.title}
              </div>
            ))}
        </div>
        <OrdersPage
          index={pageIndex}
          cart={cartData?.cart}
          handlePageData={handlePageData}
          setIsLoading={setIsLoading}
        />
        <div className="hidden">
          <OrdersPage
            index={pageIndex + 1}
            cart={cartData?.cart}
            handlePageData={handlePageData}
          />
        </div>
      </div>
      {!isLoading && totalPages > 1 && (
        <div className="m-auto mt-[48px] flex items-center justify-center gap-x-[12px]">
          {[...Array(totalPages)].map((e, i) => (
            <div key={i}>
              <div
                className={classNames({
                  "flex cursor-pointer items-center justify-center rounded-[5px] px-[9px] text-center":
                    true,
                  "bg-[#9A9A9F] text-white": pageIndex == i,
                  "text-gray2 hover:text-gray": pageIndex != i,
                })}
                onClick={() => setPageIndex(i)}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
