"use client";

import { FC, useEffect, useState } from "react";
import { Filter, FilterOptions } from "@/types/filters";

interface ProductSortProps {
  filter: Filter;
  activeSort?: string;
  handleChangeSort: (filter: Filter, option: FilterOptions) => void;
}

const ProductSort: FC<ProductSortProps> = ({
  handleChangeSort,
  filter,
  activeSort,
}) => {
  const activeFilterOption = activeSort
    ? filter.options.find((option) => option.paramValue == activeSort)
    : filter.options[0];

  const [selectedItemValue, setSelectedItemValue] = useState(
    activeFilterOption?.name
  );

  const handleOrderBy = (filterOption: FilterOptions) => {
    if (selectedItemValue !== filterOption.name) {
      setSelectedItemValue(filterOption.name);
      handleChangeSort(filter, filterOption);
    }
  };

  useEffect(() => {
    const activeFilterOption = activeSort
      ? filter.options.find((option) => option.paramValue == activeSort)
      : filter.options[0];

    if (
      activeFilterOption?.name &&
      activeFilterOption.name != selectedItemValue
    ) {
      setSelectedItemValue(activeFilterOption?.name);
    }
  }, [activeSort, filter, selectedItemValue]);

  return (
    <div className="flex items-center pr-[40px] sm:pr-0">
      <div className="pr-[10px] text-gray2 transition duration-300 sm:pb-0 md:pb-0">
        {filter.name}
      </div>
      <div className="relative cursor-pointer [&_#dropdown]:hover:flex">
        <div className="group flex items-center">
          <div className="font-D16px-M14px mr-[8px] transition group-hover:text-[#E7461E]">
            {selectedItemValue}
          </div>
          <svg width="13" height="7" viewBox="0 0 13 7" fill="none">
            <path
              d="M1 1L6.5 6L12 1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-black transition duration-300 group-hover:stroke-[#E7461E]"
            />
          </svg>
        </div>

        <div
          id="dropdown"
          className="absolute right-0 top-[100%] z-10 hidden flex-col rounded-[5px] bg-white px-[14px] py-[10px] shadow-globalShadow sm:px-[10px]"
        >
          {filter.options.map((option, i) => (
            <div
              key={i}
              className="blue-color-hover font-D16px-M14px flex cursor-pointer whitespace-nowrap py-[4px]"
              onClick={() => handleOrderBy(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
