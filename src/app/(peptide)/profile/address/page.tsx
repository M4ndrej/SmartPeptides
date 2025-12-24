import Addresses from "@/components/Profile/Addresses/Addresses";

export const metadata = {
  title: "My Address",
  description: "My Address",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/address/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  return (
    <>
      <Addresses />
    </>
  );
}
