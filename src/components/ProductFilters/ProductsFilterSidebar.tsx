import Popover from "@/components/Popover/Popover";
import PopoverArrow from "@/components/Popover/PopoverArrow";
import PopoverCloseButton from "@/components/Popover/PopoverCloseButton";
import { ProductNew } from "@/types/product";
import { Dispatch, FC, SetStateAction } from "react";
import ProductFilterMobile from "./ProductFiltersMobile";

interface ProductsSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  products?: ProductNew[];
  category?: string;
}

const ProductsFilterSidebar: FC<ProductsSidebarProps> = ({
  isOpen,
  setIsOpen,
  products,
  category,
}) => {
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position="left"
      containerClassNames="sm:!w-screen md:!min-w-[345px] lg:!min-w-[345px]"
    >
      {(closePopover) => (
        <>
          <PopoverArrow
            position="left"
            closePopover={closePopover}
            className="!top-[330px] block sm:hidden"
          />
          <PopoverCloseButton
            width={32}
            height={32}
            position="right"
            closePopover={closePopover}
            className="hidden sm:block"
          />
          <ProductFilterMobile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            products={products}
            category={category}
          />
        </>
      )}
    </Popover>
  );
};

export default ProductsFilterSidebar;
