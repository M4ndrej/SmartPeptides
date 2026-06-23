"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import classNames from "classnames";
import { timeFilters } from "@/data/time_filters";
import { determineDateOnFilter } from "@/helpers/date_time_helper";
import AnimateHeight from "react-animate-height";
import Input from "@/components/Input/Input";

interface TimeFiltersProps {
  minDate: string;
  maxDate: string;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  setPage?: Dispatch<SetStateAction<number>>;
  className?: string;
}

const TimeFilters: FC<TimeFiltersProps> = ({
  minDate,
  maxDate,
  setStartDate,
  setEndDate,
  setPage,
  className,
}) => {
  const [isCustomVisible, setIsCustomVisible] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(minDate);
  const [customEndDate, setCustomEndDate] = useState(maxDate);
  const [activeFilter, setActiveFilter] = useState<string>("");

  const changeFilter = (startDate: Date | null, endDate: Date | null) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage?.(0);
  };

  const onFilterPress = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "custom") {
      setIsCustomVisible(true);
      changeFilter(new Date(customStartDate), new Date(customEndDate));
      return;
    }
    setIsCustomVisible(false);
    const [startDate, endDate] = determineDateOnFilter(filter);
    changeFilter(startDate, endDate);
  };

  const onCustomStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || minDate;
    setCustomStartDate(value);
    if (customEndDate && value) {
      changeFilter(new Date(value), new Date(customEndDate));
    }
  };

  const onCustomEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || maxDate;
    setCustomEndDate(value);
    if (customStartDate && value) {
      changeFilter(new Date(customStartDate), new Date(value));
    }
  };

  return (
    <div className={classNames("flex flex-col gap-4", className)}>
      <div className="grid w-full grid-cols-6 items-center gap-4 sm:grid-cols-3">
        {timeFilters.map((filter, i) => (
          <button
            key={filter.value}
            id={filter.value}
            type="button"
            className={classNames(
              `inline-flex grow select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[5px] border-none
            bg-lightgray px-8 py-2 font-normal text-gray2
            !transition-all !duration-300 hover:bg-[#f0f0f0] hover:text-[#333333] sm:w-full dark:hover:bg-transparent`,
              activeFilter == filter.value &&
                "!bg-[#f0f0f0] !text-[#333333] dark:!bg-transparent"
            )}
            onClick={() => onFilterPress(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <AnimateHeight duration={300} height={isCustomVisible ? "auto" : 0}>
        <div className="grid w-full grid-cols-2 items-center gap-4 sm:grid-cols-1">
          <Input
            type="date"
            required={false}
            value={customStartDate}
            onChange={onCustomStartChange}
            max={customEndDate}
            min={minDate}
            customClass="!px-2"
          />
          <Input
            type="date"
            required={false}
            value={customEndDate}
            onChange={onCustomEndChange}
            min={customStartDate}
            max={maxDate}
            customClass="!px-2"
          />
        </div>
      </AnimateHeight>
    </div>
  );
};

export default TimeFilters;
