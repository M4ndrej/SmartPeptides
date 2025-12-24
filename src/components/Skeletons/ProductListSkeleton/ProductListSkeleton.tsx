const ProductListSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-[16px]">
      <div className="block h-[342px] animate-pulse bg-lightgray md:min-w-[258px] lg:min-w-[288px] xl:h-[384px] xl:min-w-[293px]"></div>
      <div className="w-full">
        <div className="block h-[24px] w-[200px] animate-pulse bg-lightgray"></div>
        <div className="mt-[8px] block h-[24px] w-[100px] animate-pulse bg-lightgray"></div>
        <div className="mt-[8px] flex gap-[8px]">
          <div className="block h-[18px] w-[36px] animate-pulse bg-lightgray"></div>
          <div className="block h-[18px] w-[36px] animate-pulse bg-lightgray"></div>
        </div>
        <div className="mt-[10px] block h-[24px] w-[70%] animate-pulse bg-lightgray"></div>

        <div className="mt-[8px] block h-[120px] w-[calc(100%-16px)] animate-pulse bg-lightgray xl:w-full"></div>
        <div className="mt-[24px] flex items-center gap-[24px]">
          <div className="block h-[48px] w-[179px] animate-pulse bg-lightgray"></div>
          <div className="flex items-center gap-[8px]">
            <div className="block h-[27px] w-[32px] animate-pulse bg-lightgray"></div>
            <div className="block h-[24px] w-[103px] animate-pulse bg-lightgray"></div>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="block h-[27px] w-[32px] animate-pulse bg-lightgray"></div>
            <div className="block h-[24px] w-[78px] animate-pulse bg-lightgray"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
