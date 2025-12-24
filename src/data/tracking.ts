import { TrackingStatus } from "@/types/tracking";

export const trackingStatuses: { key: TrackingStatus; label: string }[] = [
  { key: "label_created", label: "Label Created" },
  { key: "on_the_way", label: "On the Way" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];
