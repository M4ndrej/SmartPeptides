import { ProductNew } from "@/types/product";
import { FC } from "react";

interface SingleProductAdditionalInfoProps {
  mainProduct: ProductNew;
}

const SingleProductAdditionalInfo: FC<SingleProductAdditionalInfoProps> = ({
  mainProduct,
}) => {
  return (
    <div className="mt-[40px] flex w-full items-start gap-x-[23px] sm:w-full sm:flex-col md:w-full md:flex-col">
      <div className="flex w-[229px] items-center justify-between sm:mb-[16px] md:mb-[16px]">
        <div className="font-D24px-M18px flex min-w-[229px] items-center gap-[16px] font-bold">
          <div className="block h-[2px] w-[16px] rounded-[2px] bg-[#333333]"></div>{" "}
          <span>Additional Info</span>
        </div>
      </div>
      <div className="w-full pt-[3px]">
        {mainProduct.attributes!.map((attribute) =>
          attribute.options.map((term: string, index: number) => (
            <div className="font-D16px-M14px pb-[8px]" key={index}>
              <span className="font-bold">{attribute.name}: </span>
              {term}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleProductAdditionalInfo;
