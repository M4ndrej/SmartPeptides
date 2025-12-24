import ProfileDashboard from "@/components/Profile/ProfileDashboard";

export const metadata = {
  title: "Profile",
  description: "My Profile",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/`,
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
      <ProfileDashboard />
    </>
  );
}
