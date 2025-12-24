export interface CartResponse {
  cart: CartMainResponse;
  loggedUser: string;
}

export type CartTotals = {
  price: number;
  shipping: number;
  subtotal: number;
  discount: number;
};

export type BillingOrShippingAddressFields = BillingAddress;

export interface CartMainResponse {
  items: CartItemType[];
  total: string;
  totals: CartTotals;
  subtotal: string;
  fees: Fee[];
  coupons: Coupon[];
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  shipping_rates: ShippingRate[];
  items_count: number;
  current_cart_option: "authnet" | "quantumepay";
  applied_coupon_store_credit?: AppliedCouponCredit;
}

export interface AppliedCouponCredit {
  percentage: number;
  amount: number;
  code: string;
}

export interface CartItemType {
  id: number;
  title: string;
  name: string;
  slug: string;
  key: string;
  product_id: number;
  quantity: number;
  sku: string;
  price: string;
  prices: CartItemPrices;
  regular_price: string;
  link: string;
  subtotal: number;
  total: number;
  attributes: Attributes;
  image: Image;
  variation: Variation[];
  categories: CartItemCategory[];
  is_gift_item?: boolean;
}

interface CartItemPrices {
  price: number;
  discount_price: number;
  discount_type: string;
  total_discount_price: number;
}

export interface Variation {
  attribute: string;
  value: string;
}

export interface Attributes {
  pa_weight: string;
}

export interface CartItemCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface Fee {
  key: string;
  name: string;
  total: string;
}

export interface Coupon {
  code: string;
  amount: number;
  percentage: number;
  applied_percentage: number;
}

export interface ShippingAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string | null;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  phone?: string;
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  country: string;
  state: string;
  postcode: string;
  city: string;
  phone: string;
  address?: string;
  address_1: string;
  address_2: string;
}

export interface ShippingRate {
  id: string;
  label: string;
  cost: string;
  taxes: any[];
  method_id: string;
  instance_id: number;
  selected: boolean;
}

export interface CartItemContext {
  key: string;
  id: number;
  quantity: number;
}
