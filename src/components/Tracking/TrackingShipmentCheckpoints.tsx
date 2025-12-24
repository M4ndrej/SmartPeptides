import { formatDateSlash, formatTimeAMPM } from "@/helpers/date_format";
import { Checkpoint } from "@/types/tracking";
import { FC } from "react";

const renderStatus = (status: string) => {
  if (status === "To be Dropped Off") return "Label Created";
  if (status === "In Transit to Customer") return "On the Way";
  return status;
};

interface TrackingShipmentCheckpointsProps {
  checkpoints: Checkpoint[];
}

const TrackingShipmentCheckpoints: FC<TrackingShipmentCheckpointsProps> = ({
  checkpoints,
}) => {
  return (
    <ul className="flex w-full max-w-[520px] list-none flex-col gap-6">
      {checkpoints.map((check, i) => (
        <li
          key={check.checkpoint_time}
          className="font-D16px-M13px flex items-start gap-20 sm:gap-10"
        >
          <div className="flex w-20 shrink-0 flex-col gap-2">
            <div>{formatDateSlash(check.checkpoint_time)}</div>
            <div>{formatTimeAMPM(check.checkpoint_time)}</div>
          </div>
          <div className="flex flex-col gap-2">
            {check?.primary_status &&
              check?.primary_status != checkpoints[i - 1]?.primary_status && (
                <div className="font-bold">
                  {renderStatus(check.primary_status)}
                </div>
              )}
            <div>
              {check.primary_status === "To be Dropped Off"
                ? "Shipper created a label"
                : check.message}
            </div>
            <div>{check?.location ?? check.country_name}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TrackingShipmentCheckpoints;
