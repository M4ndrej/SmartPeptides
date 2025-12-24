import { FC } from "react";
import { Props } from "recharts/types/component/DefaultLegendContent";

const CustomLegend: FC<Props> = ({ payload, formatter }) => {
  return (
    <div className="mb-1 flex h-6 w-full items-center justify-end gap-6">
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-D12px-M11px">
            {formatter?.(entry?.value ?? "", entry, index) ?? entry?.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
