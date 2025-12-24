"use client";

import { FC, useContext, useEffect } from "react";
import { format } from "date-fns";
import { formatCurrency } from "@/helpers/curency_format";
import { MainOrderType, Order } from "@/types/orders";
import { getOrderStatus } from "@/helpers/order_statuses";
import classNames from "classnames";
import { useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import Button from "../Button/Button";
import useSWR, { mutate } from "swr";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { CartMainResponse } from "@/types/cart_types";
import { addToCart } from "@/app/actions/cart/add/actions";
import { ProductList } from "@/types/product";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/navigation";
import AuthorizedImage from "../Image/Image";
import TrackingDelivery from "../Tracking/TrackingDelivery";
import { getComProductSlug } from "@/helpers/product_helper";
import {
  parseFreeShippingMethodTitle,
  parseShippingMethodTitle,
} from "@/helpers/parse_shipping_method_title";
import { addressFormat } from "@/helpers/my_order_address_format";

type MyOrderProps = {
  orderColumns: any;
  order: Order;
  showTracking?: boolean;
  cart: CartMainResponse | undefined;
  autoOpen?: boolean;
  hasReorder?: boolean;
};

const MyOrder: FC<MyOrderProps> = ({
  orderColumns,
  order,
  showTracking,
  cart,
  autoOpen,
  hasReorder,
}) => {
  const [height, setHeight] = useState<Height>(56);
  const [showedOrder, setShowedOrder] = useState(false);
  const appContext: any = useContext(ThemeContext);

  const viewOrder = () => {
    setHeight(height === 56 ? "auto" : 56);
    setShowedOrder(showedOrder ? false : true);
  };

  const handleReorder = async () => {
    const cartProductIds = cart?.items?.map((ci) => ci.id);

    const orderProducts = order.line_items.map((li) => ({
      product_id: li.variation_id || li.product_id,
      quantity: li.quantity,
    }));
    const productsToAdd = orderProducts.filter(
      (p) => !cartProductIds?.includes(p.product_id)
    );

    if (!productsToAdd.length) {
      return appContext.dispatch({
        type: TOGGLE_CART_MODAL,
        payload: { showCartModal: true },
      });
    }

    const addToCartResult = await addToCart(productsToAdd);

    if (addToCartResult.success) {
      await mutate("/api/cart/get_cart", {
        cart: addToCartResult.success.cart.data,
        loggedUser: "success",
      });

      appContext.dispatch({
        type: TOGGLE_CART_MODAL,
        payload: { showCartModal: true },
      });
    }
  };

  useEffect(() => {
    if (autoOpen && !showedOrder) {
      viewOrder();
    }
  }, [autoOpen]);

  const { data: products, isLoading } = useSWR<ProductList>(
    "/api/products/all",
    fetcher
  );

  const router = useRouter();

  const navigateToProductHandler = (orderItemId: number) => {
    const orderItemData = products?.filter(
      (product) => product.id === orderItemId
    );
    const orderedItem = orderItemData?.[0];
    const productLink = orderedItem ? getComProductSlug(orderedItem) : "";
    router.push(`/${productLink}`);
  };

  return (
    <AnimateHeight
      height={height}
      id="my-order"
      duration={300}
      className={`ease-[cubic-bezier(0.11, 0, 0.5, 0)] mb-[16px] rounded-[5px] border-b-[1px] border-borderColor last:mb-0 sm:min-h-[206px] `}
    >
      <div className="rounded-[5px]  border-[1px] border-borderColor">
        <div className="flex p-[16px] sm:flex-col sm:gap-y-[16px]">
          {orderColumns.map((col: any, i: any) => (
            <div key={i} className={col.style}>
              {col.id != "5" && (
                <div
                  className={`font-D16px-M13px sm:flex sm:w-[100%] sm:items-center sm:justify-between`}
                >
                  <div className="font-D16px-M13px hidden font-bold sm:block">
                    {col.title}
                  </div>
                  {(col.value as keyof MainOrderType) === "date_created" && (
                    <div>
                      {format(new Date(order.date_created), "LLL dd, yyyy")}
                    </div>
                  )}

                  {(col.value as keyof MainOrderType) === "status" && (
                    <div>{getOrderStatus(order.status)}</div>
                  )}

                  {(col.value as keyof MainOrderType) === "total" && (
                    <div>
                      {formatCurrency(+order.total, true, false)} for{" "}
                      {order.line_items.length} items
                    </div>
                  )}

                  {(col.value as keyof MainOrderType) === "number" && (
                    <div>#{order[col.value as keyof MainOrderType]}</div>
                  )}
                </div>
              )}
              {col.id == "5" && (
                <div
                  className={`sm:flex sm:w-[100%] sm:items-center sm:justify-between `}
                >
                  <div className="font-D16px-M13px hidden font-bold sm:block">
                    {col.title}
                  </div>
                  <div>
                    <div
                      className={`flex cursor-pointer  select-none items-center [&_div]:transition [&_div]:duration-200 [&_div]:hover:text-[#E7461E] [&_path]:transition [&_path]:duration-200 [&_path]:hover:stroke-[#E7461E]`}
                      onClick={() => viewOrder()}
                      aria-expanded={height !== 56}
                      aria-controls="my-order"
                    >
                      <div className="font-D16px-M13px mr-[8px] sm:leading-[16px]">
                        View
                      </div>
                      <svg
                        width="13"
                        height="7"
                        viewBox="0 0 13 7"
                        fill="none"
                        className={classNames({
                          "sm:translate-y-[2px]": true,
                          "rotate-180": showedOrder,
                        })}
                      >
                        <path
                          className="stroke-black"
                          d="M1 1L6.5 6L12 1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className={classNames({
            "mt-[8px] min-h-[100%]": true,
          })}
        >
          <div
            className={classNames({
              "flex flex-col gap-y-[16px] px-[16px] pb-[24px] sm:pb-[16px] md:pb-[16px]":
                true,
            })}
          >
            {order.line_items.map((item: any, a: any) => (
              <div key={a}>
                <div>
                  <div className="flex items-center">
                    <div className="mr-[16px] flex h-[60px] items-center justify-center bg-lightgray sm:h-[79px] sm:w-[66px]">
                      <AuthorizedImage
                        src={item.image.src}
                        width={50}
                        height={60}
                        alt="Item"
                        className="select-none sm:h-[79px] sm:w-[66px] sm:object-contain"
                      />
                    </div>
                    <div className="flex flex-1 justify-between sm:flex-col sm:text-[14px]">
                      <div className="sm:mb-[4px]">
                        <div
                          className="font-D16px-M13px mb-[4px] cursor-pointer font-bold transition duration-200 hover:text-[#E7461E]"
                          onClick={() =>
                            navigateToProductHandler(item.product_id)
                          }
                        >
                          {item.name} x {item.quantity}
                        </div>
                        <div className="text-[14px] leading-[22px] text-gray2 sm:text-[13px] sm:leading-[16px]">
                          {item.meta_data?.length
                            ? `${item.meta_data?.[0]?.display_key}: ${item.meta_data?.[0]?.display_value}`
                            : ""}
                        </div>
                      </div>

                      <div>
                        <div className="font-D16px-M13px text-[#E7461E]">
                          {formatCurrency(item.price, true, false)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {a + 1 < order.line_items.length && (
                  <div className="h-[1px] w-[100%] bg-gray"></div>
                )} */}
              </div>
            ))}
          </div>
          {showTracking && (
            <div className="px-4 pb-6 pt-0">
              <TrackingDelivery order={order} isModalView={true} />
            </div>
          )}
          <div
            className={classNames({
              "font-D16px-M13px flex flex-col gap-y-[10px] bg-lightgray px-[16px] py-[24px]":
                true,
            })}
          >
            <div className="flex items-center justify-between">
              <div className="font-bold">Subtotal:</div>
              <div className=" text-[#E7461E]">
                {formatCurrency(+order.subtotal, true, false)}
              </div>
            </div>
            <div className="flex items-center justify-between sm:items-start">
              <div className="font-bold">Shipping:</div>
              {order.shipping_lines?.[0] && (
                <div
                  className={classNames({
                    "text-right": true,
                    " text-black": true,
                    "text-black": false,
                  })}
                >
                  <span className="text-[#E7461E]">
                    {formatCurrency(
                      +order.shipping_lines?.[0].total,
                      true,
                      false
                    )}
                  </span>{" "}
                  via{" "}
                  {(order.shipping_lines[0].method_title
                    .toLowerCase()
                    .includes("free shipping")
                    ? parseFreeShippingMethodTitle
                    : parseShippingMethodTitle)(
                    order.shipping_lines[0].method_title
                  )}
                </div>
              )}
            </div>
            {/* {order?.fee_lines?.map((feeLine, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-bold">{feeLine.name}:</div>
                <div>{formatCurrency(+feeLine.total, true, false)}</div>
              </div>
            ))} */}
            {order?.coupon_lines?.map((couponLine, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="font-bold">Coupon ({couponLine.code}):</div>
                <div>{formatCurrency(+couponLine.discount, true, false)}</div>
              </div>
            ))}
            {order.payment_method_title && (
              <div className="flex items-center justify-between pb-[6px]">
                <div className="font-bold">Payment Method:</div>
                <div>{order.payment_method_title}</div>
              </div>
            )}

            <div className="h-[1px] w-[100%] bg-borderColor"></div>
            <div className="font-16px-ALL flex items-center justify-between pt-[6px]">
              <div className="font-bold">TOTAL:</div>
              <div className=" font-bold text-[#E7461E]">
                {formatCurrency(+order.total, true, false)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames({
          "pb-[24px] pt-[24px] sm:pb-[16px] md:pb-[16px]": true,
        })}
      >
        <div className="flex justify-between sm:flex-col sm:gap-y-[24px]">
          <div>
            <div className="mb-[8px]">
              <div className="font-D20px-M16px font-medium sm:text-[15px] sm:leading-[23px]">
                Billing address
              </div>
            </div>
            <div className="font-D16px-M13px flex flex-col gap-y-[8px]">
              {order?.billing?.first_name && order?.billing?.last_name && (
                <div>
                  {order?.billing?.first_name} {order?.billing?.last_name}
                </div>
              )}
              {order?.billing && (
                <div className="whitespace-pre-line">
                  {addressFormat(order?.billing)}
                </div>
              )}
              {order?.billing.email && <div>{order?.billing.email}</div>}
            </div>
          </div>
          <div>
            <div className="mb-[8px]">
              <div className="font-D20px-M16px sm:leading-[23px text-right font-medium sm:text-left sm:text-[15px]">
                Shipping address
              </div>
            </div>
            <div className="font-D16px-M13px flex flex-col gap-y-[8px] text-right sm:text-left">
              {order?.shipping?.first_name && order?.shipping?.last_name && (
                <div>
                  {order?.shipping?.first_name} {order?.shipping?.last_name}
                </div>
              )}
              {order?.shipping && (
                <div className="whitespace-pre-line">
                  {addressFormat(order?.shipping)}
                </div>
              )}
            </div>
          </div>
        </div>
        {hasReorder && (
          <div className="mx-auto mt-[32px] flex items-center justify-center sm:w-[210px]">
            <Button
              text="RE-ORDER NOW"
              onPress={handleReorder}
              highlighted
              showSpiner
              reverseColors
            />
          </div>
        )}
        <div
          className="relative mt-[16px] flex cursor-pointer select-none items-center justify-center after:pointer-events-none after:absolute after:bottom-[-25px] after:left-0 after:h-[5px] after:w-full after:bg-white after:content-[''] sm:mt-[16px] after:sm:bottom-[-21px] md:mt-[16px] after:md:bottom-[-20px] [&_div]:hover:text-[#E7461E] [&_path]:hover:stroke-[#E7461E]"
          onClick={() => viewOrder()}
        >
          <div className="font-D16px-M14px mr-[8px] text-black">Close</div>
          <svg width="13" height="6" viewBox="0 0 13 6" fill="none">
            <path
              d="M1 5.5L6.5 0.5L12 5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-black"
            />
          </svg>
        </div>
      </div>
    </AnimateHeight>
  );
};

export default MyOrder;
