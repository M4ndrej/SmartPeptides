import ProfileDetails from "@/components/Profile/ProfileDetails/ProfileDetails";

export const metadata = {
  title: "Profile Details",
  description: "Profile Details",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/details`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfileDetailsPage() {
  return (
    <>
      <ProfileDetails />
    </>
  );
}
