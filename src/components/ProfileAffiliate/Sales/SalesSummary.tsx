import SummarySection from "../Widgets/SummarySection";
import {
  AffiliateSalesSummary,
  AffiliateSummaryEntry,
} from "@/types/affiliates";
import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";

interface SalesSummaryProps {
  fromDate?: string;
  summary?: AffiliateSalesSummary;
  isLoading?: boolean;
}

const SalesSummary: FC<SalesSummaryProps> = ({
  fromDate,
  summary,
  isLoading,
}) => {
  const summaryData: AffiliateSummaryEntry[] = [
    { name: "Transaction(s)", value: summary?.total },
    {
      name: "Refunded",
      value: formatCurrency(summary?.total_refunded ?? 0, true, false),
    },
    {
      name: "Total lost",
      value: formatCurrency(summary?.lost ?? 0, true, false),
    },
    {
      name: "Total sales",
      value: formatCurrency(summary?.total_sales ?? 0, true, false),
    },
    {
      name: "Total earned",
      value: formatCurrency(summary?.earned ?? 0, true, false),
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

export default SalesSummary;
