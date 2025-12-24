import { FC } from "react";
import PeptidesCategoriesTagsBlockSkeleton from "./PeptidesCategoriesTagsBlockSkeleton/PeptidesCategoriesTagsBlockSkeleton";

interface PeptidesCategoriesTagsSkeletonProps {
  initialSize?: number;
}

const PeptidesCategoriesTagsSkeleton: FC<
  PeptidesCategoriesTagsSkeletonProps
> = ({ initialSize = 21 }) => {
  return (
    <div className="flex w-full flex-col gap-[7px]">
      {new Array(initialSize).fill(0).map((_, index) => (
        <PeptidesCategoriesTagsBlockSkeleton key={index} />
      ))}
    </div>
  );
};

export default PeptidesCategoriesTagsSkeleton;
