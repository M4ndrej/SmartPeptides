import { Image } from "./product";
import { TrackingDetails } from "./tracking";

export type OrdersList = Order[];

export type MainOrderType = Pick<
  Order,
  "number" | "date_created" | "status" | "total"
>;

export interface OrderResponse {
  order_id: number;
  status: string;
  order_key: string;
  order_number: string;
  customer_note: string;
  customer_id: number;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_result: PaymentResult;
  extensions: Extensions;
  data?: {
    status: number;
  };
  code?: string;
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface PaymentResult {
  payment_status: string;
  payment_details: PaymentDetail[];
  redirect_url: string;
}

export interface PaymentDetail {
  key: string;
  value: string;
}

export interface Extensions {}

export interface Order {
  id: number;
  parent_id: number;
  status: string;
  order_key: string;
  number: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  customer_id: number;
  currency_symbol?: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  subtotal: string;
  total: string;
  total_tax: string;
  billing: Billing;
  shipping: Shipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: any;
  date_paid: any;
  cart_hash: string;
  line_items: LineItem[];
  tax_lines: any[];
  coupon_lines?: CouponLine[];
  shipping_lines: ShippingLine[];
  fee_lines: FeeLine[];
  refunds: any[];
  needs_payment?: boolean;
  needs_processing?: boolean;
  _links: Links;
  meta_data?: {
    id: number;
    key: string;
    value: string;
  }[];
  tracking_details?: TrackingDetails | null;
}

export interface Billing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Shipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface LineItem {
  id: number;
  name: string;
  sku: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  price: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta: Meum[];
  meta_data: MetaData[];
  image?: Image;
}

export interface Meum {
  key: string;
  label: string;
  value: string;
}

export interface MetaData {
  id: number;
  key: string;
  value: string;
  display_key: string;
  display_value: string;
}

export interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
}

export interface FeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: any[];
}

export interface CouponLine {
  code: string;
  discount: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  customer: Customer[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface Customer {
  href: string;
}
