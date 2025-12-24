"use client";

import SummarySection from "../Widgets/SummarySection";
import {
  AffiliateBonusesSummary,
  AffiliateSummaryEntry,
} from "@/types/affiliates";
import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";

interface SalesSummaryProps {
  summary?: AffiliateBonusesSummary;
  fromDate?: string;
  isLoading?: boolean;
}

const BonusesSummary: FC<SalesSummaryProps> = ({
  fromDate,
  summary,
  isLoading,
}) => {
  const summaryData: AffiliateSummaryEntry[] = [
    { name: "Number of bonuses:", value: summary?.total },
    {
      name: "Total awarded amount:",
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

export default BonusesSummary;
