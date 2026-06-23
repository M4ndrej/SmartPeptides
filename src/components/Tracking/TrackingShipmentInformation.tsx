import { formatDateSlash, formatDateWeekDay } from "@/helpers/date_format";
import { TrackingFullDetails } from "@/types/tracking";
import { FC, ReactNode } from "react";
import TrackingTimeline from "./TrackingTimeline";
import Image from "next/image";

const InformationItem: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="font-D16px-M13px flex flex-col gap-2 sm:gap-1">
      <div className="font-D16px-M14px font-bold">{title}</div>
      {children}
    </div>
  );
};

interface TrackingShipmentInformationProps {
  tracking: TrackingFullDetails;
}

const TrackingShipmentInformation: FC<TrackingShipmentInformationProps> = ({
  tracking,
}) => {
  return (
    <>
      <div className="font-D24px-M16px mb-2 font-bold">
        Tracking information
      </div>
      <div className="h-[2px] w-full bg-borderColor" />
      <div className="mb-12 mt-4 flex items-center justify-between gap-2 sm:grid sm:grid-cols-2 sm:items-start md:grid md:grid-cols-3 md:items-start">
        {tracking.carrier == "UPS" && (
          <>
            <InformationItem title="Tracking number">
              {tracking.tracking_number}
            </InformationItem>
            <InformationItem title="Service">
              {tracking.tracking_provider}
            </InformationItem>
            <InformationItem title="Weight">
              {tracking?.weight
                ? `${Math.round(tracking.weight * 1000000)}mg`
                : "N/A"}
            </InformationItem>
            <InformationItem title="Shipment category">
              {"Package"}
            </InformationItem>
            <InformationItem title="Carrier">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/upsLogo.svg"
                  alt="UPS"
                  width={20}
                  height={24}
                />
                <div>{tracking.carrier}</div>
              </div>
            </InformationItem>
            <InformationItem title="Shipped / Billed on">
              {tracking?.shipping_created_at
                ? formatDateSlash(tracking.shipping_created_at)
                : "N/A"}
            </InformationItem>
          </>
        )}
        {tracking.carrier == "USPS" && (
          <>
            <InformationItem title="Tracking number">
              {tracking.tracking_number}
            </InformationItem>
            <InformationItem title="Service">
              {tracking.tracking_provider}
            </InformationItem>
            <InformationItem title="Shipment category">
              {"Package"}
            </InformationItem>
            <InformationItem title="Carrier">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/uspsLogo.svg"
                  alt="USPS"
                  width={32}
                  height={24}
                />
                <div>{tracking.carrier}</div>
              </div>
            </InformationItem>
          </>
        )}
        {tracking.carrier == "FedEx" && (
          <>
            <InformationItem title="Tracking number">
              {tracking.tracking_number}
            </InformationItem>
            <InformationItem title="Service">
              {tracking.tracking_provider}
            </InformationItem>
            <InformationItem title="Shipment category">
              {"Package"}
            </InformationItem>
            <InformationItem title="Carrier">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/fedexLogo.svg"
                  alt="USPS"
                  width={32}
                  height={24}
                />
                <div>{tracking.carrier}</div>
              </div>
            </InformationItem>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-D16px-M14px font-bold">Estimated Delivery:</div>
        <div className="font-D32px-T24px-M18px font-bold text-[#333333]">
          {!tracking?.eta_date || tracking.status_key == "label_created"
            ? "Will be updated soon"
            : formatDateWeekDay(tracking.eta_date)}
        </div>
      </div>
      <TrackingTimeline status={tracking.status_key} className="mb-6" />
    </>
  );
};

export default TrackingShipmentInformation;
