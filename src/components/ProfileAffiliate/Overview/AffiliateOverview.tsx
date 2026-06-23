"use client";

import { FC, useState } from "react";
import { AffiliateSummaryEntry, AffliateOverview } from "@/types/affiliates";
import classNames from "classnames";
import { formatDateSlash } from "@/helpers/date_format";
import { columns, rows } from "@/data/affiliate_overview_data";
import { formatCurrency } from "@/helpers/curency_format";
import SummarySection from "../Widgets/SummarySection";
import { useAffiliateContext } from "../AffiliateContext";

interface AffiliateOverviewProps {
  overview?: AffliateOverview;
}

const AffiliateOverview: FC<AffiliateOverviewProps> = ({ overview }) => {
  const { affiliateInfo } = useAffiliateContext();
  const [activeTab, setActiveTab] = useState("today");

  const summaryData: AffiliateSummaryEntry[] = [
    {
      name: "Total payout",
      value: formatCurrency(overview?.overview?.total_amount ?? 0, true, false),
    },
    { name: "Number of payouts", value: overview?.overview?.total },
    {
      name: `Last payout (${overview?.last_payout?.date_created ? formatDateSlash(overview.last_payout.date_created) : "--/--/----"})`,
      value: formatCurrency(overview?.last_payout?.amount ?? 0, true, false),
    },
    {
      name: "Commission Rate (pre-tax & shipping, post discount)",
      value: "10%",
    },
  ];

  const formatCell = (key: string, val?: number) => {
    if (["total_revenue", "total_amount"].includes(key) && val) {
      return formatCurrency(val, true, false);
    }
    return val ?? "--";
  };

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <SummarySection
        title="Account Summary"
        data={summaryData}
        fromDate={affiliateInfo?.affiliate?.date_created}
      />

      {/* Overview table */}
      <div className="flex w-full flex-col overflow-auto">
        {/* Table header */}
        <div className="grid grid-cols-5 items-center justify-end rounded-t-[5px] bg-lightgray py-[15px] sm:grid-cols-4">
          <div className="sm:hidden"></div>
          {columns.map((col) => (
            <div
              key={col.title}
              onClick={() => setActiveTab(col.key)}
              className={classNames({
                "overview-table-cell-right-text-align pointer-events-none text-gray2 sm:pointer-events-auto sm:text-center":
                  true,
                "sm:font-bold sm:text-[#333333]": activeTab === col.key,
              })}
            >
              {col.title}
            </div>
          ))}
        </div>
        {/* Table data rows */}
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-5 items-center pb-[8px] pt-[16px] sm:grid-cols-2"
          >
            <div className="overview-table-cell-left-text-align sm:!max-w-full">
              {row.title}
            </div>
            {columns.map((col) => (
              <div
                key={col.key}
                className={classNames(
                  "overview-table-cell-right-text-align sm:!max-w-full",
                  activeTab !== col.key && "sm:hidden"
                )}
              >
                {formatCell(row.key, overview?.payouts?.[row.key]?.[col.key])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateOverview;
