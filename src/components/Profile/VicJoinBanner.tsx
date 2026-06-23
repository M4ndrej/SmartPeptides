import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";

interface VicJoinBannerProps {
  className?: string;
}

const VicJoinBanner: FC<VicJoinBannerProps> = ({ className }) => {
  return null;
  // return (
  //   <div
  //     className={classNames(
  //       "relative flex items-center gap-4 overflow-hidden rounded-[5px] bg-lightgray px-8 py-6 sm:px-4 sm:py-[20px]",
  //       className
  //     )}
  //   >
  //     <div className="flex w-full flex-col gap-2 sm:min-w-[300px]">
  //       <p className="font-D20px-M16px font-bold text-[#333333]">VIC Status</p>
  //       <p className="font-D16px-M12px w-full">
  //         <b>VIC (Very Important Customer)</b> status offers <b>10%</b>,{" "}
  //         <b>15%</b>, <b>20%</b>, <b>25%</b> and <b>30%</b> of permanent
  //         discount. Spend at least $5,000 USD to unlock it.
  //       </p>
  //     </div>
  //     <Image
  //       src="/images/vicBanner.svg"
  //       alt="VIC Banner"
  //       width={283}
  //       height={92}
  //       className="w-[242px] sm:hidden from834:w-[198px] xl:w-[283px]"
  //     />
  //     <Image
  //       src="/images/vicBannerSm.svg"
  //       alt="VIC Banner"
  //       width={128}
  //       height={56}
  //       className="hidden w-[128px] sm:block"
  //     />
  //     <Image
  //       src={"/images/banner_background.svg"}
  //       width={115}
  //       height={156}
  //       alt="Background"
  //       className="absolute bottom-0 right-0 top-0 z-0 h-full w-auto select-none"
  //     />
  //   </div>
  // );
};

export default VicJoinBanner;
