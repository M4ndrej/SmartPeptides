import { FC } from "react";
import { TooltipProps } from "recharts";

const CustomTooltip: FC<TooltipProps<string | number, string>> = ({
  payload,
  label,
  formatter,
  labelFormatter,
}) => {
  return (
    <div className="min-w-32 rounded-[5px] bg-white p-4 shadow-globalShadow">
      <div className="font-D16px-M13px mb-2 font-bold text-darkgray">
        {labelFormatter?.(label, payload ?? []) ?? label}
      </div>
      <ul className="flex flex-col items-start justify-center gap-4">
        {payload?.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="flex w-full items-center justify-start gap-2"
          >
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-D12px-M11px">
              {formatter?.(
                entry?.value ?? "",
                entry?.name ?? "",
                entry,
                index,
                payload
              ) ?? entry?.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomTooltip;
