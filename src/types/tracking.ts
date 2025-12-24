export type TrackingStatus =
  | "label_created"
  | "on_the_way"
  | "out_for_delivery"
  | "delivered"
  | "not_delivered";

export type Carrier = "UPS" | "USPS" | "FedEx";

export type TrackingDetails = {
  order_id: number;
  easyship_shipment_id: string;
  tracking_provider: string;
  tracking_number: string;
  status: string;
  status_key: TrackingStatus;
  eta_date?: string;
};

export type Checkpoint = {
  order_number: number;
  handler: string;
  message: string | null;
  location: string | null;
  city: string | null;
  country_name: string;
  country_iso3: string;
  state: string | null;
  postal_code: string | null;
  checkpoint_time: string;
  primary_status: string;
};

export type TrackingFullDetails = {
  order_id: number;
  easyship_shipment_id: string;
  tracking_provider: string;
  tracking_number: string;
  tracking_page_url: string;
  status: string;
  status_key: TrackingStatus;
  carrier: Carrier;
  weight: number | null;
  label_generated_at: string | null;
  label_paid_at: string | null;
  order_created_at: string | null;
  shipping_created_at: string | null;
  origin: string;
  destination: string;
  eta_date?: string;
  checkpoints: Checkpoint[];
};
