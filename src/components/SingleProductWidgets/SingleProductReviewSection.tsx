import { ProductNew } from "@/types/product";
import { FC } from "react";
import ProductReviews from "../ProductReviews/ProductReviews";

interface SingleProductReviewSectionProps {
  mainProduct: ProductNew;
}

const SingleProductReviewSection: FC<SingleProductReviewSectionProps> = ({
  mainProduct,
}) => {
  return (
    <div className="mt-[40px] flex w-full items-start gap-x-[23px]  sm:w-[100%] sm:flex-col md:w-full md:flex-col">
      <div className="flex w-[229px] items-center justify-between sm:mb-[16px] md:mb-[16px]">
        <div className="flex min-w-[229px] items-center gap-[16px] text-[24px] font-bold leading-[29px] text-darkgray sm:text-[18px] sm:leading-[22px]">
          <div className="block h-[2px] w-[16px] rounded-[2px] bg-[#9A9A9F]"></div>{" "}
          <span> Reviews ({mainProduct.rating_count})</span>
        </div>
      </div>
      <div className=" w-full pt-[3px]">
        <ProductReviews
          avgRating={mainProduct.average_rating}
          reviewCount={mainProduct.rating_count}
        />
      </div>
    </div>
  );
};

export default SingleProductReviewSection;
