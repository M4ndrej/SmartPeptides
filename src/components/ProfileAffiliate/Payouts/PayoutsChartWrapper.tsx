"use client";

import { FC, useMemo } from "react";
import {
  AffiliateChartViewBy,
  AffiliatePayoutChartData,
} from "@/types/affiliates";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import moment from "moment";
import ChartHeader from "../Widgets/ChartHeader";
import PayoutsChart from "./PayoutsChart";
interface PayoutsChartWrapperProps {
  startDate: Date | null;
  endDate: Date | null;
}

const PayoutsChartWrapper: FC<PayoutsChartWrapperProps> = ({
  startDate,
  endDate,
}) => {
  const viewByDate: Record<AffiliateChartViewBy, number> = {
    Year: 720,
    Month: 31,
    Day: 1,
    Hour: 0,
  };

  const viewBy: AffiliateChartViewBy = useMemo(() => {
    if (!startDate || !endDate) return "Month";
    const diff = Math.abs(startDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    for (let key in viewByDate) {
      if (diffDays > viewByDate[key as AffiliateChartViewBy]) {
        return key as AffiliateChartViewBy;
      }
    }
    return "Hour";
  }, [startDate, endDate]);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    const offset = moment().format("Z");
    params.set("offset", offset);
    if (startDate && endDate) {
      params.set("date_from", startDate.toISOString());
      params.set("date_to", endDate.toISOString());
    }
    if (viewBy) {
      params.set("view_by", viewBy.toLowerCase());
    }
    return params;
  }, [startDate, endDate]);

  const { data: chartData, isLoading } = useSWR<AffiliatePayoutChartData>(
    `/api/affiliate/payouts_chart?${queryParams.toString()}`,
    fetcher
  );

  return (
    <>
      <ChartHeader
        views={[viewBy]}
        viewBy={viewBy}
        startDate={startDate}
        endDate={endDate}
      />
      <PayoutsChart
        viewBy={viewBy}
        chartData={chartData ?? []}
        isLoading={isLoading}
      />
    </>
  );
};

export default PayoutsChartWrapper;
