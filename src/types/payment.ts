export interface PaymentData {
  emailAddress: string;
  firstName: string;
  lastName: string;
  address_1: string;
  companyName: string;
  address_2: string;
  townCity: string;
  state: string;
  postcodeZip: string;
  country: string;
  phone: string;
  shippingMethod: string;
  orderNotes: string;
}

export type CheckoutPaymentDataValues = {
  key: string;
  value: string | boolean;
};

export type CreditCardProcessor =
  | "mastercard"
  | "visa"
  | "americanExpress"
  | "discover"
  | "dinnersClub"
  | "jcb";

export type PaymentMethods =
  | "authnet"
  | "quantumepay"
  | "cashapp"
  | "zelle"
  | "bacs"
  | "coinbase"
  | "venmo"
  | "flexipay"
  | "fiatsystems"
  | "unipayment"
  | "paymentechnologies"
  | "egift-certificate" // MAX RED
  | "nowpayments_gateway"
  | "oaktree"
  | "placetopay"
  | "gwpaymentplugin" // New Canada Gateway ABAKA
  | "dfinsell"
  | "peptide-paypal"
  | "peptide-revolut"
  | "vidamagica"
  | "peptide_card";

export interface Ga4Data {
  client_id: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  zone_id?: string | null;
}

export interface PropellerData {
  visitor_id: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface CheckoutPaymentAddData {
  payment_data?: CheckoutPaymentDataValues[];
  customer_note?: string;
  billing_email?: string;
  billing_address?: BillingAddress;
  shipping_address?: ShippingAddress;
  payment_method?: PaymentMethods;
  create_account?: boolean;
  firstUpdate?: boolean;
  extensions?: {
    subscribers: {
      optin: boolean;
      utm_info: string;
    };
  };
  ga4_data?: Ga4Data | null;
  propeller_data?: PropellerData;
}

export interface ICheckout {
  order_id: number;
  status: string;
  order_key: string;
  order_number: string;
  customer_note: string;
  customer_id: number;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method?: PaymentMethods;
  payment_result: PaymentResult;
  extensions: Extensions;
  isUserLoggedIn?: boolean;
  isVerifiedEmail?: boolean;
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

export interface Extensions {}

export interface PaymentSuccessResult {
  order_id: number;
  status: string;
  order_key: string; // "wc_order_aOLs2bgUEskPA"
  order_number: string; // "16145"
  customer_note: string;
  customer_id: number;
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_result: PaymentResult;
  extensions: Extensions;
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

export interface CreditCardDetails {
  "credit-card-number": string;
  "credit-card-expiry": string;
  "credit-card-cvc": string;
  "credit-card-expiry-value": string;
  "credit-card-type"?: string;
}

export type CreditCardErrors = {
  "credit-card-number"?: string[] | undefined;
  "credit-card-expiry"?: string[] | undefined;
  "credit-card-cvc"?: string[] | undefined;
  "credit-card-type"?: string[] | undefined;
};

export type CreditCardPaymentDataResponse =
  | CheckoutPaymentDataValues[]
  | { errors: CreditCardErrors };

export type CriptoCurrencyTypes = "BTC" | "ETH" | "USDT_ERC20" | "XRP";
