import AffiliateCreatives from "@/components/ProfileAffiliate/Creatives/AffiliateCreatives";
import { fetchAffiliateCreatives } from "@/server/affiliateServices";

export const metadata = {
  title: "My Affiliate Creatives",
  description: "My Affiliate Creatives",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/creatives/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreativesPage() {
  const creatives = await fetchAffiliateCreatives();

  return (
    <>
      <AffiliateCreatives creatives={creatives} />
    </>
  );
}
