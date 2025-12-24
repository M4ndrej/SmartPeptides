import AffiliateOverview from "@/components/ProfileAffiliate/Overview/AffiliateOverview";
import { fetchAffiliateOverview } from "@/server/affiliateServices";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "My Affiliate Overview",
  description: "My Affiliate Overview",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AffiliateOverviewPage() {
  const overview = await fetchAffiliateOverview();

  return (
    <>
      <AffiliateOverview overview={overview} />
    </>
  );
}
