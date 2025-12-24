"use client";

import { FC, useMemo, useState } from "react";
import {
  AffiliatePayoutList,
  AffiliatePayoutsSummary,
  Sort,
} from "@/types/affiliates";
import TimeFilters from "../Widgets/TimeFilters";
import PayoutsTable from "./PayoutsTable";
import PayoutsSummary from "./PayoutsSummary";
import ViewToggle from "../Widgets/ViewToggle";
import TableSearch from "../Widgets/TableSearch";
import { fetcher } from "@/helpers/fetchers";
import useSWR from "swr";
import useStickyValue from "@/hooks/useStickyValue";
import PayoutsChartWrapper from "./PayoutsChartWrapper";
import { useAffiliateContext } from "../AffiliateContext";
import PayoutsCashOut from "./PayoutsCashOut";

interface AffiliatePayoutsProps {
  payoutsSummary?: AffiliatePayoutsSummary;
}

const AffiliatePayouts: FC<AffiliatePayoutsProps> = ({ payoutsSummary }) => {
  const { affiliateInfo } = useAffiliateContext();

  const [view, setView] = useState("List");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<Sort>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (sort) {
      params.set("order_by", sort.key);
      params.set("order_dir", sort.direction);
    }
    if (page) {
      params.set("page", page.toString());
    }
    if (startDate && endDate) {
      params.set("date_from", startDate.toISOString());
      params.set("date_to", endDate.toISOString());
    }
    if (search) {
      params.set("search", search);
    }
    return params;
  }, [page, sort, startDate, endDate, search]);

  const { data: payoutsPre, isLoading } = useSWR<AffiliatePayoutList>(
    `/api/affiliate/payouts?${queryParams.toString()}`,
    fetcher
  );
  const payouts = useStickyValue(payoutsPre);

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <PayoutsSummary
        fromDate={affiliateInfo?.affiliate?.date_created}
        summary={payoutsSummary}
      />
      <PayoutsCashOut />
      <TimeFilters
        minDate={(affiliateInfo?.affiliate?.date_created ?? "").slice(0, 10)}
        maxDate={new Date().toISOString().slice(0, 10)}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPage={setPage}
        className="mb-4"
      />
      <div className="mb-4 flex items-center justify-between gap-4 sm:flex-col-reverse sm:items-start">
        <ViewToggle
          selectedView={view}
          setSelectedView={setView}
          views={["List", "Chart"]}
        />
        {view === "List" && (
          <TableSearch label="Search payout ID" onSearch={setSearch} />
        )}
      </div>
      {view === "List" ? (
        <PayoutsTable
          payouts={payouts}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
        />
      ) : (
        <PayoutsChartWrapper startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default AffiliatePayouts;
