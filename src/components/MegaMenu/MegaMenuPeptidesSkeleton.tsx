import { Fragment } from "react";
import ProductSkeleton from "../Skeletons/ProductSkeleton";

const MegaMenuPeptidesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-[16px] pb-[32px] md:gap-[10px] md:gap-y-[24px] lg:pl-[16px] lg:pr-[16px] xl:grid-cols-5 xl:pl-[24px] xl:pr-0 xl:pt-[32px]">
      {new Array(5).fill(0).map((_, ind) => (
        <Fragment key={ind}>
          <ProductSkeleton />
        </Fragment>
      ))}
    </div>
  );
};

export default MegaMenuPeptidesSkeleton;
