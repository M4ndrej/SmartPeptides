import React, { useMemo } from "react";
import classNames from "classnames";
import { Filter, FilterOptions, Filters } from "@/types/filters";
import { FILTERS } from "@/data/filter_data";
import FilterSection from "./FilterSection";
import InsideScroll from "../Scroll/InsideScroll";

interface FiltersListProps {
  openedFilter: Filter;
  activeFilters: Filters;
  onFilterToggle: (filter: Filter) => void;
  onFilterChange: (filter: Filter, option: FilterOptions) => void;
  layout: "horizontal" | "vertical";
  isMobile?: boolean;
  children?: React.ReactNode;
  productsCount?: number;
  rightContent?: React.ReactNode;
}

const FiltersList: React.FC<FiltersListProps> = ({
  openedFilter,
  activeFilters,
  onFilterToggle,
  onFilterChange,
  layout,
  isMobile = false,
  children,
  productsCount,
  rightContent,
}) => {
  const leftFilters = useMemo(
    () =>
      FILTERS.filter((item: Filter) => !item.hidden && item.show === "left"),
    []
  );

  if (layout === "vertical" && isMobile) {
    return (
      <div className="flex items-center gap-x-[24px] sm:max-h-[100%] sm:flex-col sm:items-start sm:gap-y-[16px] sm:px-[10px] sm:py-[24px] md:max-h-full md:w-[100%] md:flex-col md:items-start md:gap-y-[24px] md:px-[16px] md:py-[24px]">
        <div className="flex w-full items-center justify-between">
          <div className="font-16px-ALL min-w-fit font-bold">Filter by:</div>
        </div>

        {leftFilters.map((filter, i) => (
          <FilterSection
            key={i}
            filter={filter}
            isOpen={openedFilter.id === filter.id}
            activeFilters={activeFilters}
            onToggle={onFilterToggle}
            onFilterChange={onFilterChange}
            isMobile={isMobile}
          >
            {children}
          </FilterSection>
        ))}

        {productsCount !== undefined && (
          <div className="min-w-fit text-gray2 sm:mt-[8px]">
            {productsCount} results
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout for desktop
  return (
    <div
      className={classNames({
        "container-padding-inline flex items-center justify-between overflow-visible sm:relative sm:items-start sm:justify-end sm:pb-0 sm:pt-[24px] md:relative md:items-start md:justify-end md:pb-0 md:pt-[24px] xl:px-0": true,
      })}
    >
      <div
        className={classNames({
          "flex items-center gap-x-[24px] sm:hidden sm:h-full sm:w-[100%] sm:flex-col sm:items-start sm:gap-y-[24px] sm:pt-[8px] md:hidden md:h-[calc(100%-40px)] md:w-[100%] md:flex-col md:items-start md:gap-y-[24px] md:pb-[8px]": true,
        })}
      >
        <div className="min-w-fit font-medium">Filter by:</div>
        <InsideScroll>
          <div className="flex items-center gap-x-[24px] sm:max-h-[100%] sm:w-[calc(100vw-32px)] sm:flex-col sm:items-start sm:gap-y-[24px] md:max-h-full md:w-[100%] md:flex-col md:items-start md:gap-y-[24px]">
            {leftFilters.map((filter, i) => (
              <FilterSection
                key={i}
                filter={filter}
                isOpen={openedFilter.id === filter.id}
                activeFilters={activeFilters}
                onToggle={onFilterToggle}
                onFilterChange={onFilterChange}
                isMobile={false}
              />
            ))}
          </div>
        </InsideScroll>

        {productsCount !== undefined && (
          <div className="min-w-fit text-gray2">{productsCount} results</div>
        )}
      </div>

      {/* Right content - Sort and Grid modes */}
      {rightContent}
    </div>
  );
};

export default FiltersList;
