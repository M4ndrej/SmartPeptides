"use client";

import {
  UPDATE_MOBILE_FILTER,
  UPDATE_PRODUCT_LIST_LOADING,
} from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import {
  ACTIVE_FILTERS_TRUE_PARAMS,
  ACTIVE_FILTERS_TRUE_VALUES,
  EMPTY_ACTIVE_FILTERS,
  FILTERS,
  INITIAL_ACTIVE_FILTERS,
} from "@/data/filter_data";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { getPercentage } from "@/helpers/percentage_helper";
import { createQueryString } from "@/helpers/query_string";
import { Filter, FilterOptions } from "@/types/filters";
import { ProductNew } from "@/types/product";
import { Tag, TagsList } from "@/types/tags";
import classNames from "classnames";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { isMobile } from "react-device-detect";
import { Range } from "react-range";
import useSWR from "swr";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import InsideScroll from "../Scroll/InsideScroll";
import SidePopover from "../SidePopover/SidePopover";

interface ProductFilterSidepopoverProps {
  products?: ProductNew[];
  category?: string;
}

const ProductFilterSidepopover: FC<ProductFilterSidepopoverProps> = ({
  products,
  category = "",
}) => {
  const { data: tags } = useSWR<TagsList>(
    `/api/tags/?category=${category}`,
    fetcher
  );

  const { data: mPrice } = useSWR("/api/products/max_price", fetcher);

  const appContext: any = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();
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
  const [filterOpenedMobile, setFilterOpenedMobile] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    if (searchParams.size > 0) {
      searchParams.forEach((value, key) => {
        const splitedValues = value.split("|");
        if (key === "price") {
          const textPriceFieldValue =
            formatCurrency(+splitedValues[0], true, true) +
            " - " +
            formatCurrency(+splitedValues[1], true, true);

          INITIAL_ACTIVE_FILTERS[
            key as keyof typeof INITIAL_ACTIVE_FILTERS
          ].priceValue = textPriceFieldValue;
        }
        if (key in INITIAL_ACTIVE_FILTERS) {
          INITIAL_ACTIVE_FILTERS[
            key as keyof typeof INITIAL_ACTIVE_FILTERS
          ].value = splitedValues;
        }
      });
    } else {
      setActiveFilters(JSON.parse(JSON.stringify(EMPTY_ACTIVE_FILTERS)));
      setRange([0, 1]);
    }
    appContext.dispatch({ type: UPDATE_PRODUCT_LIST_LOADING, payload: false });
  }, [searchParams]);

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

    const newFilterValues = {
      ...activeFilters,
      [filterName]: fieldObj,
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

    if (filterName === "tags") {
      let activeCount = 0;
      tags?.map((tag) => {
        if (filter === tag.name) tag.active = false;
        if (tag.active) activeCount++;
        return tag;
      });

      setAllTagsActive(activeCount === 0);
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

  const handleRemoveAllFilters = () => {
    setRange([minPrice, maxPrice]);
    setAllTagsActive(true);

    tags?.map((tag) => {
      tag.active = false;
      return tag;
    });

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

  const handleTags = async (tag: Tag, index: number) => {
    const isTagActive = tag.active;
    tags![index].active = !isTagActive;

    // tags?.forEach((tagItem) => {
    //   if (tagItem.name !== tag.name && !allTagsActive && tag.active) {
    //     tagItem.active = !tag.active;
    //   }
    // });

    const tagsActive = tags!.filter((tg) => tg.active);

    if (!tagsActive.length) {
      setAllTagsActive(true);
    } else {
      setAllTagsActive(false);
    }

    const fieldObj = {
      ...activeFilters.tags,
      value: tagsActive.map((item) => item.name),
    };

    setActiveFilters((prevState) => ({
      ...prevState,
      tags: fieldObj,
    }));

    handlePageChange(
      "tags",
      tagsActive.map((item) => item.name).join("|"),
      tagsActive.length
    );
  };

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

  const handleHoverRemoveFilter = (filterName: string, hover: boolean) => {
    const filterToHover = hover ? filterName : "";
    setHoverRemoveFilter(filterToHover);
  };

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

  const handleMobileFilter = (open: boolean) => {
    setFilterOpenedMobile(open);
    appContext.dispatch({ type: UPDATE_MOBILE_FILTER, payload: open });
    filterOpenedMobile
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  const handleRangeChange = (minMax: number[]) => {
    let minValue = minMax[0];
    let maxValue = minMax[1];

    if (maxValue - minValue < 50) {
      minValue = range[0];
      maxValue = range[1];
    }

    setRange([minValue, maxValue]);
  };

  useEffect(() => {
    const showActiveFilters =
      Object.keys(activeFilters).filter(
        (key) =>
          activeFilters[key as keyof typeof activeFilters].value!.length > 0
      ).length > 0;

    setFilterActive(showActiveFilters);
  }, [activeFilters]);

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

      const minPrice = min;

      const maxPrice = max;

      return [minPrice, maxPrice];
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

  useEffect(() => {
    if (isMobile != undefined) {
      setIsMobileDevice(isMobile);
    }
  }, []);

  const activeFilterData = [...Array(1)].map((e, i) => (
    <div
      key={i}
      className={classNames({
        "w-[100%] overflow-hidden bg-borderColor px-[16px] transition-all duration-150":
          true,
        "pointer-events-none h-0 py-0 sm:mt-0 md:mt-0": !filterActive,
        "pointer-events-auto py-[16px] sm:mt-[24px] md:mt-[24px]": filterActive,
        "!mt-0": filterOpenedMobile,
      })}
      style={{
        minHeight:
          filterOpenedMobile || (isMobileDevice && filterActive)
            ? filterActive
              ? `${
                  40 *
                    Object.keys(activeFilters).filter(
                      (key) =>
                        activeFilters[key as keyof typeof activeFilters].value
                          .length > 0
                    ).length +
                  40
                }px`
              : "0px"
            : "",
      }}
    >
      <div className="flex h-[100%] items-center gap-x-[24px] sm:flex-col sm:items-start sm:gap-y-[16px] md:flex-col md:items-start md:gap-y-[16px]">
        {Object.keys(activeFilters)
          .filter(
            (key) =>
              activeFilters[key as keyof typeof activeFilters].value.length > 0
          )
          .map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-x-[8px] text-[14px] leading-[22px]"
            >
              <div>
                {activeFilters[item as keyof typeof activeFilters].name}:
              </div>
              {activeFilters[item as keyof typeof activeFilters].priceValue && (
                <React.Fragment>
                  <div
                    className={classNames({
                      "line-clamp-1 max-w-[208px] break-all sm:max-w-[100%]":
                        true,
                      "line-through":
                        hoverRemoveFilter ==
                          activeFilters[item as keyof typeof activeFilters]
                            .priceValue || hoverRemoveFilter == "all",
                    })}
                  >
                    {
                      activeFilters[item as keyof typeof activeFilters]
                        .priceValue
                    }
                  </div>
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    className="min-h-[14px] min-w-[13px] cursor-pointer [&_circle]:hover:fill-[#9A9A9F]"
                    onMouseEnter={() =>
                      handleHoverRemoveFilter(
                        activeFilters[item as keyof typeof activeFilters]
                          .priceValue!,
                        true
                      )
                    }
                    onMouseLeave={() =>
                      handleHoverRemoveFilter(
                        activeFilters[item as keyof typeof activeFilters]
                          .priceValue!,
                        false
                      )
                    }
                    onClick={() =>
                      handleRemoveFilter(
                        item,
                        activeFilters[item as keyof typeof activeFilters]
                          .priceValue!
                      )
                    }
                  >
                    <circle cx="6.5" cy="7" r="6.5" fill="#C7C7C7" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.50004 7.70714L8.64648 9.85359L9.35359 9.14648L7.20714 7.00004L9.35359 4.85359L8.64648 4.14648L6.50004 6.29293L4.35359 4.14648L3.64648 4.85359L5.79293 7.00004L3.64648 9.14648L4.35359 9.85359L6.50004 7.70714Z"
                      fill="white"
                    />
                  </svg>
                </React.Fragment>
              )}

              {!activeFilters[item as keyof typeof activeFilters].priceValue &&
                activeFilters[item as keyof typeof activeFilters].value.map(
                  (filter, indx) => (
                    <React.Fragment key={indx}>
                      <div
                        className={classNames({
                          "line-clamp-1 max-w-[208px] break-all sm:max-w-[100%]":
                            true,
                          "line-through":
                            hoverRemoveFilter == filter ||
                            hoverRemoveFilter == "all",
                        })}
                      >
                        {ACTIVE_FILTERS_TRUE_VALUES[
                          filter as keyof typeof ACTIVE_FILTERS_TRUE_VALUES
                        ] ?? filter}
                      </div>
                      <svg
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        className="min-h-[14px] min-w-[13px] cursor-pointer [&_circle]:hover:fill-[#9A9A9F]"
                        onMouseEnter={() =>
                          handleHoverRemoveFilter(filter, true)
                        }
                        onMouseLeave={() =>
                          handleHoverRemoveFilter(filter, false)
                        }
                        onClick={() => handleRemoveFilter(item, filter)}
                      >
                        <circle cx="6.5" cy="7" r="6.5" fill="#C7C7C7" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.50004 7.70714L8.64648 9.85359L9.35359 9.14648L7.20714 7.00004L9.35359 4.85359L8.64648 4.14648L6.50004 6.29293L4.35359 4.14648L3.64648 4.85359L5.79293 7.00004L3.64648 9.14648L4.35359 9.85359L6.50004 7.70714Z"
                          fill="white"
                        />
                      </svg>
                    </React.Fragment>
                  )
                )}
            </div>
          ))}
        <div
          className="border-1 flex cursor-pointer select-none items-center gap-x-[8px] rounded-[11px] border border-light-gray-v2 px-[8px] py-[4px] transition duration-150 hover:border-[#9A9A9F] [&_circle]:transition  [&_circle]:duration-150 [&_circle]:hover:fill-[#9A9A9F] [&_div]:transition [&_div]:duration-150 [&_div]:hover:text-gray"
          onMouseEnter={() => setHoverRemoveFilter("all")}
          onMouseLeave={() => setHoverRemoveFilter("")}
          onClick={handleRemoveAllFilters}
          aria-expanded={height !== 0}
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
  ));

  const openedFilterData = [...Array(1)].map((e, i) => (
    <div
      key={i}
      className={classNames({
        "w-[100%] px-0 transition-[height,padding-top,padding-bottom] duration-150 sm:bg-white sm:px-0":
          true,
        "h-0 overflow-hidden py-0": !openedFilter.id,
        "h-[38px] py-[8px] sm:h-[24px] sm:py-0 md:h-[60px]":
          openedFilter.id && openedFilter.name !== "Tags",
        "!h-[60px]": filterOpenedMobile && openedFilter.name == "Status",
        "!h-[44px] md:!h-[56px]":
          filterOpenedMobile && openedFilter.name == "Price",
        "md:!p-0 ": openedFilter.name == "Tags",
        " pl-0 pr-0": openedFilter.type === "buttons",
      })}
    >
      <div
        className={classNames({
          "flex h-[100%] w-full items-center gap-x-[24px] gap-y-[8px] sm:w-[100%] sm:flex-wrap sm:gap-y-[8px] md:flex-wrap":
            true,
          "!items-center overflow-hidden px-[16px] py-[10px] sm:px-0 sm:pt-0 md:px-0 md:pt-[16px]":
            openedFilter.name == "Tags",
          "lg:overflow-y-auto": openedFilter.type == "buttons",
        })}
      >
        {openedFilter.type == "radio" ||
          (openedFilter.type == "checkbox" &&
            openedFilter.options.map((option: any, i) => (
              <div
                key={i}
                className="flex items-center gap-x-[8px] hover:cursor-pointer [&_label]:transition [&_label]:duration-150 [&_label]:hover:text-gray"
                onClick={() => handleFilterCheckbox(openedFilter, option)}
              >
                {openedFilter.type == "checkbox" && (
                  <div className="flex h-[15px] w-[15px] items-center">
                    <Checkbox
                      checked={
                        !!activeFilters[
                          openedFilter.valueName as keyof typeof activeFilters
                        ].value.find(
                          (itm) =>
                            itm ==
                            ACTIVE_FILTERS_TRUE_PARAMS[
                              option.name as keyof typeof ACTIVE_FILTERS_TRUE_PARAMS
                            ]
                        )
                      }
                      rounded
                      onChange={() => {}}
                    />
                  </div>
                )}

                <label className="font-14px-ALL hover:cursor-pointer">
                  {option.name}
                </label>
              </div>
            )))}
        {openedFilter.type == "range" && (
          <div className="flex items-center gap-x-[24px] sm:h-[100%] sm:w-[100%] sm:flex-col sm:items-start sm:justify-between md:h-[100%] md:w-[100%] md:flex-col md:items-start md:justify-between">
            <div className="sm:hidden md:hidden">Price:</div>
            <div className="flex w-[183px] items-center gap-x-[8px] sm:order-2 md:order-2">
              <div>{formatCurrency(range[0], true, true)}</div> -
              <div>{formatCurrency(range[1], true, true)}</div>
            </div>

            <div className="w-[441px] sm:order-1 sm:w-[100%] sm:p-[6px] md:order-1 md:w-[100%] md:p-[6px]">
              <Range
                step={5}
                min={minPrice}
                max={maxPrice}
                values={range}
                onChange={(e) => handleRangeChange(e)}
                onFinalChange={(values) => rangeChange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: filterOpenedMobile ? "2px" : "6px",
                      width: "100%",
                      background: `linear-gradient(to right, #e0e0e0 0% ${getPercentage(
                        maxPrice,
                        range[0]
                      )}%, #9A9A9F ${getPercentage(
                        maxPrice,
                        range[0]
                      )}% ${getPercentage(
                        maxPrice,
                        range[1]
                      )}%, #e0e0e0 ${getPercentage(maxPrice, range[1])}% 100%)`,
                      borderRadius: "5px",
                    }}
                    key={1}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: filterOpenedMobile ? "12px" : "16px",
                      width: filterOpenedMobile ? "12px" : "16px",
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                      border: filterOpenedMobile
                        ? `2px solid #9A9A9F`
                        : `3px solid #9A9A9F`,
                      outline: "none",
                    }}
                    key={props.key}
                  />
                )}
              />
            </div>
          </div>
        )}
        <AnimateHeight height={height} duration={150} id="tags">
          {openedFilter.type == "buttons" && (
            <div className="flex flex-wrap items-center gap-[7px] ">
              {tags &&
                tags
                  .filter((tag) => tag.count > 0)
                  .map((tag, i: number) => (
                    <div key={i}>
                      <Button
                        text={tag.name}
                        count={tag.count}
                        highlighted
                        customClass={
                          tag.active || allTagsActive
                            ? `!h-[26px] !text-[12px] leading-[14px] w-full px-0  md:p-0 md:leading-[26px] md:text-center !px-[6px] !py-[4px]`
                            : `!h-[26px] !text-[12px] leading-[14px] opacity-[0.3]  md:p-0 md:leading-[26px] md:text-center !px-[6px] !py-[4px]`
                        }
                        onPress={() => handleTags(tag, i)}
                      />
                    </div>
                  ))}
            </div>
          )}
        </AnimateHeight>
      </div>
    </div>
  ));

  const filterData = [...Array(1)].map((e, i) => (
    <div key={i} className="w-[345px] max-w-[100dvw] sm:w-full sm:px-2">
      <InsideScroll className="h-[100dvh] w-full">
        <div className="flex items-center gap-x-[24px] sm:max-h-[100%] sm:flex-col sm:items-start sm:gap-y-[16px] sm:px-[10px] sm:py-[24px] md:max-h-full md:w-[100%] md:flex-col md:items-start md:gap-y-[24px] md:px-[16px] md:py-[24px]">
          <div className="flex w-full items-center justify-between">
            <div className="font-16px-ALL min-w-fit font-bold">Filter by:</div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setFilterOpenedMobile(false)}
              className="absolute right-[10px] md:hidden from834:hidden"
            >
              <path
                d="M1 1.00098L16.9989 16.9999"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M1 16.999L16.9989 1.00013"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {FILTERS.filter((item) => !item.hidden && item.show === "left").map(
            (filter, i) => (
              <div key={i} className="sm:w-[100%] md:w-[100%]">
                <div
                  className={classNames({
                    "font-16px-ALL flex cursor-pointer items-center gap-x-[8px] duration-300 hover:text-gray sm:mb-0 sm:transition-[margin-bottom] [&_path]:transition [&_path]:duration-300 [&_path]:hover:stroke-[#9A9A9F]":
                      true,
                    "transition duration-300 sm:mb-[16px] [&_path]:stroke-[#9A9A9F] [&_svg]:rotate-180":
                      openedFilter.id == filter.id,
                  })}
                  onClick={() => handleOpenedFilter(filter)}
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
                      stroke="#9A9A9F"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-black"
                    />
                  </svg>
                </div>
                <div
                  className={classNames({
                    "pointer-events-none hidden h-0 overflow-hidden transition-[height] duration-150 sm:block md:block":
                      true,
                    "pointer-events-auto h-[24px] md:h-[60px]":
                      filterOpenedMobile && openedFilter.id == filter.id,
                    "!h-[60px]":
                      filterOpenedMobile &&
                      openedFilter.id == filter.id &&
                      openedFilter.name == "Status",
                    "!h-[44px] md:!h-[56px]":
                      filterOpenedMobile &&
                      openedFilter.id == filter.id &&
                      openedFilter.name == "Price",
                    "!h-auto":
                      filterOpenedMobile &&
                      openedFilter.id == filter.id &&
                      openedFilter.name == "Tags",
                  })}
                >
                  {React.Children.toArray(openedFilterData)[0]}
                </div>
              </div>
            )
          )}
          <div className="min-w-fit text-gray2 sm:mt-[8px]">
            {products?.length} results
          </div>
          <div className="w-full lg:hidden">
            {React.Children.toArray(activeFilterData)[0]}
          </div>
        </div>
      </InsideScroll>
      <div
        onClick={() => setFilterOpenedMobile(false)}
        className={classNames({
          "right- absolute right-[-44px] top-[356px] flex h-[44px] w-[44px] items-center justify-center rounded-[5px] rounded-bl-none rounded-tl-none bg-[#9A9A9F] transition duration-200 hover:bg-[#9A9A9F] sm:hidden lg:hidden":
            true,
        })}
      >
        <Image
          className="h-[15px] w-[7px] select-none"
          src="/images/popoverLeftArrow.svg"
          height={16}
          width={16}
          alt="Close"
        />
      </div>
    </div>
  ));

  return (
    <>
      <div
        id="filters"
        className={classNames({
          "fixed left-0 z-[2] hidden h-[44px] w-[218px] cursor-pointer items-center justify-center rounded-r-[5px] bg-[#9A9A9F] sm:top-[400px] sm:flex sm:h-[44px] sm:w-[44px] sm:opacity-70 md:top-[328px] md:flex md:h-[44px] md:w-[44px] md:opacity-70 lg:top-[417px]":
            true,
        })}
        onClick={() => handleMobileFilter(true)}
      >
        <Image
          src="/images/filter-icon.svg"
          width={20}
          height={22}
          alt="Filter"
          className="select-none"
        />
      </div>

      <div>
        <SidePopover
          popoverOpened={filterOpenedMobile}
          type={"productfilters"}
          fromTop={false}
          fromLeft={true}
          filterData={filterData}
          customClass="sm:!py-0"
          onClose={() => {
            handleMobileFilter(false);
          }}
        />
      </div>
    </>
  );
};

export default ProductFilterSidepopover;
