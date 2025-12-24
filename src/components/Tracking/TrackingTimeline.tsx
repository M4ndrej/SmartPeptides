"use client";

import classNames from "classnames";
import { FC } from "react";
import CheckIcon from "../Icons/CheckIcon";
import { TrackingStatus } from "@/types/tracking";
import { trackingStatuses } from "@/data/tracking";

interface TrackingTimelineProps {
  status: TrackingStatus;
  className?: string;
}

const TrackingTimeline: FC<TrackingTimelineProps> = ({ status, className }) => {
  const activeIndex = trackingStatuses.findIndex((s) => s.key == status);
  return (
    <div
      className={classNames(
        "my-4 flex flex-col gap-2 sm:my-6 sm:h-[176px] sm:flex-row",
        className
      )}
    >
      <div className="relative h-5 w-full sm:h-full sm:w-5">
        <div className="absolute inset-0 flex items-center justify-start gap-0 sm:flex-col">
          {trackingStatuses
            .filter((s) => s.key != "label_created")
            .map((s, i) => (
              <div
                key={s.key}
                className={classNames(
                  "h-[2px] w-1/3 sm:h-1/3 sm:w-[2px]",
                  i < activeIndex ? "bg-[#E7461E]" : "bg-gray4"
                )}
              />
            ))}
        </div>
        <div className="absolute inset-0 flex h-5 items-center justify-between sm:h-full sm:w-5 sm:flex-col">
          {trackingStatuses.map((s, i) =>
            i <= activeIndex ? (
              <div
                key={s.key}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E7461E]"
              >
                <CheckIcon width={20} height={20} />
              </div>
            ) : (
              <div
                key={s.key}
                className="h-5 w-5 rounded-full border-2 border-gray4 bg-white"
              />
            )
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between sm:flex-col">
        {trackingStatuses.map((s, i) => (
          <div
            key={s.key}
            className={classNames(
              "w-1/3 text-center sm:h-auto sm:w-full sm:text-left sm:text-[13px]",
              i <= activeIndex ? "font-bold text-[#E7461E]" : "text-gray2",
              i == 0 && "!w-1/6 !text-left sm:!h-auto sm:!w-full sm:!text-left",
              i == trackingStatuses.length - 1 &&
                "!w-1/6 !text-right sm:!h-auto sm:!w-full sm:!text-left"
            )}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingTimeline;
