"use client";

import { useThemeContext } from "@/context/theme-provider";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import useIsClientRender from "@/hooks/useIsClientRender";
import { Order } from "@/types/orders";
import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { BacsInfo } from "../BacsInfo/BacsInfo";
import Button from "../Button/Button";
import Spinner from "../SvgComponents/Spinner";
import CashAppNotice from "./CashAppNotice";
import Cryptocurrency from "./Cryptocurrency";
import OrderDetails from "./OrderDetails";
import PayPalNotice from "./PayPalNotice";
import RevolutNotice from "./RevolutNotice";
import VenmoNotice from "./VenmoNotice";
import ZelleOrderPreview from "./ZelleOrderPreview";

type OrderPreviewPageProps = {
  orderNumber?: string;
};

const OrderPreviewPage: FC<OrderPreviewPageProps> = ({ orderNumber }) => {
  const isClientRender = useIsClientRender();
  const [isPainted, setIsPainted] = useState(false);

  const {
    state: { orderPreviewId },
  } = useThemeContext();

  const { data: orderDetails, isLoading } = useSWR<Order>(
    `/api/orders/?order_number=${orderPreviewId || orderNumber}`,
    fetcher
  );

  useEffect(() => {
    if (!isClientRender || isPainted || !orderDetails) return;

    const total = formatCurrency(+orderDetails.total!, true, false);

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "purchase",
      transaction_id: orderDetails.number,
      value: total,
      currency: "USD",
      event_id: orderDetails.number,
    });

    setIsPainted(true);
  }, [isClientRender, orderDetails, isPainted]);

  // useEffect(() => {
  //   if (isClientRender && !isPainted && window?.fbq && orderDetails) {
  //     const isCredit = [
  //       "authnet",
  //       "quantumepay",
  //       "flexipay",
  //       "fiatsystems",
  //     ].includes(orderDetails?.payment_method);
  //     if (isCredit) {
  //       const total = formatCurrency(+orderDetails.total!, true, false);
  //       window.fbq("track", "Purchase", {
  //         content_name: orderDetails.line_items
  //           ?.map((item) => item.name)
  //           ?.join(", "),
  //         content_ids: orderDetails.line_items
  //           ?.map((item) => item.product_id)
  //           ?.join(", "),
  //         content_type: "product",
  //         value: total,
  //         currency: "USD",
  //       });
  //     }
  //     setIsPainted(true);
  //   }
  // }, [isClientRender, orderDetails, isPainted]);

  if (isLoading)
    return (
      <div className="my-20 flex justify-center">
        <Spinner widthHeight="h-8 w-8 mr-3" />
      </div>
    );

  if (!orderPreviewId && !orderNumber) {
    return (
      <div className="my-10 flex-1 text-center">
        <div className="font-D32px-M18px mb-10 text-center text-[#00CD2C]">
          There is no order to Show.
        </div>
        <Link href={"/shop"}>
          <Button highlighted text="Go to Shop"></Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container-margin-bottom-D96px-M64px container-padding-inline mx-[auto] mt-[80px] w-[100%] max-w-[1020px] sm:mt-[48px] sm:max-w-[100vw] md:max-w-[100vw]">
        <div className="font-D32px-M18px text-center text-[#00CD2C]">
          Thank you. Your order has been received.
        </div>

        <div className="my-[32px] grid grid-cols-2 items-center gap-y-[24px]  rounded-[5px] border-2 border-dashed border-[#00CD2C] p-[24px] sm:px-[16px] sm:py-[16px] md:grid-cols-4 lg:grid-cols-4">
          <div className="flex-1 border-r border-gray text-center sm:px-[8px]">
            <div className="font-D16px-M13px mb-[8px] text-gray2">
              Order Number
            </div>
            <div className="font-D16px-M13px">{orderDetails?.number}</div>
          </div>
          <div className="flex-1 border-r border-gray text-center sm:border-none  sm:px-[8px]">
            <div className="font-D16px-M13px mb-[8px] text-gray2">Date</div>
            <div className="font-D16px-M13px">
              {moment(orderDetails?.date_created).format("MMMM DD, YYYY")}
            </div>
          </div>
          <div className="flex-1 border-r border-gray text-center sm:px-[8px]">
            <div className="font-D16px-M13px mb-[8px] text-gray2">Total</div>
            <div className="font-D16px-M13px">
              {formatCurrency(+orderDetails?.total!, true, false)}
            </div>
          </div>
          <div className="flex-1 text-center sm:px-[8px]">
            <div className="font-D16px-M13px mb-[8px] text-gray2">
              Payment Method
            </div>
            <div className="font-D16px-M13px">
              {orderDetails?.payment_method_title}
            </div>
          </div>
        </div>

        {orderDetails?.payment_method == "cashapp" && (
          <CashAppNotice orderDetails={orderDetails} />
        )}

        {orderDetails?.payment_method === "venmo" && (
          <VenmoNotice orderDetails={orderDetails} />
        )}

        {orderDetails?.payment_method === "zelle" && (
          <ZelleOrderPreview orderDetails={orderDetails} />
        )}

        {orderDetails?.payment_method === "mycryptocheckout" && (
          <Cryptocurrency orderDetails={orderDetails} />
        )}

        {orderDetails?.payment_method === "bacs" && (
          <BacsInfo includeInstructions={false} />
        )}

        {orderDetails?.payment_method === "peptide-paypal" && (
          <PayPalNotice orderDetails={orderDetails} />
        )}

        {orderDetails?.payment_method === "peptide-revolut" && (
          <RevolutNotice orderDetails={orderDetails} />
        )}

        {/* Separator */}
        {orderDetails?.payment_method !== "bacs" && (
          <div className="mt-8 h-[1px] bg-borderColor xl:max-w-[952px]" />
        )}

        {!isLoading && <OrderDetails orderDetails={orderDetails} />}
      </div>
    </>
  );
};

export default OrderPreviewPage;
