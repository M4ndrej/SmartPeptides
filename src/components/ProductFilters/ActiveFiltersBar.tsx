import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import { Filters } from "@/types/filters";
import { ACTIVE_FILTERS_TRUE_VALUES } from "@/data/filter_data";
import ActiveFilterChip from "./ActiveFilterChip";

interface ActiveFiltersBarProps {
  activeFilters: Filters;
  filterActive: boolean;
  hoverRemoveFilter: string;
  onRemoveFilter: (filterName: string, value: string) => void;
  onRemoveAll: () => void;
  onHoverRemoveFilter: (filterName: string, hover: boolean) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  isMobileDevice?: boolean;
}

const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  activeFilters,
  filterActive,
  hoverRemoveFilter,
  onRemoveFilter,
  onRemoveAll,
  onHoverRemoveFilter,
  isMobile = false,
  isOpen = false,
  isMobileDevice = false,
}) => {
  const getActiveFilter = useCallback(
    (item: string) => {
      return activeFilters[item as keyof typeof activeFilters];
    },
    [activeFilters]
  );

  const activeFilterKeys = useMemo(() => {
    return Object.keys(activeFilters).filter(
      (key) => getActiveFilter(key).value.length > 0
    );
  }, [activeFilters, getActiveFilter]);

  const activeFilterCount = activeFilterKeys.length;

  return (
    <div
      className={classNames({
        "overflow-hidden bg-borderColor px-[16px] transition-all duration-150":
          true,
        "sm:hidden md:hidden lg:mx-auto lg:w-[992px] xl:w-[100%]": !isMobile,
        "pointer-events-none h-0 py-0 sm:mt-0 md:mt-0": !filterActive,
        "pointer-events-auto h-[38px] py-[8px] sm:mt-[24px] md:mt-[24px]":
          filterActive && !isMobile,
        "pointer-events-auto mx-4 py-[16px] sm:mt-[24px] md:mt-[24px]":
          filterActive && isMobile,
        "!mt-0": isOpen,
      })}
      style={{
        minHeight:
          isOpen || (isMobileDevice && filterActive)
            ? filterActive
              ? `${40 * activeFilterCount + 40}px`
              : "0px"
            : "",
      }}
    >
      <div className="flex h-[100%] items-center gap-x-[24px] sm:flex-col sm:items-start sm:gap-y-[16px] md:flex-col md:items-start md:gap-y-[16px]">
        {activeFilterKeys.map((item, i) => {
          const filter = getActiveFilter(item);

          return (
            <div
              key={i}
              className="flex items-center gap-x-[8px] text-[14px] leading-[22px]"
            >
              <div>{filter.name}:</div>

              {filter.priceValue && (
                <ActiveFilterChip
                  filterName={item}
                  filterValue={filter.priceValue!}
                  displayValue={filter.priceValue!}
                  isHovered={
                    hoverRemoveFilter === filter.priceValue ||
                    hoverRemoveFilter === "all"
                  }
                  onRemove={() => onRemoveFilter(item, filter.priceValue!)}
                  onHover={(hover) =>
                    onHoverRemoveFilter(filter.priceValue!, hover)
                  }
                />
              )}

              {!filter.priceValue &&
                filter.value.map((filterValue, indx) => (
                  <ActiveFilterChip
                    key={indx}
                    filterName={item}
                    filterValue={filterValue}
                    displayValue={
                      ACTIVE_FILTERS_TRUE_VALUES[
                        filterValue as keyof typeof ACTIVE_FILTERS_TRUE_VALUES
                      ] ?? filterValue
                    }
                    isHovered={
                      hoverRemoveFilter === filterValue ||
                      hoverRemoveFilter === "all"
                    }
                    onRemove={() => onRemoveFilter(item, filterValue)}
                    onHover={(hover) => onHoverRemoveFilter(filterValue, hover)}
                  />
                ))}
            </div>
          );
        })}

        {/* Clear all filters button */}
        <div
          className="border-1 flex cursor-pointer select-none items-center gap-x-[8px] rounded-[11px] border border-light-gray-v2 px-[8px] py-[4px] transition duration-150 hover:border-[#E7461E] [&_circle]:transition [&_circle]:duration-150 [&_circle]:hover:fill-[#E7461E] [&_div]:transition [&_div]:duration-150 [&_div]:hover:text-[#E7461E]"
          onMouseEnter={() => onHoverRemoveFilter("all", true)}
          onMouseLeave={() => onHoverRemoveFilter("all", false)}
          onClick={onRemoveAll}
        >
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
            <circle cx="6.5" cy="7" r="6.5" fill="#C7C7C7" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.50004 7.70714L8.64648 9.85359L9.35359 9.14648L7.20714 7.00004L9.35359 4.85359L8.64648 4.14648L6.50004 6.29293L4.35359 4.14648L3.64648 4.85359L5.79293 7.00004L3.64648 9.14648L4.35359 9.85359L6.50004 7.70714Z"
              fill="white"
            />
          </svg>
          <div className="text-[13px] leading-[16px] text-gray2">
            Clear filters
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFiltersBar;
