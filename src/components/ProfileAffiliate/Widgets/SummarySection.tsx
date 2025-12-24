import { formatDateSlash } from "@/helpers/date_format";
import { AffiliateSummaryEntry } from "@/types/affiliates";
import classNames from "classnames";
import { FC } from "react";

interface SummarySectionProps {
  title: string;
  data: AffiliateSummaryEntry[];
  isLoading?: boolean;
  fromDate?: string;
  toDate?: string;
}

const SummarySection: FC<SummarySectionProps> = ({
  title,
  fromDate,
  toDate,
  data,
  isLoading,
}) => {
  return (
    <div className="mb-2">
      <div className="font-D16px-M16px flex justify-between border-b border-borderColor pb-2 font-bold">
        <span>{title}</span>
        {fromDate && (
          <div>
            <span>{formatDateSlash(fromDate)}</span>
            <span> - </span>
            <span>{formatDateSlash(toDate ?? new Date().toISOString())}</span>
          </div>
        )}
      </div>
      <div className="font-D16px-M13px flex flex-col gap-[16px] rounded-b-[5px] py-[16px]">
        {data.map((entry, i) => (
          <div
            key={i}
            className={classNames(
              "flex items-center justify-between",
              entry?.isBold && "font-bold"
            )}
          >
            <div className="flex-1">{entry.name}</div>
            <div className="flex-1 text-end">
              {isLoading ? "--" : entry?.value ?? ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;
