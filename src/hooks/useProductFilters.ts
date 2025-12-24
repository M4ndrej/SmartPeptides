"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { isMobile } from "react-device-detect";

import { ThemeContext } from "@/context/theme-provider";
import { UPDATE_PRODUCT_LIST_LOADING } from "@/context/constants";
import {
  ACTIVE_FILTERS_TRUE_PARAMS,
  EMPTY_ACTIVE_FILTERS,
  FILTERS,
  INITIAL_ACTIVE_FILTERS,
} from "@/data/filter_data";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { createQueryString } from "@/helpers/query_string";
import { Filter, FilterOptions } from "@/types/filters";
import { ProductNew } from "@/types/product";

interface UseProductFiltersProps {
  products?: ProductNew[];
  category?: string;
}

export const useProductFilters = ({
  products,
  category = "",
}: UseProductFiltersProps) => {
  const { data: mPrice } = useSWR("/api/products/max_price/", fetcher);

  const appContext: any = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // State
  const [openedFilter, setOpenedFilter] = useState<Filter>({
    id: 0,
    name: "",
    options: [],
    type: "",
    valueName: "",
  });
  const [activeFilters, setActiveFilters] = useState(INITIAL_ACTIVE_FILTERS);
  const [filterActive, setFilterActive] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1);
  const [range, setRange] = useState([0, 1]);
  const [height, setHeight] = useState<any>(0);
  const [allTagsActive, setAllTagsActive] = useState(!searchParams.get("tags"));
  const [hoverRemoveFilter, setHoverRemoveFilter] = useState("");
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Initialize filters from URL params

  useEffect(() => {
    const initialFilters = JSON.parse(JSON.stringify(INITIAL_ACTIVE_FILTERS));

    if (searchParams.size > 0) {
      searchParams.forEach((value, key) => {
        const splitedValues = value.split("|");
        if (key === "price") {
          const textPriceFieldValue =
            formatCurrency(+splitedValues[0], true, true) +
            " - " +
            formatCurrency(+splitedValues[1], true, true);

          initialFilters[key as keyof typeof initialFilters].priceValue =
            textPriceFieldValue;
        }
        if (key in initialFilters) {
          initialFilters[key as keyof typeof initialFilters].value =
            splitedValues;
        }
      });
      setActiveFilters(initialFilters);
    } else {
      setActiveFilters(JSON.parse(JSON.stringify(EMPTY_ACTIVE_FILTERS)));
      setRange([0, 1]);
    }
    appContext.dispatch({ type: UPDATE_PRODUCT_LIST_LOADING, payload: false });
  }, [searchParams]);

  // Handle price range changes
  const rangeChange = (event: any) => {
    const fieldName = "price";
    const fieldTextValue =
      formatCurrency(event[0], true, true) +
      " - " +
      formatCurrency(event[1], true, true);

    const fieldObj = {
      ...activeFilters[fieldName as keyof typeof activeFilters],
      value: [event[0], event[1]],
      priceValue: fieldTextValue,
    };

    setActiveFilters((prevState) => ({
      ...prevState,
      [fieldName]: fieldObj,
    }));

    setRange(event);
    handlePageChange("price", `${event[0]}|${event[1]}`, 1);
  };

  // Handle opening/closing filters
  const handleOpenedFilter = (filter: Filter) => {
    if (filter.name === "Tags" && height === 0) {
      setHeight("auto");
    } else {
      setHeight(0);
    }

    if (filter.name !== "Tags") {
      setHeight(0);
    }

    const filterObj =
      openedFilter.id == filter.id
        ? {
            id: 0,
            name: "",
            options: [],
            type: "",
            valueName: "",
          }
        : filter;

    if (height !== 0 && filter.name === "Tags") {
      setTimeout(() => {
        setOpenedFilter(filterObj);
      }, 300);
    } else {
      setOpenedFilter(filterObj);
    }
  };

  // Handle removing individual filters
  const handleRemoveFilter = (filterName: string, filter: string) => {
    const fieldObj = {
      ...activeFilters[filterName as keyof typeof activeFilters],
      value:
        filterName === "price"
          ? []
          : activeFilters[
              filterName as keyof typeof activeFilters
            ].value.filter((item) => item !== filter),
      textValue: "",
    };

    setActiveFilters((prevState) => ({
      ...prevState,
      [filterName]: fieldObj,
    }));

    if (filterName == "price") setRange([minPrice, maxPrice]);
    if (filterName == "weight" || filterName == "status") {
      FILTERS.find((filter) => filter.valueName == filterName)?.options.map(
        (item) => {
          if (filter === item.name) item.active = false;
        }
      );
    }

    setHoverRemoveFilter("");

    if (["weight", "status", "tags", "price", "orderby"].includes(filterName)) {
      handlePageChange(
        filterName,
        fieldObj.value
          .map(
            (item) =>
              ACTIVE_FILTERS_TRUE_PARAMS[
                item as keyof typeof ACTIVE_FILTERS_TRUE_PARAMS
              ] ?? item
          )
          .join("|"),
        fieldObj.value.length
      );
    }
  };

  // Handle removing all filters
  const handleRemoveAllFilters = () => {
    setRange([minPrice, maxPrice]);
    setAllTagsActive(true);

    FILTERS.filter((flt) => flt.name == "Weight" || flt.name == "Status")?.map(
      (itm) =>
        itm.options.map((item: any) => {
          item.active = false;
        })
    );

    setActiveFilters(JSON.parse(JSON.stringify(EMPTY_ACTIVE_FILTERS)));
    setHoverRemoveFilter("");
    handlePageChange();
  };

  // Handle page navigation with filters
  const handlePageChange = (
    tagName?: string,
    paramList?: string,
    listLenght?: number
  ) => {
    appContext.dispatch({ type: UPDATE_PRODUCT_LIST_LOADING, payload: true });
    let pushParams = "";
    if (tagName) {
      pushParams = createQueryString(
        searchParams,
        tagName,
        paramList || "",
        listLenght
      );
    }

    router.push(pathname + pushParams);
  };

  // Handle hover effects for remove buttons
  const handleHoverRemoveFilter = (filterName: string, hover: boolean) => {
    const filterToHover = hover ? filterName : "";
    setHoverRemoveFilter(filterToHover);
  };

  // Handle checkbox filter changes
  const handleFilterCheckbox = (filter: Filter, option: FilterOptions) => {
    const filterName = filter.valueName;
    let newFilterValues: string[];

    if (
      activeFilters[filterName as keyof typeof activeFilters].value.includes(
        option.paramValue!
      )
    ) {
      newFilterValues = activeFilters[
        filterName as keyof typeof activeFilters
      ].value.filter((item) => item !== option.paramValue);
      const fieldObj = {
        ...activeFilters[filterName as keyof typeof activeFilters],
        value: newFilterValues,
      };

      setActiveFilters((prevState) => ({
        ...prevState,
        [filterName]: fieldObj,
      }));
    } else {
      if (filter.valueName === "orderby") {
        if (option.paramValue === "popularity") {
          activeFilters[filterName as keyof typeof activeFilters].value = [];
        } else {
          activeFilters[filterName as keyof typeof activeFilters].value = [
            option.paramValue!,
          ];
        }
      } else {
        activeFilters[filterName as keyof typeof activeFilters].value.push(
          option.paramValue!
        );
      }

      const fieldObj = {
        ...activeFilters[filter.valueName as keyof typeof activeFilters],
        value: activeFilters[filterName as keyof typeof activeFilters].value,
      };

      setActiveFilters((prevState) => ({
        ...prevState,
        [filterName]: fieldObj,
      }));
      newFilterValues =
        activeFilters[filterName as keyof typeof activeFilters].value;
    }

    handlePageChange(
      filter.valueName,
      newFilterValues.join("|"),
      newFilterValues.length
    );
  };

  // Handle range slider changes
  const handleRangeChange = (minMax: number[]) => {
    let minValue = minMax[0];
    let maxValue = minMax[1];

    if (maxValue - minValue < 50) {
      minValue = range[0];
      maxValue = range[1];
    }

    setRange([minValue, maxValue]);
  };

  // Update filter active state
  useEffect(() => {
    const showActiveFilters =
      Object.keys(activeFilters).filter(
        (key) =>
          activeFilters[key as keyof typeof activeFilters].value!.length > 0
      ).length > 0;

    setFilterActive(showActiveFilters);
  }, [activeFilters]);

  // Calculate min/max prices from products
  useEffect(() => {
    const findMinMaxPrice = () => {
      const min = products?.reduce((prev, curr) => {
        const currPrice = curr.variations?.reduce((p, c) => {
          return p < +c.price ? p : +c.price;
        }, 0);

        let cPrice = currPrice ? currPrice : curr.price;
        return prev < +cPrice ? prev : +cPrice;
      }, 0);

      const max = products?.reduce((prev, curr) => {
        const currPrice = curr.variations.reduce((p, c) => {
          return p > +c.price ? p : +c.price;
        }, 0);

        let cPrice = currPrice ? currPrice : curr.price;
        return prev > +cPrice ? prev : +cPrice;
      }, 0);

      return [min, max];
    };

    const minMax = findMinMaxPrice();
    const priceFilterActive = activeFilters.price.value;
    const { price: maximalPrice } = mPrice || { price: "100" };
    const fullMaxPrice = +maximalPrice;

    if (!minMax[1] && !priceFilterActive.length) {
      FILTERS[1].hidden = false;
      setMinPrice(0);
      setMaxPrice(1);
    } else if (priceFilterActive.length) {
      FILTERS[1].hidden = false;
      const minValueFromProducts = +minMax[0]!;
      const maxValueFromProducts =
        searchParams.size > 1 ? +minMax[1]! || 1 : fullMaxPrice;

      const minPriceFilter =
        minValueFromProducts > +priceFilterActive[0]
          ? +priceFilterActive[0]
          : minValueFromProducts;
      const maxPriceFilter =
        maxValueFromProducts > +priceFilterActive[1]
          ? maxValueFromProducts
          : +priceFilterActive[1];
      setMinPrice(minPriceFilter);
      setMaxPrice(maxPriceFilter);
      setRange([
        +activeFilters.price.value[0] < minPriceFilter
          ? minPriceFilter
          : +activeFilters.price.value[0],
        +activeFilters.price.value[1] < maxPriceFilter
          ? +activeFilters.price.value[1]
          : maxPriceFilter,
      ]);
    } else {
      FILTERS[1].hidden = false;
      setMinPrice(+minMax[0]!);
      setMaxPrice(+minMax[1]! || 1);
      setRange([+minMax[0]!, +minMax[1]! || 1]);
    }
  }, [products, mPrice]);

  // Detect mobile device
  useEffect(() => {
    if (isMobile != undefined) {
      setIsMobileDevice(isMobile);
    }
  }, []);

  // Computed values
  const hasActiveFilters = Object.keys(activeFilters).some(
    (key) => activeFilters[key as keyof typeof activeFilters].value.length > 0
  );

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key as keyof typeof activeFilters].value.length > 0
  ).length;

  return {
    // State
    openedFilter,
    activeFilters,
    filterActive,
    minPrice,
    maxPrice,
    range,
    height,
    allTagsActive,
    hoverRemoveFilter,
    isMobileDevice,

    // Setters
    setOpenedFilter,
    setActiveFilters,
    setRange,
    setHeight,
    setAllTagsActive,
    setHoverRemoveFilter,

    // Handlers
    handleOpenedFilter,
    handleRemoveFilter,
    handleRemoveAllFilters,
    handlePageChange,
    handleHoverRemoveFilter,
    handleFilterCheckbox,
    handleRangeChange,
    rangeChange,

    // Computed values
    hasActiveFilters,
    activeFilterCount,

    // External data
    products,
    category,
  };
};
