"use client";
import { formatCurrency } from "@/helpers/curency_format";
import { parseMethodTitle } from "@/helpers/parseMethodTitle";
import { Order } from "@/types/orders";
import { FC, useMemo } from "react";

interface Info {
  orderDetails: Order | undefined;
}

const OrderDetails: FC<Info> = ({ orderDetails }) => {
  const orderItemsPrice = useMemo(() => {
    return orderDetails?.line_items?.reduce((curr, next) => {
      return curr + +next.total;
    }, 0);
  }, [orderDetails]);
  const methodTitle = orderDetails?.shipping_lines[0]?.method_title || "";
  const { shippingMethod, freeShippingNote } = parseMethodTitle(methodTitle);

  const separateNameAndVariation = (input: string): string => {
    const regex = /(.+?)\s([\d]+[a-zA-Z]+)/;
    const match = input.match(regex);
    if (match) {
      const variation = match[2].trim();
      return variation;
    }

    return "";
  };

  return (
    <div className="mt-8 xl:max-w-[952px]">
      <div className="font-24px-ALL text-center font-bold">Order details</div>
      <img
        id="1000456481_cpa_testing"
        src={`https://ads.trafficjunky.net/ct?a=1000456481&member_id=1006253911&cb=${orderDetails?.number}&cti=${orderDetails?.order_key}&ctv=${orderDetails?.total}&ctd=${orderDetails?.number}`}
        width="1"
        height="1"
      />
      <div className="font-D16px-M13px mt-[24px] overflow-hidden rounded-[5px] border border-borderColor">
        <div className="block sm:hidden">
          <div className="grid gap-[16px] bg-white p-[16px] font-bold sm:gap-0 sm:p-0 md:grid-cols-5 from834:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
            <div className="flex flex-col items-start text-left">
              <div className="w-1/2 text-left">QTY</div>
            </div>
            <div className="text-center">NAME</div>
            <div className="text-center">WEIGHT</div>
            <div className="text-center">RATE</div>
            <div className="text-right">PRICE</div>
          </div>
        </div>
        {orderDetails?.line_items?.map((orderItem) => (
          <div
            key={orderItem.id}
            className="border-b border-borderColor bg-lightgray px-[16px] sm:px-0"
          >
            <div className="grid gap-[16px] border-b border-borderColor py-[16px] last:border-b-0 sm:gap-0 sm:p-[0px] md:grid-cols-5 from834:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
              <div className="hidden justify-between sm:flex">
                <div className="w-[106px] border-r border-borderColor bg-white pb-[16px] pl-[16px] pt-[16px] font-bold">
                  QTY
                </div>
                <div className="pb-[16px] pr-[16px] pt-[16px]">
                  {orderItem.quantity}
                </div>
              </div>
              <div className="hidden justify-between sm:flex">
                <div className="w-[106px] border-r border-borderColor bg-white pb-[16px] pl-[16px] font-bold">
                  NAME
                </div>
                <div className=" overflow-hidden text-ellipsis whitespace-nowrap pb-[16px] pr-[16px]">
                  {orderItem.name}
                </div>
              </div>
              <div className="hidden justify-between sm:flex">
                <div className="w-[106px] border-r border-borderColor bg-white pb-[16px] pl-[16px] font-bold">
                  WEIGHT
                </div>
                <div className="pr-[16px]">
                  {orderItem.meta_data?.[0]?.value ? (
                    <>{orderItem.meta_data[0].value.replace(/-/g, ".")}</>
                  ) : (
                    <div className="pb-[16px] pr-[16px] sm:pr-0">
                      {separateNameAndVariation(orderItem.name) || ""}
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden justify-between sm:flex">
                <div className="w-[106px] border-r border-borderColor bg-white pb-[16px] pl-[16px] font-bold">
                  RATE
                </div>
                <div className="pb-[16px] pr-[16px]">
                  {formatCurrency(
                    +orderItem.price!,
                    true,
                    (formatCurrency(+orderItem.price!, true, false)
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
                </div>
              </div>
              <div className="hidden justify-between sm:flex">
                <div className="w-[106px] border-r border-borderColor bg-white pb-[16px] pl-[16px] font-bold">
                  PRICE
                </div>
                <div className="pb-[16px] pr-[16px] text-darkgray">
                  {formatCurrency(
                    +orderItem.total!,
                    true,
                    (formatCurrency(+orderItem.total!, true, false)
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
                </div>
              </div>
              <div className="sm:hidden">
                <div className="text-center md:w-1/4 lg:w-1/5">
                  {orderItem.quantity}
                </div>
              </div>
              <div className="block text-center sm:hidden">
                <div className=" overflow-hidden text-ellipsis whitespace-nowrap">
                  {orderItem.name}
                </div>
              </div>
              <div className="block text-center sm:hidden">
                <div>
                  {orderItem.meta_data?.[0]?.value ? (
                    <>{orderItem.meta_data[0].value.replace(/-/g, ".")}</>
                  ) : (
                    <div>{separateNameAndVariation(orderItem.name) || ""}</div>
                  )}
                </div>
              </div>
              <div className="block text-center sm:hidden">
                {formatCurrency(
                  +orderItem.price!,
                  true,
                  (formatCurrency(+orderItem.price!, true, false)
                    .toString()
                    .split(".")[1] || "") == "00"
                )}
              </div>
              <div className=" block text-right text-darkgray  sm:hidden">
                {formatCurrency(
                  +orderItem.total!,
                  true,
                  (formatCurrency(+orderItem.total!, true, false)
                    .toString()
                    .split(".")[1] || "") == "00"
                )}
              </div>
            </div>
          </div>
        ))}
        <div>
          <div className="flex px-[16px] pb-[8px] pt-[16px]">
            <div className="flex-1">Subtotal:</div>
            <div className=" text-darkgray ">
              {formatCurrency(
                +(
                  +orderDetails?.total! -
                  +orderDetails?.shipping_lines[0].total!
                ),
                true,
                (formatCurrency(
                  +(
                    +orderDetails?.total! -
                    +orderDetails?.shipping_lines[0].total!
                  ),
                  true,
                  false
                )
                  .toString()
                  .split(".")[1] || "") == "00"
              )}
            </div>
          </div>
          <div className="flex px-[16px] py-[8px]">
            <div className="flex-1">Shipping:</div>
            <div className="flex flex-col gap-[2px] sm:flex-col sm:text-right">
              <span>{shippingMethod}:</span>
              <div>
                {freeShippingNote && (
                  <span className="flex justify-end">{freeShippingNote}</span>
                )}{" "}
                <span className=" flex justify-end text-darkgray ">
                  {formatCurrency(
                    +orderDetails?.shipping_lines[0].total!,
                    true,
                    (formatCurrency(
                      +orderDetails?.shipping_lines[0].total!,
                      true,
                      false
                    )
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex px-[16px] pt-[8px]">
            <div className="flex-1">Payment method:</div>
            <div>{orderDetails?.payment_method_title}</div>
          </div>
          <div className="p-[16px]">
            <div className="h-[1px] w-full bg-borderColor"></div>
            <div className="flex pt-[16px]">
              <div className="flex-1 font-bold">Total:</div>
              <div className=" font-bold text-darkgray ">
                {formatCurrency(
                  +orderDetails?.total!,
                  true,
                  (formatCurrency(+orderDetails?.total!, true, false)
                    .toString()
                    .split(".")[1] || "") == "00"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      
      Old look for order details

      <div className="font-D16px-M13px mt-[24px] overflow-hidden rounded-[5px] border border-gray">
        {orderDetails?.line_items?.map((orderItem) => (
          <div
            key={orderItem.id}
            className="flex justify-between border-b border-gray bg-lightgray p-[24px] sm:p-[16px]"
          >
            <div>
              <div>{orderItem.name}</div>
              {orderItem.meta_data?.[0]?.display_key && (
                <div className="font-13px-ALL mt-[4px] text-gray2 ">
                  {orderItem.meta_data?.[0].display_key}:{" "}
                  {orderItem.meta_data?.[0].value}
                </div>
              )}
            </div>
            <div className="text-darkgray  ">
              {formatCurrency(
                +orderItem.total!,
                true,
                (formatCurrency(+orderItem.total!, true, false)
                  .toString()
                  .split(".")[1] || "") == "00"
              )}
            </div>
          </div>
        ))}

        <div className="px-[24px] sm:px-[16px]">
          <div className="border-b border-gray py-[24px] sm:py-[16px]">
            <div className="flex items-center justify-between">
              <div>Subtotal:</div>
              <div className="text-darkgray  ">
                {formatCurrency(
                  +orderItemsPrice!,
                  true,
                  (formatCurrency(+orderItemsPrice!, true, false)
                    .toString()
                    .split(".")[1] || "") == "00"
                )}
              </div>
            </div>
            {orderDetails?.shipping_lines?.map((shipping) => (
              <div
                key={shipping.id}
                className="my-[16px] flex items-start justify-between"
              >
                <div>Shipping:</div>
                <div
                  className={classNames({
                    "flex items-end pl-[8px] text-right": true,
                    "flex-col":
                      shipping.method_title ===
                      "UPS® Ground (3 working days) [Free Shipping]",
                  })}
                >
                  {shipping.method_title ===
                  "UPS® Ground (3 working days) [Free Shipping]"
                    ? "UPS® Ground (3 days)"
                    : shipping.method_title.replace("working", "")}

                  <span
                    className={classNames({
                      "text-darkgray  ":
                        true,
                      flex:
                        shipping.method_title ===
                        "UPS® Ground (3 working days) [Free Shipping]",
                    })}
                  >
                    <div className="text-darkgray ">
                      {shipping.method_title ===
                      "UPS® Ground (3 working days) [Free Shipping]"
                        ? "[Free Shipping]"
                        : ""}{" "}
                    </div>
                    <div>
                      :{" "}
                      {formatCurrency(
                        +shipping.total,
                        true,
                        shipping.method_title.includes("[Free Shipping]")
                      )}
                    </div>
                  </span>
                </div>
              </div>
            ))}

            {orderDetails?.fee_lines?.map((fees) => (
              <div
                key={fees.id}
                className="my-[16px] flex items-center justify-between"
              >
                <div>{fees.name}:</div>
                <div>
                  <span className="text-darkgray  ">
                    {formatCurrency(+fees.total, true, false)}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <div>Payment method:</div>
              <div>{orderDetails?.payment_method_title}</div>
            </div>
          </div>

          <div className="flex items-center justify-between py-[24px] font-bold sm:py-[16px]">
            <div>TOTAL</div>
            {orderDetails && (
              <div className="text-darkgray  ">
                {formatCurrency(+orderDetails.total, true, false)}
              </div>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default OrderDetails;
