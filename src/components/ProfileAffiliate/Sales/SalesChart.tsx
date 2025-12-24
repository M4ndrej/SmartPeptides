import Spinner from "@/components/SvgComponents/Spinner";
import {
  affiliateSalesChartLabels,
  affiliateTickStyles,
} from "@/data/affiliate";
import { formatCurrency } from "@/helpers/curency_format";
import { getMonthName } from "@/helpers/date_time_helper";
import {
  AffiliateChartViewBy,
  AffiliateSaleChartData,
} from "@/types/affiliates";
import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomLegend from "../Widgets/CustomLegend";
import CustomTooltip from "../Widgets/CustomTooltip";
interface SalesChartProps {
  viewBy: AffiliateChartViewBy;
  chartData: AffiliateSaleChartData;
  isLoading: boolean;
}

const SalesChart: FC<SalesChartProps> = ({ viewBy, chartData, isLoading }) => {
  const moddedData = chartData.map((item) => ({
    ...item,
    total_transactions: item.total_transactions * 750,
  }));

  const formatChartXAxis = (val: any) => {
    if (viewBy == "Month") return getMonthName(val);
    if (viewBy == "Day") return val + ".";
    if (viewBy == "Hour") return val + ":00";
    return val;
  };

  const tooltipFormatter = (val: string | number, name: string) => {
    if (name === "total_transactions")
      return `Orders - ${Math.floor(+val / 750)}`;
    return formatCurrency(val as number, true, true);
  };

  if (isLoading) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Spinner widthHeight="h-8 w-8" />
      </div>
    );
  }

  if (!moddedData?.find((item) => item.total_transactions !== 0)) {
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
        data={moddedData}
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
          tickFormatter={(val) => formatCurrency(val, true, true, false)}
          tick={affiliateTickStyles}
        />
        <Tooltip
          cursor={{ fill: "#EEF7FF55" }}
          content={<CustomTooltip />}
          formatter={tooltipFormatter}
          labelFormatter={formatChartXAxis}
        />
        <Legend
          verticalAlign="top"
          align="right"
          content={<CustomLegend />}
          formatter={(label) => affiliateSalesChartLabels[label]}
        />
        <ReferenceLine y={0} stroke="#F2F2F2" strokeWidth={1} />
        <Bar dataKey="total_sales" stackId="a" fill="#8EC5F2" maxBarSize={24} />
        <Bar
          dataKey="total_amount"
          stackId="a"
          fill="#E8F4FF"
          maxBarSize={24}
          minPointSize={1}
        />
        <Bar
          dataKey="total_refund"
          stackId="a"
          fill="#E3E3E3"
          maxBarSize={24}
          minPointSize={1}
        />
        <Bar
          dataKey="total_transactions"
          stackId="b"
          fill="#22659C"
          maxBarSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
