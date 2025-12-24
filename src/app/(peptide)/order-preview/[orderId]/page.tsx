import OrderPreviewPage from "@/components/OrderPreviewPage/OrderPreviewPage";

export const metadata = {
  title: "Order Preview",
  description: "Order Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  return <OrderPreviewPage orderNumber={params.orderId} />;
}
