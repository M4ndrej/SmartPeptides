"use client";

import { FC, useMemo } from "react";
import SummarySection from "../Widgets/SummarySection";
import useSWR from "swr";
import {
  AffiliateCustomersSummary,
  AffiliateSummaryEntry,
} from "@/types/affiliates";
import { fetcher } from "@/helpers/fetchers";

interface CustomersSummaryProps {
  fromDate?: string;
  summary?: AffiliateCustomersSummary;
  isLoading?: boolean;
}

const CustomersSummary: FC<CustomersSummaryProps> = ({
  fromDate,
  summary,
  isLoading,
}) => {
  const summaryData: AffiliateSummaryEntry[] = [
    { name: "Number of customers:", value: summary?.total },
    { name: "Single order customers:", value: summary?.single_order },
    { name: "Repeat customers:", value: summary?.repeat_order },
  ];

  return (
    <SummarySection
      title="Summary"
      data={summaryData}
      isLoading={isLoading}
      fromDate={fromDate}
    />
  );
};

export default CustomersSummary;
