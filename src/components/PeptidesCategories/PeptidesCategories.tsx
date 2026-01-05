"use client";

import { fetcher } from "@/helpers/fetchers";
import { Category } from "@/types/category";
import { FC, useMemo } from "react";
import useSWR from "swr";
import InsideScroll from "../Scroll/InsideScroll";
import SidebarMobileHeader from "../SidebarMobileHeader/SidebarMobileHeader";
import PeptidesCategoriesAccoridon from "./PeptidesCategoriesAccordion";

interface PeptidesCategoriesProps {
  closePopover: any;
}

const PeptidesCategories: FC<PeptidesCategoriesProps> = ({ closePopover }) => {
  const { data: categoryList } = useSWR<Category[]>(
    "/api/products/categories",
    fetcher
  );

  const categories = useMemo(() => {
    return categoryList?.toSorted((a, b) => {
      if (a.slug === "peptides") return -1;
      if (b.slug === "peptides") return 1;
      if (a.slug === "blends") return -1;
      if (b.slug === "blends") return 1;
      if (a.slug === "cosmetic") return -1;
      if (b.slug === "cosmetic") return 1;
      if (a.slug === "merch") return 1;
      if (b.slug === "merch") return -1;
      return 0;
    });
  }, [categoryList]);

  return (
    <div className="w-[448px] max-w-[100%] overflow-auto sm:w-full sm:py-[1px]">
      <InsideScroll className="h-[100dvh]">
        <SidebarMobileHeader
          title="Products"
          closeBtnAction={() => closePopover()}
        />
        <div className="flex flex-col overflow-hidden sm:pl-[10px]">
          <div className="mt-[24px] flex flex-col gap-[24px] pb-[32px]">
            {categories?.map((category: Category, index: number) => (
              <div key={`category-${index}`}>
                <PeptidesCategoriesAccoridon
                  category={category}
                  title={category.name}
                  hasCount
                  reducedWidth
                  closePopover={closePopover}
                />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="pb-[24px]">
            <PeptideSuppliesOnly isHomePage={false} />
          </div> */}
      </InsideScroll>
    </div>
  );
};

export default PeptidesCategories;
