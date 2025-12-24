import StoreCredits from "@/components/Profile/StoreCredits/StoreCredits";

export const metadata = {
  title: "Store Credits",
  description: "Store Credits",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/store-credits`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StoreCreditPage() {
  return (
    <>
      <StoreCredits />
    </>
  );
}
