import { ProductList } from "@/types/product";
import { FC } from "react";
import ProductSlider from "./ProductSlider";

interface RelatedSliderProps {
  relatedProducts?: ProductList;
}

const RelatedSlider: FC<RelatedSliderProps> = ({ relatedProducts }) => {
  const products = relatedProducts;
  const isLoading = false;

  return (
    <div className="w-full ">
      <div className="w-full text-center">
        <h2 className="font-D32px-M24px font-bold">Related Products</h2>
        <div className="mx-auto mb-[40px] mt-[16px] h-[2px] w-[48px] bg-[#333333]"></div>
      </div>
      <div className="relative m-auto flex max-w-[1264px] sm:px-0 lg:h-[440px] xl:px-[16px]">
        <ProductSlider
          products={products}
          isLoading={isLoading}
          dotsType="dots"
        />
      </div>
    </div>
  );
};

export default RelatedSlider;
