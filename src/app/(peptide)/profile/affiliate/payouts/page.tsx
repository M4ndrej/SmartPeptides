import AffiliatePayouts from "@/components/ProfileAffiliate/Payouts/AffiliatePayouts";
import { fetchAffiliatePayoutsSummary } from "@/server/affiliateServices";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "My Affiliate Payouts",
  description: "My Affiliate Payouts",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/payouts/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PayoutsPage() {
  const payoutsSummary = await fetchAffiliatePayoutsSummary();

  return (
    <>
      <AffiliatePayouts payoutsSummary={payoutsSummary} />
    </>
  );
}
