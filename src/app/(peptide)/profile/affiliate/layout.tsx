import { AffiliateContextProvider } from "@/components/ProfileAffiliate/AffiliateContext";
import AffiliateTabs from "@/components/ProfileAffiliate/AffiliateTabs";
import { dynamicShareLink } from "@/helpers/affiliate_share_link";
import { fetchAffiliateData } from "@/server/affiliateServices";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AffiliateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieData = cookies();
  const loggedUser = JSON.parse(cookieData.get("loggedUser")?.value ?? "{}");
  if (!loggedUser?.user?.has_affiliate) {
    redirect("/profile");
  }

  const affiliateInfo = await fetchAffiliateData();

  return (
    <AffiliateContextProvider affiliateInfo={affiliateInfo}>
      <div className="font-D24px-M18px font-bold ">Affiliate</div>
      <p className="font-D16px-M13px mt-[16px] font-bold">Your referral link</p>
      <p className="font-D16px-M13px my-[4px] w-fit rounded-[5px] bg-[#333333] px-[8px] py-[5px] text-textWhite">
        {dynamicShareLink(affiliateInfo?.share_link)}
      </p>
      <div className="mt-[24px]">
        <AffiliateTabs />
        {children}
      </div>
    </AffiliateContextProvider>
  );
}
