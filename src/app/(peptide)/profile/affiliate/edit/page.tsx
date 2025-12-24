import AffiliateEditProfile from "@/components/ProfileAffiliate/EditProfile/AffiliateEditProfile";

export const metadata = {
  title: "Edit Affiliate Profile",
  description: "Edit Affiliate Profile",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/affiliate/edit/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function EditAffiliatePage() {
  return (
    <>
      <AffiliateEditProfile />
    </>
  );
}
