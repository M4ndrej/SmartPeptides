import React from "react";
import classNames from "classnames";
import { Filter, FilterOptions, Filters } from "@/types/filters";
import { Tag } from "@/types/tags";
import CheckboxFilter from "./CheckboxFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import TagsFilter from "./TagsFilter";

interface FilterContentProps {
  openedFilter: Filter;
  activeFilters: Filters;
  range: number[];
  minPrice: number;
  maxPrice: number;
  height: any;
  tags?: Tag[];
  allTagsActive: boolean;
  onFilterChange: (filter: Filter, option: FilterOptions) => void;
  onRangeChange: (values: number[]) => void;
  onFinalRangeChange: (values: number[]) => void;
  onTagChange?: (tag: Tag, index: number) => void;
  isMobile?: boolean;
}

const FilterContent: React.FC<FilterContentProps> = ({
  openedFilter,
  activeFilters,
  range,
  minPrice,
  maxPrice,
  height,
  tags,
  allTagsActive,
  onFilterChange,
  onRangeChange,
  onFinalRangeChange,
  onTagChange,
  isMobile = false,
}) => {
  const isOpen = openedFilter.id !== 0;

  return (
    <div
      className={classNames({
        "overflow-hidden bg-lightgray px-[16px] transition-[height,padding-top,padding-bottom] duration-150 sm:bg-white sm:px-0 md:pl-[16px] lg:mx-auto lg:w-[992px] xl:w-[100%]":
          !isMobile,
        "w-[100%] overflow-hidden px-0 transition-[height,padding-top,padding-bottom] duration-150 sm:bg-white sm:px-0":
          isMobile,
        "h-0 py-0": !isOpen,
        "h-[38px] py-[8px] sm:h-[24px] sm:py-0 md:h-[60px]":
          isOpen && openedFilter.name !== "Tags",
        "!h-[60px]": isMobile && isOpen && openedFilter.name === "Status",
        "!h-[44px] md:!h-[56px]":
          isMobile && isOpen && openedFilter.name === "Price",
        "h-auto py-[8px]": isOpen && openedFilter.name === "Tags",
        "md:!p-0": openedFilter.name === "Tags",
        "pl-0 pr-0": openedFilter.type === "buttons",
        "mt-[10px]":
          !isMobile &&
          (openedFilter.name === "Status" ||
            openedFilter.name === "Price" ||
            openedFilter.name === "Weight"),
      })}
    >
      <div
        className={classNames({
          "flex w-full items-center gap-x-[24px] sm:w-[100%] sm:flex-wrap sm:gap-y-[8px] md:flex-wrap":
            !isMobile,
          "flex w-full items-center gap-x-[24px] gap-y-[8px] sm:w-[100%] sm:flex-wrap sm:gap-y-[8px] md:flex-wrap":
            isMobile,
          "mt-[10px] !items-center overflow-hidden px-[16px] py-[10px] sm:px-[10px]":
            !isMobile && openedFilter.name === "Tags",
          "!items-center overflow-hidden px-[16px] py-[10px] sm:px-0 sm:pt-0 md:px-0 md:pt-[16px]":
            isMobile && openedFilter.name === "Tags",
          "lg:overflow-y-auto": openedFilter.type === "buttons",
        })}
      >
        {isOpen && (
          <>
            {(openedFilter.type === "radio" ||
              openedFilter.type === "checkbox") && (
              <CheckboxFilter
                options={openedFilter.options}
                activeValues={
                  activeFilters[
                    openedFilter.valueName as keyof typeof activeFilters
                  ].value
                }
                onOptionChange={(option) =>
                  onFilterChange(openedFilter, option)
                }
                filterValueName={openedFilter.valueName}
              />
            )}

            {openedFilter.type === "range" && (
              <PriceRangeFilter
                range={range}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onRangeChange={onRangeChange}
                onFinalChange={onFinalRangeChange}
                isMobile={isMobile}
              />
            )}

            {openedFilter.type === "buttons" && onTagChange && (
              <TagsFilter
                tags={tags}
                activeTags={activeFilters.tags.value}
                allTagsActive={allTagsActive}
                onTagChange={onTagChange}
                height={height}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FilterContent;
