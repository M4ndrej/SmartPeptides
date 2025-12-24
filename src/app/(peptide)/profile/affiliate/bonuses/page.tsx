import AffiliateBonuses from "@/components/ProfileAffiliate/Bonuses/AffiliateBonuses";
import { fetchAffiliateBonusesSummary } from "@/server/affiliateServices";
import { WithContext } from "schema-dts";

export const metadata = {
  title: "My Affiliate Bonuses",
  description: "My Affiliate Bonuses",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/bonuses/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BonusesPage() {
  const bonusesSummary = await fetchAffiliateBonusesSummary();

  return (
    <>
      <AffiliateBonuses bonusesSummary={bonusesSummary} />
    </>
  );
}
