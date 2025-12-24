"use client";

import { FC } from "react";
import SummarySection from "../Widgets/SummarySection";
import {
  AffiliateLifetimeCustomersSummary,
  AffiliateSummaryEntry,
} from "@/types/affiliates";

interface LifetimeReferralsSummaryProps {
  fromDate?: string;
  summary?: AffiliateLifetimeCustomersSummary;
  isLoading?: boolean;
}

const LifetimeReferralsSummary: FC<LifetimeReferralsSummaryProps> = ({
  fromDate,
  summary,
  isLoading,
}) => {
  const summaryData: AffiliateSummaryEntry[] = [
    { name: "Number of lifetime customers:", value: summary?.total },
    { name: "No order lifetime customers:", value: summary?.no_order },
    { name: "Single order lifetime customers:", value: summary?.single_order },
    { name: "Repeat lifetime customers:", value: summary?.repeat_order },
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

export default LifetimeReferralsSummary;
