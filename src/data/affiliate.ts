import { AffiliatePaymentMethod } from "@/types/affiliates";

export const affiliatePaymentMethods: AffiliatePaymentMethod[] = [
  {
    key: "store_credit",
    title: "Store Credit",
    height: 0,
  },
  {
    key: "ach",
    title: "ACH",
    height: 120,
  },
  {
    key: "cashapp",
    title: "Cash App",
    height: 120,
  },
  {
    key: "zelle",
    title: "Zelle",
    height: 160,
  },
];

export const affiliateProfileTabs = [
  {
    id: 1,
    name: "Overview",
    link: "/profile/affiliate/",
  },
  {
    id: 2,
    name: "Earnings",
    link: "/profile/affiliate/earnings/",
  },
  {
    id: 3,
    name: "Referrals",
    link: "/profile/affiliate/referrals/",
  },
  {
    id: 4,
    name: "Lifetime Ref.",
    link: "/profile/affiliate/lifetime_referrals/",
  },
  {
    id: 5,
    name: "Payouts",
    link: "/profile/affiliate/payouts/",
  },
  {
    id: 6,
    name: "Bonuses",
    link: "/profile/affiliate/bonuses/",
  },
  // {
  //   id: 7,
  //   name: "Creatives",
  //   link: "/profile/affiliate/creatives/",
  // },
  {
    id: 8,
    name: "Edit Profile",
    link: "/profile/affiliate/edit/",
  },
];

export const affiliateSalesChartLabels: Record<string, string> = {
  total_transactions: "Orders",
  total_sales: "Sales",
  total_amount: "Commission",
  total_refund: "Refund",
};

export const affiliatePayoutsChartLabels: Record<string, string> = {
  total_payout: "Payouts",
};

export const affiliateCustomersChartLabels: Record<string, string> = {
  earned: "Earned",
  sales: "Sales",
};

export const affiliateTickStyles = {
  fontFamily: "inherit",
  fontSize: 11,
  fontStyle: "normal",
  fill: "#999999",
};
