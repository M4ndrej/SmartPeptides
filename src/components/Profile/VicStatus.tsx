import { formatCurrency } from "@/helpers/curency_format";
import { UserVICData } from "@/types/user";
import classNames from "classnames";
import { FC } from "react";
import BannerWrapper from "../BannerWrapper/BannerWrapper";
import VicJoinBanner from "./VicJoinBanner";

interface VicStatusProps {
  vicData?: UserVICData;
  className?: string;
}

const VicStatus: FC<VicStatusProps> = ({ vicData, className }) => {
  return null;
  // const moneySpent = formatCurrency(vicData?.total_spent ?? 0, true, false);
  // const nextThreshload = formatCurrency(
  //   vicData?.next_tier?.threshold ?? 0,
  //   true,
  //   false
  // );
  // const toReach = formatCurrency(
  //   vicData?.next_tier?.to_reach ?? 0,
  //   true,
  //   false
  // );

  // if (!vicData?.current_tier) {
  //   return <VicJoinBanner className={className} />;
  // }

  // return (
  //   <div className={classNames("flex gap-4 xs:flex-col", className)}>
  //     <BannerWrapper
  //       title={`Current status: ${vicData.current_tier.name}`}
  //       bgColor="#FFFDF2"
  //       borderColor="#333333"
  //       bannerColor="#333333"
  //       className="sm:flex-1 md:flex-1 lg:flex-grow xl:flex-1"
  //     >
  //       <div className="flex flex-col gap-1">
  //         <p className="font-bold">
  //           ({vicData.current_tier.discount}% permanent discount)
  //         </p>
  //         <p>Money spent: {moneySpent}</p>
  //       </div>
  //     </BannerWrapper>

  //     {vicData?.next_tier && (
  //       <BannerWrapper
  //         title={`Next status: ${vicData.next_tier.name}`}
  //         bgColor="#F8F8F8"
  //         bannerColor="#E3E3E3"
  //         titleColor="#999999"
  //         className="sm:flex-1 md:flex-1 lg:flex-grow xl:flex-1"
  //       >
  //         <div className="flex flex-col gap-1">
  //           <p className="font-bold text-[#999999]">
  //             ({vicData.next_tier.discount}% permanent discount)
  //           </p>
  //           <p className="text-[#999999]">
  //             Spend {nextThreshload} ({toReach} more)
  //           </p>
  //         </div>
  //       </BannerWrapper>
  //     )}
  //   </div>
  // );
};

export default VicStatus;
