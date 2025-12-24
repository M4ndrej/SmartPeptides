import React from "react";
import { Range } from "react-range";
import { formatCurrency } from "@/helpers/curency_format";
import { getPercentage } from "@/helpers/percentage_helper";

interface PriceRangeFilterProps {
  range: number[];
  minPrice: number;
  maxPrice: number;
  onRangeChange: (values: number[]) => void;
  onFinalChange: (values: number[]) => void;
  isMobile?: boolean;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  range,
  minPrice,
  maxPrice,
  onRangeChange,
  onFinalChange,
  isMobile = false,
}) => {
  return (
    <div className="flex items-center gap-x-[24px] sm:h-[100%] sm:w-[100%] sm:flex-col sm:items-start sm:justify-between md:h-[100%] md:w-[100%] md:flex-col md:items-start md:justify-between">
      <div className="sm:hidden md:hidden">Price:</div>
      <div className="flex w-[183px] items-center gap-x-[8px] sm:order-2 md:order-2">
        <div>{formatCurrency(range[0], true, true)}</div> -
        <div>{formatCurrency(range[1], true, true)}</div>
      </div>

      <div className="w-[441px] sm:order-1 sm:w-[100%] sm:p-[6px] md:order-1 md:w-[100%] md:p-[6px]">
        <Range
          step={5}
          min={minPrice}
          max={maxPrice}
          values={range}
          onChange={onRangeChange}
          onFinalChange={onFinalChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: isMobile ? "2px" : "6px",
                width: "100%",
                background: `linear-gradient(
                  to right,
                  #e0e0e0 0% ${getPercentage(maxPrice, range[0])}%,
                  #FE3520 ${getPercentage(maxPrice, range[0])}%,
                  #FE8410 ${getPercentage(maxPrice, range[1])}%,
                  #e0e0e0 ${getPercentage(maxPrice, range[1])}% 100%
                )`,

                borderRadius: "5px",
              }}
              key={1}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: isMobile ? "12px" : "16px",
                width: isMobile ? "12px" : "16px",
                borderRadius: "100%",
                backgroundColor: "#fff",
                border: isMobile ? `2px solid #FE3520` : `3px solid #FE3520`,
                outline: "none",
              }}
              key={props.key}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
