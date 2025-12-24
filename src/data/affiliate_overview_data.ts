import {
  AffiliateOverviewColumnKey,
  AffiliateOverviewRowKey,
} from "@/types/affiliates";

export const columns: {
  key: AffiliateOverviewColumnKey;
  title: string;
}[] = [
  {
    key: "today",
    title: "Today",
  },
  {
    key: "month",
    title: "MTD",
  },
  {
    key: "year",
    title: "YTD",
  },
  {
    key: "all_time",
    title: "All Time",
  },
];

export const rows: {
  key: AffiliateOverviewRowKey;
  title: string;
}[] = [
  {
    key: "visitors",
    title: "Visitors",
  },
  {
    key: "total",
    title: "Closed transactions",
  },
  {
    key: "total_revenue",
    title: "Total revenue",
  },
  {
    key: "total_amount",
    title: "Earned commission",
  },
];
