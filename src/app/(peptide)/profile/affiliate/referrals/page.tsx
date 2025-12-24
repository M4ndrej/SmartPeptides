import AffiliateCustomers from "@/components/ProfileAffiliate/Customers/AffiliateCustomers";
import { fetchAffiliateCustomersSummary } from "@/server/affiliateServices";

export const metadata = {
  title: "My Affiliate Customers",
  description: "My Affiliate Referrals",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/referrals/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ReferralsPage() {
  const customersSummary = await fetchAffiliateCustomersSummary();

  return (
    <>
      <AffiliateCustomers customersSummary={customersSummary} />
    </>
  );
}
