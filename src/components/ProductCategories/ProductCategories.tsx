import { fetcher } from "@/helpers/fetchers";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Category } from "@/types/category";
import classNames from "classnames";
import Link from "next/link";
import { FC, useMemo, useRef, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import useSWR from "swr";
import DropdownIcon from "../Icons/DropdownIcon";

const renderCategories = (
  categoryList: Pick<Category, "name" | "parent" | "slug">[] | undefined
) => {
  let newList = categoryList
    ? [...categoryList].sort((a, b) => {
        if (a.slug === "peptides") return -1;
        if (b.slug === "peptides") return 1;
        if (a.slug === "blends") return -1;
        if (b.slug === "blends") return 1;
        if (a.slug === "cosmetic") return -1;
        if (b.slug === "cosmetic") return 1;
        if (a.slug === "merch") return 1;
        if (b.slug === "merch") return -1;
        return 0;
      })
    : undefined;
  newList?.unshift({
    name: "All Products",
    slug: "shop",
    parent: 0,
  });
  return newList;
};

interface ProductCategoriesProps {
  activePath: string;
  dropdownLabel: string;
}

const ProductCategories: FC<ProductCategoriesProps> = ({
  activePath,
  dropdownLabel,
}) => {
  const { data: categoryList } = useSWR<
    Pick<Category, "name" | "parent" | "slug">[]
  >("/api/products/categories/", fetcher);

  const productCategories = useMemo(
    () => renderCategories(categoryList),
    [categoryList]
  );

  const [height, setHeight] = useState<Height>(0);
  const [shadowShown, setShadowShown] = useState(false);

  const elRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(elRef, () => {
    setHeight(0);
    setShadowShown(false);
  });

  const toggleDropdown = () => {
    setHeight(height === 0 ? "auto" : 0);

    if (!shadowShown) {
      setTimeout(() => {
        setShadowShown(true);
      }, 100);
    } else {
      setShadowShown(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-fit justify-between gap-[32px] sm:hidden md:gap-[16px] lg:mb-[24px] xl:mb-[24px]">
        {/* ADd class product-tab-active for active item */}
        {productCategories?.map((category, index) => (
          <h2 key={index}>
            <Link
              href={`/${category.slug}`}
              onClick={() => setHeight(0)}
              className={classNames({
                "product-tab": true,
                "animate-font-weight product-tab-active":
                  activePath.replaceAll("/", "") === category.slug,
              })}
            >
              {category.name}
            </Link>
          </h2>
        ))}
      </div>
      <div
        className={classNames({
          "absolute left-[10px] z-[1] hidden h-0 w-full max-w-[calc(100%-20px)] rounded-[5px]  bg-none opacity-0 shadow-globalShadow transition duration-150 sm:flex md:flex":
            true,
          "!h-[244px] !opacity-100": shadowShown,
        })}
      />

      <div className="px-[10px]" ref={elRef}>
        <div
          onClick={() => toggleDropdown()}
          className={classNames({
            "font-14px-ALL relative z-[2] mt-[8px] hidden w-full items-center justify-between rounded-[5px] bg-[#f0f0f0] px-[16px] py-[8px] font-bold text-darkgray sm:flex dark:bg-transparent":
              true,
            "rounded-bl-none rounded-br-none": height !== 0,
          })}
        >
          <span className="uppercase">{dropdownLabel}</span>
          <DropdownIcon
            className={classNames(
              "transition duration-200",
              height == 0 && "rotate-[180deg]"
            )}
          />
        </div>
        <AnimateHeight
          height={height}
          duration={200}
          className="ease-[cubic-bezier(0.11, 0, 0.5, 0)] absolute left-[10px] z-50 w-full max-w-[calc(100%-20px)] "
        >
          <div
            className={classNames({
              "relative z-[333] flex w-full flex-col gap-[16px] rounded-bl-[5px] rounded-br-[5px] bg-white p-[16px]":
                true,
              "rounded-tl-none rounded-tr-none": height !== 0,
            })}
          >
            {productCategories?.map((category, index) => (
              <Link
                key={index}
                href={`/${category.slug}`}
                onClick={() => {
                  setHeight(0);
                  setShadowShown(false);
                }}
                className={classNames({
                  "product-tab": true,
                  "font-bold text-darkgray":
                    activePath.replaceAll("/", "") === category.slug,
                })}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </AnimateHeight>
      </div>
    </>
  );
};

export default ProductCategories;
