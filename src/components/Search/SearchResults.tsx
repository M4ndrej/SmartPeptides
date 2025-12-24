import { ProductNew } from "@/types/product";
import classNames from "classnames";
import React from "react";
import LinkButton from "../Button/LinkButton";
import ProductCard from "../ProductCard/ProductCard";
import InsideScroll from "../Scroll/InsideScroll";

type SearchResultsProps = {
  products: ProductNew[];
  searchTerm: string;
  closePopover: any;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  searchTerm,
  closePopover,
}) => {
  return (
    <InsideScroll className="max-h-[70dvh]">
      <div
        className={classNames({
          "grid grid-cols-2 gap-[16px] sm:px-[16px] md:grid-cols-3 md:gap-[10px] md:gap-y-[24px] md:pr-[16px] lg:grid-cols-4 lg:gap-y-[24px] lg:pl-[16px] lg:pr-[16px] xl:grid-cols-5 xl:gap-y-[16px] xl:pl-0 xl:pr-[16px] xl:pt-0":
            true,
        })}
      >
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              mainProduct={product}
              section="search"
              selectFirstVariation={false}
              searchTerm={searchTerm}
              hideSelectWeightTooltip={true}
              closeSidebar={closePopover}
              fixedGridMode="5x5"
            />
          </div>
        ))}
      </div>
      <div className="my-[32px] flex w-full justify-center sm:mb-[24px]">
        <LinkButton href={"/shop"} onClick={closePopover}>
          MORE RESULTS
        </LinkButton>
      </div>
    </InsideScroll>
  );
};

export default SearchResults;
