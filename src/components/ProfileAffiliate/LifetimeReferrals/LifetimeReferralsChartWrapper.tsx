"use client";
import { FC, useMemo, useState } from "react";
import { AffiliateCustomerList } from "@/types/affiliates";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import ChartHeader from "../Widgets/ChartHeader";
import LifetimeReferralsChart from "./LifetimeReferralsChart";

interface LifettimeReferralsChartWrapperProps {
  startDate: Date | null;
  endDate: Date | null;
}

const LifettimeReferralsChartWrapper: FC<
  LifettimeReferralsChartWrapperProps
> = ({ startDate, endDate }) => {
  const [viewBy, setViewBy] = useState("Sales");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("paginate", "10");
    params.set("page", "0");
    params.set("order_dir", "DESC");
    if (viewBy === "Earnings") {
      params.set("order_by", "earned");
    }
    if (viewBy === "Sales") {
      params.set("order_by", "sales");
    }
    if (startDate && endDate) {
      params.set("date_from", startDate.toISOString());
      params.set("date_to", endDate.toISOString());
    }
    return params;
  }, [startDate, endDate, viewBy]);

  const { data: chartData, isLoading } = useSWR<AffiliateCustomerList>(
    `/api/affiliate/lifetime_customers?${queryParams.toString()}`,
    fetcher
  );

  const items = chartData?.items
    ? chartData.items.filter((i) => i.sales > 0)
    : [];

  return (
    <>
      <ChartHeader
        views={["Sales", "Earnings"]}
        viewBy={viewBy}
        setViewBy={setViewBy}
        startDate={startDate}
        endDate={endDate}
      />
      <LifetimeReferralsChart
        viewBy={viewBy}
        chartData={items}
        isLoading={isLoading}
      />
    </>
  );
};

export default LifettimeReferralsChartWrapper;
