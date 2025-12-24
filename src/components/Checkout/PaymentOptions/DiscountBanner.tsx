// import LikeIcon from "@/components/Icons/LikeIcon";
import Image from "next/image";
import { FC } from "react";

interface SimpleDiscountBannerProps {
  percentage: number;
}

const SimpleDiscountBanner: FC<SimpleDiscountBannerProps> = ({
  percentage,
}) => {
  return (
    <div className="font-13px-ALL flex h-6 items-center justify-end rounded-[5px] pl-3 font-bold  sm:h-[18px] sm:text-[12px] sm:leading-[10px]">
      Save additional {percentage}%
    </div>
  );
};

interface DiscountBannerProps {
  percentage: number;
  isRecommended?: boolean;
  image?: string;
}

const DiscountBanner: FC<DiscountBannerProps> = ({
  percentage,
  isRecommended,
  image,
}) => {
  if (!isRecommended) {
    return <SimpleDiscountBanner percentage={percentage} />;
  }

  return (
    <div className="ml-auto flex h-6 items-center justify-start gap-1 overflow-visible">
      <div className="flex flex-col items-end justify-center">
        {image && (
          <Image
            src={image}
            width={115}
            height={24}
            alt="Recommended"
            className="font-14px-ALL absolute -top-[20px] left-1/2 -translate-x-1/2 font-bold sm:h-[20px] sm:w-[100px] sm:text-[9px] sm:leading-[12px] md:h-[20px]"
          />
        )}
        <SimpleDiscountBanner percentage={percentage} />
      </div>
    </div>
  );
};

export default DiscountBanner;
