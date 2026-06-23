import { TrackingFullDetails } from "@/types/tracking";
import { FC } from "react";
import MyOrder from "../MyOrder/MyOrder";
import { orderColumns } from "@/data/profile_data";
import { Order } from "@/types/orders";
import TrackingShipmentInformation from "./TrackingShipmentInformation";
import TrackingShipmentCheckpoints from "./TrackingShipmentCheckpoints";

interface TrackingShipmentProps {
  tracking: TrackingFullDetails;
  order: Order;
  withTitle?: boolean;
}

const TrackingShipment: FC<TrackingShipmentProps> = ({
  tracking,
  order,
  withTitle = true,
}) => {
  return (
    <div className="w-full">
      {withTitle && (
        <>
          <h1 className="font-D32px-M24px pb-[16px] text-center font-bold">
            Shipment Tracking
          </h1>
          <div className="mx-auto mb-[24px] h-[2px] w-[48px] bg-[#333333]" />
        </>
      )}

      <TrackingShipmentInformation tracking={tracking} />
      {tracking?.checkpoints?.length && (
        <TrackingShipmentCheckpoints checkpoints={tracking.checkpoints} />
      )}

      {order && (
        <div className="mt-8">
          <MyOrder
            orderColumns={orderColumns}
            order={order}
            autoOpen={true}
            cart={undefined}
          />
        </div>
      )}
    </div>
  );
};

export default TrackingShipment;
