const PeptidesCategoriesTagsBlockSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-[7px]">
      <div className="flex h-[26px] w-[97%] gap-[7px] sm:w-full">
        <div className="w-[60%] animate-pulse rounded-[5px] bg-lightgray"></div>
        <div className="w-[40%] animate-pulse rounded-[5px] bg-lightgray"></div>
      </div>
      <div className="flex h-[26px] w-[97%] flex-row-reverse gap-[7px] sm:w-full">
        <div className="w-[60%] animate-pulse rounded-[5px] bg-lightgray"></div>
        <div className="w-[40%] animate-pulse rounded-[5px] bg-lightgray"></div>
      </div>
    </div>
  );
};

export default PeptidesCategoriesTagsBlockSkeleton;
