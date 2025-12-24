import MyOrders from "@/components/Profile/MyOrders/MyOrders";

export const metadata = {
  title: "Profile Orders",
  description: "My Orders",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/profile/orders/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrdersPage() {
  return (
    <>
      <MyOrders />
    </>
  );
}
