import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formatCurrency } from "@/helpers/curency_format";
import {
  AffiliateChartViewBy,
  AffiliatePayoutChartData,
} from "@/types/affiliates";
import Spinner from "@/components/SvgComponents/Spinner";
import CustomTooltip from "../Widgets/CustomTooltip";
import CustomLegend from "../Widgets/CustomLegend";
import { getMonthName } from "@/helpers/date_time_helper";
import {
  affiliatePayoutsChartLabels,
  affiliateTickStyles,
} from "@/data/affiliate";

interface PayoutsChartProps {
  viewBy: AffiliateChartViewBy;
  chartData: AffiliatePayoutChartData;
  isLoading: boolean;
}

const PayoutsChart: FC<PayoutsChartProps> = ({
  viewBy,
  chartData,
  isLoading,
}) => {
  const formatChartXAxis = (val: any) => {
    if (viewBy == "Month") return getMonthName(val);
    if (viewBy == "Day") return val + ".";
    if (viewBy == "Hour") return val + ":00";
    return val;
  };

  if (isLoading) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Spinner widthHeight="h-8 w-8" />
      </div>
    );
  }

  if (!chartData?.find((item) => item.total_transactions !== 0)) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        No records found for the date range selected.
      </div>
    );
  }

  return (
    <ResponsiveContainer height={320}>
      <BarChart
        height={320}
        data={chartData}
        stackOffset="sign"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="4 2"
          vertical={false}
          stroke="#F2F2F2"
          strokeWidth={1}
        />
        <XAxis
          dataKey={viewBy.toLowerCase()}
          height={20}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatChartXAxis}
          tick={affiliateTickStyles}
        />
        <YAxis
          type="number"
          domain={([min, max]) => [
            Math.floor(min / 100) * 100,
            Math.ceil(max / 100) * 100,
          ]}
          scale="linear"
          interval="preserveStartEnd"
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => formatCurrency(val, true, true)}
          tick={affiliateTickStyles}
        />
        <Tooltip
          cursor={{ fill: "#EEF7FF55" }}
          content={<CustomTooltip />}
          formatter={(val) => formatCurrency(val as number, true, true)}
          labelFormatter={formatChartXAxis}
        />
        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomLegend />}
          formatter={(label) => affiliatePayoutsChartLabels[label]}
        />
        <ReferenceLine y={0} stroke="#F2F2F2" strokeWidth={1} />
        <Bar
          dataKey="total_payout"
          stackId="a"
          fill="#8EC5F2"
          maxBarSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PayoutsChart;
