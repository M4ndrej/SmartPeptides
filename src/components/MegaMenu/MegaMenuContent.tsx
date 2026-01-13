import { ProductList } from "@/types/product";
import { ProductNew } from "@/types/product";
import { FC } from "react";
import { BlogResponse, BlogResponseList } from "@/types/blog";
import classNames from "classnames";
import MegaMenuBlogCard from "./MegaMenuBlogCard";
import ProductCard from "../ProductCard/ProductCard";
import LinkButton from "../Button/LinkButton";
interface DropdownProductsContentProps {
  products?: ProductList;
  blogs?: BlogResponseList;
  type: string;
  closeSidebar?: () => void;
  activeCategory: string;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const categoryPaths: Record<string, string> = {
  Peptides: "/shop",
  "Peptide Blends": "/blends",
  "Cosmetic Peptides": "/cosmetic",
  "Peptide Supplies": "/supplies",
  Merch: "/merch",
};

const categoryLabels: Record<string, string> = {
  Peptides: "SEE ALL PEPTIDES",
  "Peptide Blends": "SEE ALL PEPTIDE BLENDS",
  "Cosmetic Peptides": "SEE ALL COSMETIC PEPTIDES",
  "Peptide Supplies": "SEE ALL PEPTIDE SUPPLIES",
  Merch: "SEE ALL MERCH",
};

const DropdownProductsContent: FC<DropdownProductsContentProps> = ({
  products,
  type,
  blogs,
  closeSidebar,
  activeCategory,
  setIsMearchModalOpen,
}) => {
  const navigateTo = categoryPaths[activeCategory] || "/peptides";
  const allPeptidesContentLabel =
    categoryLabels[activeCategory] || "SEE ALL PEPTIDES";

  return (
    <div className="flex flex-col">
      <div
        className={classNames({
          "grid gap-[16px] md:gap-[10px] md:gap-y-[24px] lg:gap-y-[24px] lg:pl-[16px] lg:pr-[16px] xl:gap-y-[16px] xl:pl-[24px] xl:pr-0 xl:pt-[32px]":
            true,
          "grid-cols-2 xl:grid-cols-5": type !== "blogs",
          "grid-cols-1 !gap-[16px] md:px-[16px] xl:!grid-cols-2 xl:gap-y-[24px]":
            type === "blogs",
        })}
      >
        {type === "products"
          ? products?.map((peptide: ProductNew, i) => (
              <ProductCard
                key={`peptide-${i}`}
                mainProduct={peptide}
                selectFirstVariation={false}
                hideSelectWeightTooltip={true}
                section="mega-menu"
                hideLastItemInList={true}
                closeSidebar={closeSidebar}
                activeCategory={activeCategory}
                setIsMearchModalOpen={setIsMearchModalOpen}
              />
            ))
          : blogs?.map((blog: BlogResponse) => (
              <MegaMenuBlogCard key={blog.id} blog={blog} />
            ))}
      </div>
      <div className="flex justify-center py-8">
        <LinkButton href={navigateTo} onClick={closeSidebar}>
          {allPeptidesContentLabel}
        </LinkButton>
      </div>
    </div>
  );
};

export default DropdownProductsContent;
