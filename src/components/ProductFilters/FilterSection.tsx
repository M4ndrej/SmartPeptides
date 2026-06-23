import React from "react";
import classNames from "classnames";
import { Filter, FilterOptions, Filters } from "@/types/filters";

interface FilterSectionProps {
  filter: Filter;
  isOpen: boolean;
  activeFilters: Filters;
  onToggle: (filter: Filter) => void;
  onFilterChange: (filter: Filter, option: FilterOptions) => void;
  isMobile?: boolean;
  children?: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filter,
  isOpen,
  activeFilters,
  onToggle,
  onFilterChange,
  isMobile = false,
  children,
}) => {
  return (
    <div className="sm:w-[100%] md:w-[100%]">
      <div
        className={classNames({
          "flex cursor-pointer items-center gap-x-[8px] duration-300 hover:text-[#333333] sm:mb-0 sm:transition-[margin-bottom] [&_path]:transition [&_path]:duration-300 [&_path]:hover:stroke-[#333333]":
            true,
          "font-16px-ALL": isMobile,
          "text-[#333333] transition duration-300 sm:mb-[16px] [&_path]:stroke-[#333333] [&_svg]:rotate-180":
            isOpen,
        })}
        onClick={() => onToggle(filter)}
      >
        <div>{filter.name}</div>
        <svg
          width="13"
          height="7"
          viewBox="0 0 13 7"
          fill="none"
          className="select-none transition-[transform] duration-[150]"
        >
          <path
            d="M1 0.998047L6.5 5.99805L12 0.998047"
            stroke={isMobile ? "#333333" : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-black"
          />
        </svg>
      </div>

      {/* Mobile filter content */}
      {isMobile && (
        <div
          className={classNames({
            "pointer-events-none hidden h-0 overflow-hidden transition-[height] duration-150 sm:block md:block":
              true,
            "pointer-events-auto h-[24px] md:h-[60px]": isOpen,
            "!h-[60px]": isOpen && filter.name === "Status",
            "!h-[44px] md:!h-[56px]": isOpen && filter.name === "Price",
            "!h-auto": isOpen && filter.name === "Tags",
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
