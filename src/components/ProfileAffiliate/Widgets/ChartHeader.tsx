import { formatDateSlash } from "@/helpers/date_format";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction } from "react";

interface ChartHeaderProps {
  viewBy: string;
  setViewBy?: Dispatch<SetStateAction<string>>;
  views?: string[];
  startDate: Date | null;
  endDate: Date | null;
}

const ChartHeader: FC<ChartHeaderProps> = ({
  viewBy,
  setViewBy,
  views,
  startDate,
  endDate,
}) => {
  return (
    <div className="mb-2 flex items-center justify-between gap-2 gap-y-0 rounded-t-[5px] bg-lightgray sm:flex-col-reverse sm:items-start">
      <ul className="flex items-center justify-start">
        {views &&
          views.map((view) => (
            <li key={view}>
              <button
                type="button"
                onClick={() => setViewBy?.(view)}
                className={classNames(
                  "font-D16px-M13px p-3 text-gray2 transition duration-300 hover:text-[#E7461E]",
                  viewBy === view && "font-bold !text-[#E7461E]"
                )}
              >
                {view}
              </button>
            </li>
          ))}
      </ul>
      <div className="font-D16px-M13px p-3 font-semibold text-black">
        {startDate && endDate
          ? `${formatDateSlash(startDate.toISOString())} to ${formatDateSlash(endDate.toISOString())}`
          : "All time"}
      </div>
    </div>
  );
};

export default ChartHeader;
