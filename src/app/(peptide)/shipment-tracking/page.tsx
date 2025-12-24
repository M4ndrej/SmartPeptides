import { redirect } from "next/navigation";
import TrackingShipment from "@/components/Tracking/TrackingShipment";
import { fetchOrderData, fetchTrackingData } from "@/server/services";

export const metadata = {
  title: "Shipment Tracking",
  description: "Shipment Tracking",
  ...(process.env.ENVIRONMENT === "production" && {
    alternates: {
      canonical: `/shipment-tracking/`,
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ShipmentTracking({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  if (
    !searchParams?.order_id ||
    typeof searchParams?.order_id !== "string" ||
    !searchParams?.email ||
    typeof searchParams?.email !== "string"
  ) {
    redirect("/404");
  }

  const [trackingData, orderData] = await Promise.all([
    fetchTrackingData(+searchParams.order_id, searchParams.email),
    fetchOrderData(+searchParams.order_id),
  ]);

  if (!trackingData || !orderData) {
    redirect("/404");
  }

  return (
    <>
      <div className="container-margin-bottom-D96px-M64px container-padding-inline mx-[auto] mt-[48px] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
        <TrackingShipment tracking={trackingData} order={orderData} />
      </div>
    </>
  );
}
