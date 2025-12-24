import AffiliateSales from "@/components/ProfileAffiliate/Sales/AffiliateSales";
import { fetchAffiliateSalesSummary } from "@/server/affiliateServices";

export const metadata = {
  title: "My Affiliate Earnings",
  description: "My Affiliate Earnings",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/earnings/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EarningsPage() {
  const salesSummary = await fetchAffiliateSalesSummary();

  return (
    <>
      <AffiliateSales salesSummary={salesSummary} />
    </>
  );
}
