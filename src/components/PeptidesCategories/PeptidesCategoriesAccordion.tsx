"use client";

import { fetcher } from "@/helpers/fetchers";
import { Category } from "@/types/category";
import { ProductList, ProductNew } from "@/types/product";
import classNames from "classnames";
import Link from "next/link";
import { FC, useMemo, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import useSWR from "swr";
import MinusIcon from "../Icons/MinusIcon";
import PlusIcon from "../Icons/PlusIcon";
import PeptidesCategoriesSkeleton from "./PeptidesCategoriesSkeleton";
import { getComProductSlug } from "@/helpers/product_helper";

interface PeptidesCategoriesAccoridonProps {
  category?: Category;
  title: string;
  homePage?: boolean;
  textElipsis?: boolean;
  content?: ProductList;
  firstAccOpen?: boolean;
  productSection?: boolean;
  reducedWidthOnLgScreens?: boolean;
  reducedWidth?: boolean;
  hasCount?: boolean;
  closePopover?: () => void;
}

const PeptidesCategoriesAccoridon: FC<PeptidesCategoriesAccoridonProps> = ({
  category,
  title,
  homePage,
  content,
  textElipsis,
  firstAccOpen,
  productSection,
  reducedWidthOnLgScreens,
  hasCount,
  closePopover,
  reducedWidth,
}) => {
  const { data: products, isLoading: isProductsLoading } = useSWR<ProductNew[]>(
    `/api/products/all?category=${category?.slug}`,
    fetcher
  );

  const [height, setHeight] = useState<Height>(
    homePage && !firstAccOpen ? 0 : "auto"
  );

  const showPeptides = () => {
    setHeight(height === 0 ? "auto" : 0);
  };

  const productsToShow = useMemo(
    () => content ?? products,
    [products, content]
  );

  const productCount = useMemo(() => {
    if (isProductsLoading) return "--";
    return productsToShow?.length ?? 0;
  }, [productsToShow, isProductsLoading, content, title]);

  return (
    <div>
      <div
        onClick={(e) => showPeptides()}
        aria-expanded={height !== 0}
        aria-controls="peptide-blends"
        className={classNames({
          "font-D18px-M14px peptides-accordion-btn group flex max-h-[38px] w-full max-w-full  cursor-pointer select-none items-center justify-between whitespace-nowrap rounded-[5px] py-[8px] pl-[12px] pr-[15px] font-bold transition duration-300 hover:bg-borderColor  sm:!max-w-[calc(100%-10px)]":
            true,
          "bg-lightgray": height !== 0,
          "!max-w-full !bg-white !p-0 dark:!bg-transparent [&_svg]:ml-[9px]":
            homePage,
          "sm:min-w-full sm:!max-w-none ": productSection,
          "lg:!max-w-[calc(100%-16px)]": reducedWidthOnLgScreens,
          "!max-w-[calc(100%-16px)] sm:!max-w-[calc(100%-10px)]": reducedWidth,
        })}
      >
        <div
          className={classNames({
            "transition duration-200 group-hover:text-[#E7461E]": homePage,
          })}
        >
          {title} {hasCount && !homePage && <span>({productCount})</span>}
        </div>
        {height === 0 ? (
          <PlusIcon
            width={12}
            height={12}
            strokeWidth={3}
            className="!stroke-black"
          />
        ) : (
          <MinusIcon
            width={12}
            height={12}
            strokeWidth={3}
            className="!stroke-black"
          />
        )}
      </div>
      <AnimateHeight height={height} id="peptides" duration={200}>
        <div className={classNames("grid grid-cols-1 gap-2")}>
          <div
            className={classNames(
              "flex flex-col gap-[16px] pb-[8px] pl-[8px] pr-[24px] pt-[8px]",
              homePage && "!pl-0 pt-[8px]"
            )}
          >
            {!isProductsLoading || content ? (
              productsToShow?.map((product: ProductNew, index: number) => (
                <Link
                  onClick={() => closePopover && closePopover()}
                  key={`product-${index}`}
                  href={`/${getComProductSlug(product)}`}
                  className={classNames({
                    "font-D16px-M13px cursor-pointer transition duration-300 hover:text-[#E7461E]":
                      true,
                    "max-w-[175px] overflow-hidden text-ellipsis whitespace-nowrap":
                      textElipsis,
                  })}
                >
                  {product.name}
                </Link>
              ))
            ) : (
              <PeptidesCategoriesSkeleton initialSize={category?.count ?? 10} />
            )}
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default PeptidesCategoriesAccoridon;
