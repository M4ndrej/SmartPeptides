"use client";

import { productFilter } from "@/data/product_data";
import classNames from "classnames";
import { FC } from "react";
import { useOurProductHomeContext } from "../OurProductHomeContext";

type ProductFilterProps = {};

const ProductFilter: FC<ProductFilterProps> = () => {
  const { homeFilter, setHomeFilter } = useOurProductHomeContext();

  return (
    <div className="our-product-filters-alignment mb-[44px] mt-[40px] flex h-fit gap-[32px] sm:mb-[24px] sm:mt-[8px] xl:mb-[40px]">
      {productFilter.map((item) => (
        <div
          key={item.key}
          className={classNames(
            "product-filter-btn font-D16px-M14px animate-font-weight relative cursor-pointer justify-center transition-[color] ease-in-out hover:text-[#333333] sm:mt-[32px] sm:flex sm:flex-row-reverse sm:items-center [&_div]:hover:w-[100%]",
            homeFilter === item.key &&
              "!font-bold !text-[#333333] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-[#333333] after:content-[''] sm:after:w-[calc(100%-3px)]"
          )}
          onClick={() => setHomeFilter(item.key)}
        >
          <div className="whitespace-nowrap">{item.name}</div>
          {/* <div
            className={classNames({
              "absolute bottom-0 left-0 h-[2px] w-0 rounded bg-[#333333] transition-[width] ease-in-out sm:mr-[16px] sm:w-[24px]":
                true,
              "w-[100%]": homeFilter == item.key,
              "sm:hidden": homeFilter != item.key,
            })}
          ></div> */}
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
