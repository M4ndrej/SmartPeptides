"use client";

import { FC, useState } from "react";
import { Order } from "@/types/orders";
import { getOrderStatus } from "@/helpers/order_statuses";
import { formatDate } from "@/helpers/date_format";
import TrackingOrder from "./TrackingOrder";
import TrackingDelivery from "./TrackingDelivery";
import TrackingForm from "./TrackingForm";

const Tracking: FC = () => {
  const [order, setOrder] = useState<Order | undefined>();

  return (
    <div className="container-margin-bottom-D96px-M64px container-padding-inline mx-[auto] mt-[48px] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <h1 className="font-D32px-M24px pb-[16px] text-center font-bold">
        Order Tracking
      </h1>

      <div className="mx-auto mb-[24px] h-[2px] w-[48px] bg-[#9A9A9F]" />

      {order ? (
        <div className="mx-auto max-w-[794px]">
          <div className="font-16px-ALL mb-[32px] text-center">
            Order{" "}
            <span className="bg-yellow2 font-bold text-darkgray">
              #{order.id}
            </span>{" "}
            was placed on{" "}
            <span className="bg-yellow2 font-bold text-darkgray">
              {formatDate(order.date_created)}
            </span>{" "}
            and it’s currently{" "}
            <span className="bg-yellow2 font-bold text-darkgray">
              {getOrderStatus(order.status)}
            </span>
            .
          </div>
          <div className="font-24px-ALL mb-[24px] text-center font-bold">
            Order details
          </div>
          <TrackingOrder order={order} />
          <TrackingDelivery order={order} />
        </div>
      ) : (
        <TrackingForm setOrder={setOrder} />
      )}
    </div>
  );
};

export default Tracking;
