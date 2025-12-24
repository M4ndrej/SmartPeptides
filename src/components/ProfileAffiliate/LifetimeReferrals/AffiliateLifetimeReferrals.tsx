"use client";
import { FC, useMemo, useState } from "react";
import {
  AffiliateCustomerList,
  AffiliateLifetimeCustomersSummary,
  Sort,
} from "@/types/affiliates";
import TimeFilters from "../Widgets/TimeFilters";
import LifetimeReferralsTable from "./LifetimeReferralsTable";
import LifetimeReferralsSummary from "./LifetimeReferralsSummary";
import ViewToggle from "../Widgets/ViewToggle";
import TableSearch from "../Widgets/TableSearch";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import useStickyValue from "@/hooks/useStickyValue";
import LifetimeReferralsChartWrapper from "./LifetimeReferralsChartWrapper";
import { useAffiliateContext } from "../AffiliateContext";

interface AffiliateLifetimeReferralsProps {
  lifetimeReferralsSummary?: AffiliateLifetimeCustomersSummary;
}

const AffiliateLifetimeReferrals: FC<AffiliateLifetimeReferralsProps> = ({
  lifetimeReferralsSummary,
}) => {
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

  const { data: lifetimeCustomersPre, isLoading } =
    useSWR<AffiliateCustomerList>(
      `/api/affiliate/lifetime_customers?${queryParams.toString()}`,
      fetcher
    );
  const lifetimeCustomers = useStickyValue(lifetimeCustomersPre);

  return (
    <div className="m-[auto] w-[100%] max-w-[1264px] sm:max-w-[100vw] md:max-w-[100vw]">
      <LifetimeReferralsSummary
        fromDate={affiliateInfo?.affiliate?.date_created}
        summary={lifetimeReferralsSummary}
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
        <ViewToggle
          selectedView={view}
          setSelectedView={setView}
          views={["List", "Chart"]}
        />
        {view === "List" && <TableSearch onSearch={setSearch} />}
      </div>
      {view === "List" ? (
        <LifetimeReferralsTable
          customers={lifetimeCustomers}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          setSort={setSort}
          sort={sort}
        />
      ) : (
        <LifetimeReferralsChartWrapper
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
};

export default AffiliateLifetimeReferrals;
