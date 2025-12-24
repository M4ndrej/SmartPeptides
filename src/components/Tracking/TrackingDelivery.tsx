"use client";

import { Order } from "@/types/orders";
import { FC, useState } from "react";
import Button from "../Button/Button";
import TrackingTimeline from "./TrackingTimeline";
import TrackingShipmentModal from "./TrackingShipmentModal";
import { formatDateWeekDay } from "@/helpers/date_format";
import Link from "next/link";

type TrackingDeliveryProps = {
  order: Order;
  isModalView?: boolean;
};

const TrackingDelivery: FC<TrackingDeliveryProps> = ({
  order,
  isModalView,
}) => {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  if (!order.tracking_details) {
    return (
      <div>
        <div className="font-D16px-M13px flex flex-col gap-2 sm:gap-1">
          <div className="font-D16px-M14px font-bold">Delivery info</div>
          No shipment yet.
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="font-D16px-M13px flex flex-col gap-2 sm:gap-1">
          <div className="font-D16px-M14px font-bold">Delivery info</div>
          <div>
            Estimated delivery:{" "}
            <span className="font-bold">
              {!order.tracking_details?.eta_date ||
              order.tracking_details.status_key == "label_created"
                ? "Will be updated soon"
                : formatDateWeekDay(order.tracking_details.eta_date)}
            </span>
          </div>
        </div>

        <TrackingTimeline status={order.tracking_details.status_key} />

        <div className="flex w-full items-center justify-between gap-4 sm:flex-col sm:items-start">
          <div className="font-D16px-M13px flex flex-col gap-1">
            <div className="font-D16px-M14px font-bold">Tracking number:</div>
            {order.tracking_details?.tracking_number}
          </div>
          {isModalView ? (
            <Button
              text="TRACK PACKAGE"
              customClass="shrink-0"
              showSpiner={true}
              onPress={async () => setIsTrackingModalOpen(true)}
            />
          ) : (
            <Link
              className="shrink-0"
              href={`/shipment-tracking?order_id=${order.id}&email=${order.billing.email}`}
            >
              <Button text="TRACK PACKAGE" customClass="shrink-0" />
            </Link>
          )}
        </div>
      </div>
      {isModalView && (
        <TrackingShipmentModal
          order={order}
          isOpen={isTrackingModalOpen}
          setIsOpen={setIsTrackingModalOpen}
        />
      )}
    </>
  );
};

export default TrackingDelivery;
