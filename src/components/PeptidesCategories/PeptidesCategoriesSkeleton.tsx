import { FC } from "react";

interface PeptidesCategoriesSkeletonProps {
  initialSize?: number;
}

const PeptidesCategoriesSkeleton: FC<PeptidesCategoriesSkeletonProps> = ({
  initialSize = 38,
}) => {
  return (
    <div className="z-30 flex flex-col justify-center gap-[16px] sm:gap-[12px]">
      {new Array(initialSize).fill(0).map((_, i) => {
        return (
          <div
            key={`skeleton-bar-${i}`}
            className="mr-[16px] h-[24px] w-full animate-pulse rounded-[5px] bg-lightgray sm:mr-[8px] "
          />
        );
      })}
    </div>
  );
};

export default PeptidesCategoriesSkeleton;
