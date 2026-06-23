import classNames from "classnames";
import { FC, useState } from "react";
import FilterIcon from "../Icons/FilterIcon";
import useIsClientRender from "@/hooks/useIsClientRender";
import { createPortal } from "react-dom";
import ProductsFilterSidebar from "./ProductsFilterSidebar";
import { ProductNew } from "@/types/product";

interface ProductFilterProps {
  products?: ProductNew[];
  category?: string;
}

const ProductsFilterButton: FC<ProductFilterProps> = ({
  products,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useIsClientRender();

  return (
    <>
      <div
        id="filters"
        className={classNames({
          "fixed left-0 z-[2] hidden h-[44px] w-[218px] cursor-pointer items-center justify-center rounded-r-[5px] bg-[#333333] sm:top-[400px] sm:flex sm:h-[44px] sm:w-[44px] sm:opacity-70 md:top-[328px] md:flex md:h-[44px] md:w-[44px] md:opacity-70 lg:top-[417px]":
            true,
        })}
        onClick={() => setIsOpen(true)}
      >
        <FilterIcon />
      </div>
      {isClient &&
        createPortal(
          <ProductsFilterSidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            products={products}
            category={category}
          />,
          document.body
        )}
    </>
  );
};

export default ProductsFilterButton;
