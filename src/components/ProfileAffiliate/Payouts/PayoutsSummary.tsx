"use client";

import SummarySection from "../Widgets/SummarySection";
import {
  AffiliatePayoutsSummary,
  AffiliateSummaryEntry,
} from "@/types/affiliates";
import { FC, useMemo } from "react";
import { formatCurrency } from "@/helpers/curency_format";

interface SalesSummaryProps {
  summary?: AffiliatePayoutsSummary;
  fromDate?: string;
  isLoading?: boolean;
}

const PayoutsSummary: FC<SalesSummaryProps> = ({
  fromDate,
  summary,
  isLoading,
}) => {
  const summaryData: AffiliateSummaryEntry[] = [
    { name: "Number of payouts:", value: summary?.total },
    {
      name: "Total amount:",
      value: formatCurrency(summary?.total_amount ?? 0, true, false),
      isBold: true,
    },
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

export default PayoutsSummary;
