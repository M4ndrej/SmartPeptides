"use client";

import { fetcher } from "@/helpers/fetchers";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { Order } from "@/types/orders";
import { TrackingFullDetails } from "@/types/tracking";
import { Dispatch, FC, SetStateAction } from "react";
import useSWR from "swr";
import CustomModal from "../CustomModal/CustomModal";
import InsideScroll from "../Scroll/InsideScroll";
import Spinner from "../SvgComponents/Spinner";
import TrackingShipment from "./TrackingShipment";

interface TrackingShipmentModalProps {
  order: Order;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TrackingShipmentModal: FC<TrackingShipmentModalProps> = ({
  order,
  isOpen,
  setIsOpen,
}) => {
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const { data: trackingInfo, isLoading } = useSWR<TrackingFullDetails>(
    `/api/tracking?order_id=${order.id}&email=${order.billing.email}`,
    fetcher
  );

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      modalType="TrackingShipmentModal"
    >
      <InsideScroll className="h-[calc(100vh-300px)] max-w-[1200px] sm:w-[calc(100vw-20px)] md:w-[calc(100vw-20px)] lg:w-[calc(100vw-20px)]">
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner widthHeight="h-8 w-8" />
          </div>
        )}
        {trackingInfo && (
          <div className="p-6">
            <TrackingShipment
              tracking={trackingInfo}
              order={order}
              withTitle={false}
            />
          </div>
        )}
      </InsideScroll>
    </CustomModal>
  );
};

export default TrackingShipmentModal;
