"use client";

import { Dispatch, FC, SetStateAction } from "react";
import useSWR from "swr";
import { Tag, TagsList } from "@/types/tags";
import { ProductNew } from "@/types/product";
import { fetcher } from "@/helpers/fetchers";

import { useProductFilters } from "../../hooks/useProductFilters";
import ActiveFiltersBar from "./ActiveFiltersBar";
import FiltersList from "./FiltersList";
import FilterContent from "./FilterContent";
import InsideScroll from "../Scroll/InsideScroll";

interface ProductFilterMobileProps {
  products?: ProductNew[];
  category?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ProductFilterMobile: FC<ProductFilterMobileProps> = ({
  products,
  category = "",
  isOpen,
  setIsOpen,
}) => {
  const { data: tags } = useSWR<TagsList>(
    `/api/tags/?category=${category}`,
    fetcher
  );

  const filterLogic = useProductFilters({ products, category });

  // Mobile-specific tag handling
  const handleTags = async (tag: Tag, index: number) => {
    const isTagActive = tag.active;
    tags![index].active = !isTagActive;

    const tagsActive = tags!.filter((tg) => tg.active);

    if (!tagsActive.length) {
      filterLogic.setAllTagsActive(true);
    } else {
      filterLogic.setAllTagsActive(false);
    }

    const fieldObj = {
      ...filterLogic.activeFilters.tags,
      value: tagsActive.map((item) => item.name),
    };

    filterLogic.setActiveFilters((prevState) => ({
      ...prevState,
      tags: fieldObj,
    }));

    filterLogic.handlePageChange(
      "tags",
      tagsActive.map((item) => item.name).join("|"),
      tagsActive.length
    );
  };

  // Enhanced remove filter for mobile with tag support
  const handleRemoveFilterMobile = (filterName: string, filter: string) => {
    if (filterName === "tags") {
      let activeCount = 0;
      tags?.map((tag) => {
        if (filter === tag.name) tag.active = false;
        if (tag.active) activeCount++;
        return tag;
      });
      filterLogic.setAllTagsActive(activeCount === 0);
    }

    filterLogic.handleRemoveFilter(filterName, filter);
  };

  // Enhanced remove all filters for mobile
  const handleRemoveAllFiltersMobile = () => {
    filterLogic.setAllTagsActive(true);
    tags?.map((tag) => {
      tag.active = false;
      return tag;
    });

    filterLogic.handleRemoveAllFilters();
  };

  return (
    <div className="w-[345px] max-w-[100dvw] sm:w-full sm:px-2">
      <InsideScroll className="h-[100dvh] w-full">
        <FiltersList
          openedFilter={filterLogic.openedFilter}
          activeFilters={filterLogic.activeFilters}
          onFilterToggle={filterLogic.handleOpenedFilter}
          onFilterChange={filterLogic.handleFilterCheckbox}
          layout="vertical"
          isMobile={true}
          productsCount={products?.length}
        >
          <FilterContent
            openedFilter={filterLogic.openedFilter}
            activeFilters={filterLogic.activeFilters}
            range={filterLogic.range}
            minPrice={filterLogic.minPrice}
            maxPrice={filterLogic.maxPrice}
            height={filterLogic.height}
            tags={tags}
            allTagsActive={filterLogic.allTagsActive}
            onFilterChange={filterLogic.handleFilterCheckbox}
            onRangeChange={filterLogic.handleRangeChange}
            onFinalRangeChange={filterLogic.rangeChange}
            onTagChange={handleTags}
            isMobile={true}
          />
        </FiltersList>

        <ActiveFiltersBar
          activeFilters={filterLogic.activeFilters}
          filterActive={filterLogic.filterActive}
          hoverRemoveFilter={filterLogic.hoverRemoveFilter}
          onRemoveFilter={handleRemoveFilterMobile}
          onRemoveAll={handleRemoveAllFiltersMobile}
          onHoverRemoveFilter={filterLogic.handleHoverRemoveFilter}
          isMobile={true}
          isOpen={isOpen}
          isMobileDevice={filterLogic.isMobileDevice}
        />
      </InsideScroll>
    </div>
  );
};

export default ProductFilterMobile;
