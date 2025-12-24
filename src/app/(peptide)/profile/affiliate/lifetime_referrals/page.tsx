import AffiliateLifetimeReferrals from "@/components/ProfileAffiliate/LifetimeReferrals/AffiliateLifetimeReferrals";
import { fetchAffiliateLifetimeCustomersSummary } from "@/server/affiliateServices";

export const metadata = {
  title: "My Affiliate Lifetime Referrals",
  description: "My Affiliate Lifetime Referrals",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/lifetime_referrals/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LifetimeReferralsPage() {
  const lifetimeCustomersSummary =
    await fetchAffiliateLifetimeCustomersSummary();

  return (
    <>
      <AffiliateLifetimeReferrals
        lifetimeReferralsSummary={lifetimeCustomersSummary}
      />
    </>
  );
}
