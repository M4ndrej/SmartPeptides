export type AffiliateChartViewBy = "Hour" | "Day" | "Month" | "Year";

export type AvailablePaymentMethods =
  | "store_credit"
  | "ach"
  | "cashapp"
  | "zelle";
export type AffiliatePaymentMethod = {
  key: AvailablePaymentMethods;
  title: string;
  height: number;
};

export type Affiliate = {
  id: number;
  user_id: number;
  name: string;
  address: string;
  standing: number;
  account_holder_name: string;
  account_number: string;
  routing_number: string;
  cash_app_name: string;
  cash_app_tag: string;
  zelle_name: string;
  zelle_email: string;
  zelle_phone: string;
  date_created: string;
};

export type AffiliateFormDataField =
  | keyof Omit<Affiliate, "id" | "user_id" | "date_created" | "standing">
  | "payment_method";
export type AffiliateFormData = {
  [key in AffiliateFormDataField]: string;
};
export type AffiliateFormErrors = {
  [key in AffiliateFormDataField]?: string[];
};

export type Creative = {
  creative_id: number;
  date_created: string;
  status: string;
  name: string;
  type: string;
  alt_text: string;
  image_post_id: number;
  link_text: string;
  slug: string;
  image: string;
};

export type AffiliateInfo = {
  affiliate: Affiliate;
  creative: Creative;
  share_link: string;
};

export type AffiliateOverviewColumnKey =
  | "today"
  | "month"
  | "year"
  | "all_time";
export type AffiliateOverviewRowKey =
  | "total"
  | "total_amount"
  | "total_revenue"
  | "visitors";

export type AffiliateOverviewColumn = {
  [key in AffiliateOverviewColumnKey]: number;
};

export type AffiliateSummaryEntry = {
  name: string;
  value?: string | number;
  isBold?: boolean;
};

export type AffliateOverview = {
  overview: {
    total: number;
    total_amount: number;
  };
  last_payout: {
    date_created: string;
    amount: number;
  };
  payouts: {
    [key in AffiliateOverviewRowKey]: AffiliateOverviewColumn;
  };
};

export type Sort = {
  key: string;
  direction: "ASC" | "DESC";
};

export type PaginatedResponse<T> = {
  page: number;
  paginate: number;
  total: number;
  total_pages: number;
  items: T[];
};

export type AffiliateSalesSummary = {
  total: number;
  earned: number;
  lost: number;
  total_sales: number;
  total_refunded: number;
};

export type AffiliateSale = {
  id: number;
  date_modified: string;
  date_created: string;
  reference_id: number;
  amount: number;
  description: string;
  type: string;
  status: string;
  email: string;
  user: {
    id: number | null;
    email: string;
    full_name: string;
  };
  order: {
    id: number;
    title: string;
    total: number;
    shipping: number;
    tax: number;
    discount: number;
    payment_method: string;
    payment_method_title: string;
  };
};

export type AffiliateSaleList = PaginatedResponse<AffiliateSale>;

export type AffiliateSaleChartEntry = {
  total_amount: number;
  total_refund: number;
  total_sales: number;
  total_transactions: number;
  year: number;
  month?: number;
  day?: number;
  hour?: number;
};

export type AffiliateSaleChartData = AffiliateSaleChartEntry[];

export type AffiliateCustomersSummary = {
  total: number;
  single_order: number;
  repeat_order: number;
};

export type AffiliateLifetimeCustomersSummary = {
  total: number;
  no_order: number;
  single_order: number;
  repeat_order: number;
};

export type AffiliateCustomer = {
  id: number | null;
  email: string;
  display_name: string;
  full_name: string;
  join_date: string | null;
  earned: number;
  sales: number;
  total_revenue: number;
};

export type AffiliateCustomerList = PaginatedResponse<AffiliateCustomer>;

export type AffiliatePayoutsSummary = {
  total: number;
  total_amount: number;
};

export type AffiliatePayout = {
  id: number;
  date_modified: string;
  date_created: string;
  amount: number;
  status: string;
};

export type AffiliatePayoutList = PaginatedResponse<AffiliatePayout>;

export type AffiliatePayoutChartEntry = {
  total_payout: number;
  total_transactions: number;
  year: number;
  month?: number;
  day?: number;
  hour?: number;
};

export type AffiliatePayoutChartData = AffiliatePayoutChartEntry[];

export type AffiliateBonusesSummary = {
  total: number;
  total_amount: number;
};

export type AffiliateBonus = {
  id: number;
  date_modified: string;
  date_created: string;
  description: string;
  amount: number;
  status: string;
  type: string;
  email: string;
};

export type AffiliateBonusList = PaginatedResponse<AffiliateBonus>;

export type AffiliateCreative = {
  id: number;
  date_created: string;
  status: string;
  name: string;
  type: string;
  alt_text: string;
  image_post_id: number | null;
  link_text: string;
  slug: string;
  image: string;
};

export interface AffiliateSalesData {
  viewData: {
    from: string;
    to: string;
    transactions: {
      transactionId: string;
      dateModified: number;
      dateCreated: number;
      affiliateId: string;
      referenceId: string;
      amount: string;
      description: string;
      type: string;
      status: string;
      email: string;
      balance: null;
    }[];
    showBalance: false;
  };
}

export interface AffiliatePaymentData {
  viewData: {
    from: string;
    to: string;
    transactions: {
      transactionId: string;
      dateModified: number;
      dateCreated: number;
      affiliateId: string;
      referenceId: string;
      amount: string;
      description: string;
      type: string;
      status: string;
      email: string;
      balance: null;
    }[];
    showBalance: false;
  };
}

export interface AffiliateCreatives {
  viewData: ViewData;
}

export interface ViewData {
  affiliate: AffiliateOld;
  creative: Creative;
  sharelink: string;
}

export interface AffiliateOld {
  affiliateId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  addressCountry: string;
  status: string;
  websiteUrl: string;
  companyName: string;
  dateCreated: number;
  uniqueRefKey: string;
  nameOnCheck: any;
  paypalEmail: string;
  bankDetails: string;
  paymentMethod: string;
  bountyType: string;
  bountyAmount: string;
  phoneNumber: string;
  userData: any[];
}

export type AffiliateScreens =
  | "overview"
  | "sales"
  | "payments"
  | "creatives"
  | "profile";
