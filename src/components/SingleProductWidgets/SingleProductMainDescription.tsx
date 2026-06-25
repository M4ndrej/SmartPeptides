import { ProductNew } from "@/types/product";
import { FC } from "react";
import { replaceLinks } from "@/helpers/replace_links_helper";

interface SingleProductMainDescriptionProps {
  mainProduct: ProductNew;
}

const SingleProductMainDescription: FC<SingleProductMainDescriptionProps> = ({
  mainProduct,
}) => {
  // Check if description exists
  const hasDescription = mainProduct.description?.trim();

  return (
    <>
      {hasDescription && (
        <div className="flex items-start gap-x-[23px] sm:w-[100%] sm:flex-col md:flex-col">
          <div className="flex w-[229px] items-center justify-between sm:mb-[16px] md:mb-[16px]">
            <div className="font-D24px-M18px flex min-w-[229px] items-center gap-[16px] font-bold">
              <div className="block h-[2px] w-[16px] rounded-[2px] bg-[#9A9A9F]"></div>{" "}
              <span>Description</span>
            </div>
          </div>
          <div
            className="font-D16px-M14px long-desc mt-[-8px] w-full pt-[3px] sm:break-words"
            style={{ fontFamily: "inherit" }}
            dangerouslySetInnerHTML={{
              __html: replaceLinks(mainProduct.description),
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default SingleProductMainDescription;
