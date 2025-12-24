"use client";

import { FC, useMemo } from "react";
import {
  AffiliateChartViewBy,
  AffiliateSaleChartData,
} from "@/types/affiliates";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import moment from "moment";
import ChartHeader from "../Widgets/ChartHeader";
import SalesChart from "./SalesChart";
interface SalesChartWrapperProps {
  startDate: Date | null;
  endDate: Date | null;
}

const SalesChartWrapper: FC<SalesChartWrapperProps> = ({
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

  const { data: chartData, isLoading } = useSWR<AffiliateSaleChartData>(
    `/api/affiliate/sales_chart?${queryParams.toString()}`,
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
      <SalesChart
        viewBy={viewBy}
        chartData={chartData ?? []}
        isLoading={isLoading}
      />
    </>
  );
};

export default SalesChartWrapper;
