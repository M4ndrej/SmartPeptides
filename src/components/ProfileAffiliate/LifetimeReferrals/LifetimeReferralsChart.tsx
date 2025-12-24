import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../Widgets/CustomTooltip";
import CustomLegend from "../Widgets/CustomLegend";
import Spinner from "@/components/SvgComponents/Spinner";
import {
  affiliateCustomersChartLabels,
  affiliateTickStyles,
} from "@/data/affiliate";
import { formatCurrency } from "@/helpers/curency_format";
import { AffiliateCustomer } from "@/types/affiliates";

interface LifetimeReferralsChartProps {
  viewBy: string;
  chartData: AffiliateCustomer[];
  isLoading: boolean;
}

const LifetimeReferralsChart: FC<LifetimeReferralsChartProps> = ({
  viewBy,
  chartData,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Spinner widthHeight="h-8 w-8" />
      </div>
    );
  }

  if (!chartData?.length) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center">
        No records found for the date range selected.
      </div>
    );
  }

  return (
    <ResponsiveContainer height={350}>
      <BarChart
        layout="vertical"
        height={350}
        data={chartData}
        stackOffset="sign"
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="4 2"
          horizontal={false}
          stroke="#F2F2F2"
          strokeWidth={1}
        />
        <XAxis
          type="number"
          height={20}
          axisLine={false}
          tickLine={false}
          domain={([min, max]) => {
            const mod = viewBy == "Earnings" ? 50 : 5;
            return [Math.floor(min / mod) * mod, Math.ceil(max / mod) * mod];
          }}
          scale="linear"
          interval="preserveStartEnd"
          tickFormatter={(val) =>
            viewBy == "Earnings"
              ? formatCurrency(val as number, true, false)
              : val
          }
          tick={affiliateTickStyles}
        />
        <YAxis
          width={100}
          dataKey="full_name"
          type="category"
          axisLine={false}
          tickLine={false}
          tick={affiliateTickStyles}
        />
        <Tooltip
          cursor={{ fill: "#EEF7FF55" }}
          content={<CustomTooltip />}
          formatter={(val) =>
            viewBy == "Earnings"
              ? formatCurrency(val as number, true, false)
              : val
          }
        />
        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomLegend />}
          formatter={(label) => affiliateCustomersChartLabels[label]}
        />
        <Bar
          dataKey={viewBy == "Earnings" ? "earned" : "sales"}
          stackId="a"
          fill="#8EC5F2"
          maxBarSize={14}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LifetimeReferralsChart;
