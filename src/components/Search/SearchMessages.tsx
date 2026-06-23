import { ProductNew } from "@/types/product";
import React from "react";

type SearchMessagesProps = {
  products: ProductNew[] | undefined;
  loading: boolean;
  error: boolean;
  searchTerm: string;
};

const SearchMessages: React.FC<SearchMessagesProps> = ({
  products,
  loading,
  error,
  searchTerm,
}) => (
  <>
    {!products && !loading && !error && (
      <div className="font-D16px-M13px mb-[48px] mt-[16px] transition duration-200 sm:mb-[24px] sm:mt-[10px]">
        Popular searches:{" "}
        <span className="text-[#333333] transition duration-200">
          Epithalon, Sermorelin, ...
        </span>
      </div>
    )}
    {products && products.length > 0 && (
      <div className="font-D16px-M13px mt-[16px]">
        We found{" "}
        <span className="font-bold">{products.length} items for you</span>
      </div>
    )}
    {searchTerm.length > 2 &&
      !loading &&
      !error &&
      (!products || products.length === 0) && (
        <div className="font-D16px-M13px mt-[16px] font-bold">
          Sorry. No results match your search.
        </div>
      )}
    {error && (
      <div className="font-D16px-M13px mt-[16px] font-bold">
        An error occurred while fetching data. Please try again later.
      </div>
    )}
  </>
);

export default SearchMessages;
