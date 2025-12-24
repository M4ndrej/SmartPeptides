"use client";

import { FC, useMemo, useState } from "react";
import {
  AffiliateSaleList,
  AffiliateSalesSummary,
  Sort,
} from "@/types/affiliates";
import TimeFilters from "../Widgets/TimeFilters";
import ViewToggle from "../Widgets/ViewToggle";
import SalesTable from "./SalesTable";
import SalesSummary from "./SalesSummary";
import TableSearch from "../Widgets/TableSearch";
import { fetcher } from "@/helpers/fetchers";
import useSWR from "swr";
import useStickyValue from "@/hooks/useStickyValue";
import SalesChartWrapper from "./SalesChartWrapper";
import { useAffiliateContext } from "../AffiliateContext";

interface AffiliateSalesProps {
  salesSummary?: AffiliateSalesSummary;
}

const AffiliateSales: FC<AffiliateSalesProps> = ({ salesSummary }) => {
  const { affiliateInfo } = useAffiliateContext();

  const [view, setView] = useState("List");
  const [sort, setSort] = useState<Sort>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(0);
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

  const { data: salesPre, isLoading } = useSWR<AffiliateSaleList>(
    `/api/affiliate/sales?${queryParams.toString()}`,
    fetcher
  );
  const sales = useStickyValue(salesPre);

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <SalesSummary
        fromDate={affiliateInfo?.affiliate?.date_created}
        summary={salesSummary}
      />
      <TimeFilters
        minDate={(affiliateInfo?.affiliate?.date_created ?? "").slice(0, 10)}
        maxDate={new Date().toISOString().slice(0, 10)}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPage={setPage}
        className="mb-4"
      />
      <div className="mb-4 flex items-center justify-between gap-4 sm:flex-col-reverse sm:items-start">
        <ViewToggle selectedView={view} setSelectedView={setView} />
        {view === "List" && <TableSearch onSearch={setSearch} />}
      </div>
      {view === "List" ? (
        <SalesTable
          sales={sales}
          isLoading={isLoading}
          sort={sort}
          setSort={setSort}
          page={page}
          setPage={setPage}
        />
      ) : (
        <SalesChartWrapper startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default AffiliateSales;
