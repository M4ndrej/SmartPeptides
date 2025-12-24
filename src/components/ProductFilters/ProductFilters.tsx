"use client";
import { FC, useState } from "react";
import classNames from "classnames";
import Image from "next/image";

import { FILTERS } from "@/data/filter_data";
import { ProductNew } from "@/types/product";

import { useProductFilters } from "../../hooks/useProductFilters";
import ActiveFiltersBar from "./ActiveFiltersBar";
import FiltersList from "./FiltersList";
import FilterContent from "./FilterContent";
import GridModes from "../GridModes/GridModes";
import ProductSort from "../ProductSort/ProductSort";

interface FilterProps {
  products?: ProductNew[];
  category?: string;
}

const ProductFilters: FC<FilterProps> = ({ products, category = "" }) => {
  // const searchParams = useSearchParams();
  const [filterOpenedMobile, setFilterOpenedMobile] = useState(false);

  const filterLogic = useProductFilters({ products, category });

  const handleMobileFilter = (open: boolean) => {
    setFilterOpenedMobile(open);
    // Handle mobile filter state in context if needed
    filterOpenedMobile
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  return (
    <>
      <div className={`${filterOpenedMobile ? "md:hidden" : ""}`}>
        <div>
          <div
            className={`top-0 w-[100%] pb-[24px] ${
              filterOpenedMobile
                ? " fixed left-0 z-[21] h-[100vh] bg-white md:!static md:!w-[345px] "
                : ""
            }`}
          >
            <FiltersList
              openedFilter={filterLogic.openedFilter}
              activeFilters={filterLogic.activeFilters}
              onFilterToggle={filterLogic.handleOpenedFilter}
              onFilterChange={filterLogic.handleFilterCheckbox}
              layout="horizontal"
              isMobile={false}
              productsCount={products?.length}
              rightContent={
                <div
                  className={classNames({
                    "flex items-center justify-between": true,
                    "!hidden": filterOpenedMobile,
                  })}
                >
                  <ProductSort
                    handleChangeSort={filterLogic.handleFilterCheckbox}
                    filter={FILTERS[4]}
                    activeSort={filterLogic.activeFilters["orderby"].value[0]}
                  />
                  <GridModes />
                </div>
              }
            />

            <div
              className={classNames({
                "absolute right-0 top-0 hidden sm:right-[16px] sm:top-[24px] md:right-[32px] md:top-[32px]": true,
                "!block md:!hidden": filterOpenedMobile,
              })}
            >
              <Image
                className="cursor-pointer select-none"
                src="/images/popover_close.svg"
                height={16}
                width={16}
                alt="Close"
                onClick={() => handleMobileFilter(false)}
              />
            </div>

            <div className="sm:hidden md:hidden">
              <FilterContent
                openedFilter={filterLogic.openedFilter}
                activeFilters={filterLogic.activeFilters}
                range={filterLogic.range}
                minPrice={filterLogic.minPrice}
                maxPrice={filterLogic.maxPrice}
                height={filterLogic.height}
                allTagsActive={filterLogic.allTagsActive}
                onFilterChange={filterLogic.handleFilterCheckbox}
                onRangeChange={filterLogic.handleRangeChange}
                onFinalRangeChange={filterLogic.rangeChange}
                isMobile={false}
              />
            </div>

            <ActiveFiltersBar
              activeFilters={filterLogic.activeFilters}
              filterActive={filterLogic.filterActive}
              hoverRemoveFilter={filterLogic.hoverRemoveFilter}
              onRemoveFilter={filterLogic.handleRemoveFilter}
              onRemoveAll={filterLogic.handleRemoveAllFilters}
              onHoverRemoveFilter={filterLogic.handleHoverRemoveFilter}
              isMobile={false}
              isOpen={filterOpenedMobile}
              isMobileDevice={filterLogic.isMobileDevice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
