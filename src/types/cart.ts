export interface CartOldResponse {
  cart: Cart;
  loggedUser: string;
}

export interface Cart {
  items: Item[];
  coupons: Coupon[];
  fees: Fee[];
  totals: Totals3;
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: ShippingRate[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  errors: any[];
  payment_methods: string[];
  extensions: Extensions2;
}

export interface Item {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: QuantityLimits;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: any;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Image[];
  variation: Variation[];
  item_data: any[];
  prices: Prices;
  totals: Totals;
  catalog_visibility: string;
  extensions: Extensions;
}

export interface QuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface Variation {
  attribute: string;
  value: string;
}

export interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: any;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  raw_prices: RawPrices;
}

export interface RawPrices {
  precision: number;
  price: string;
  regular_price: string;
  sale_price: string;
}

export interface Totals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Extensions {}

export interface Fee {
  key: string;
  name: string;
  totals: Totals2;
}

export interface Totals2 {
  total: string;
  total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Totals3 {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  tax_lines: any[];
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
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
  setAsDefault?: boolean;
}

export type BillingOrShippingAddressFields = BillingAddress;

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
  email?: string;
  phone: string;
}

export interface ShippingRate {
  package_id: number;
  name: string;
  destination: Destination;
  items: Item2[];
  shipping_rates: any[];
}

export interface Destination {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Item2 {
  key: string;
  name: string;
  quantity: number;
}

export interface Extensions2 {}

export interface CartItemContext {
  key: string;
  id: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discount_type: string;
  totals: Totals4;
}

export interface Totals4 {
  currency_code: string;
  currency_decimal_separator: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
  currency_symbol: string;
  currency_thousand_separator: string;
  total_discount: string;
  total_discount_tax: string;
}