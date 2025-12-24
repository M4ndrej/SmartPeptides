import { ProductNew } from "@/types/product";
import { FC } from "react";
import Button from "../Button/Button";

interface SingleProductTagsProps {
  mainProduct: ProductNew;
}

const SingleProductTags: FC<SingleProductTagsProps> = ({ mainProduct }) => {
  if (!mainProduct.tags || mainProduct.tags.length === 0) {
    return null;
  }

  return (
    <>
      <div className="font-16px-ALL pb-[8px] font-bold">TAGS:</div>
      <div className="flex flex-wrap items-center gap-[10px]">
        {mainProduct.tags.map((tag, i) => (
          <div key={i}>
            <Button
              text={tag!.name}
              highlighted
              customClass="!h-[26px] !text-[13px] pointer-events-none sm:px-[13px]"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleProductTags;
