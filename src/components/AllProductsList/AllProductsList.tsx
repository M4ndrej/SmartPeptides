"use client";

import { fetcher } from "@/helpers/fetchers";
import { getComProductSlug } from "@/helpers/product_helper";
import { Category } from "@/types/category";
import { ProductList } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import useSWR from "swr";
import PeptidesCategoriesAccoridon from "../PeptidesCategories/PeptidesCategoriesAccordion";
import InsideScroll from "../Scroll/InsideScroll";

interface AllProductsListProps {
  closePopover?: () => void;
}

const AllProductsList: FC<AllProductsListProps> = ({ closePopover }) => {
  const { data: products } = useSWR<ProductList>(`/api/products/all`, fetcher);

  const { data: categoryList } = useSWR<Category[]>(
    "/api/products/categories",
    fetcher
  );

  const [height, setHeight] = useState<Height>("auto");

  const togglePeptidesAccordion = () => {
    setHeight(height === "auto" ? 0 : "auto");
  };

  const categories = useMemo(() => {
    return categoryList?.filter(
      (category) => !category.parent && category.slug !== "peptides"
    );
  }, [categoryList]);

  return (
    <InsideScroll className="max-h-[100dvh] sm:py-[1px]">
      <div className="sm:!min-w-none flex flex-col py-[24px] sm:block sm:max-w-none sm:px-[10px] md:pr-[16px] xl:min-w-[420px] xl:px-0">
        <div
          className="absolute right-[10px] hidden sm:block"
          onClick={() => closePopover && closePopover()}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        <div
          onClick={() => togglePeptidesAccordion()}
          className={classNames({
            "font-D18px-M14px peptides-accordion-btn mb-[16px] flex w-full cursor-pointer select-none items-center justify-between whitespace-nowrap rounded-[5px] py-[8px] pl-[12px] pr-[15px] font-bold transition duration-300 hover:bg-gray sm:mb-[16px] sm:mt-[32px] sm:min-w-full sm:max-w-none lg:max-w-[calc(100%-16px)]":
              true,
            "bg-lightgray": height !== 0,
          })}
        >
          Purchase Peptides ({products?.length ? products.length : "0"})
          {height === 0 ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75195 0.751953C6.75195 0.33774 6.41617 0.00195312 6.00195 0.00195312C5.58774 0.00195312 5.25195 0.33774 5.25195 0.751953V5.25082H0.751953C0.33774 5.25082 0.00195312 5.5866 0.00195312 6.00082C0.00195312 6.41503 0.33774 6.75082 0.751953 6.75082H5.25195V11.2498C5.25195 11.664 5.58774 11.9998 6.00195 11.9998C6.41617 11.9998 6.75195 11.664 6.75195 11.2498V6.75082H11.2498C11.664 6.75082 11.9998 6.41503 11.9998 6.00082C11.9998 5.5866 11.664 5.25082 11.2498 5.25082H6.75195V0.751953Z"
                fill="#333333"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="2"
              viewBox="0 0 12 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.00195312 1C0.00195312 0.585786 0.33774 0.25 0.751953 0.25H11.2498C11.664 0.25 11.9998 0.585786 11.9998 1C11.9998 1.41421 11.664 1.75 11.2498 1.75H0.751953C0.33774 1.75 0.00195312 1.41421 0.00195312 1Z"
                fill="#333333"
              />
            </svg>
          )}
        </div>

        <AnimateHeight height={height}>
          {products?.map((item, index: number) => (
            <div
              key={index}
              className="font-D16px-M13px mb-[16px] pl-[8px] transition last:mb-[24px] hover:text-[#333333] sm:last:mb-[24px]"
              onClick={() => closePopover && closePopover()}
            >
              <Link href={`/${getComProductSlug(item)}`}>{item.name}</Link>
            </div>
          ))}
        </AnimateHeight>
        <div className="mt-[8px] flex flex-col gap-[24px]">
          {categories?.map((category: Category, index: number) => (
            <div key={`category-${index}`}>
              <PeptidesCategoriesAccoridon
                category={category}
                title={category.name}
                productSection
                reducedWidthOnLgScreens
                hasCount
                closePopover={closePopover}
              />
            </div>
          ))}
        </div>
      </div>
    </InsideScroll>
  );
};

export default AllProductsList;
