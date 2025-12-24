import { useThemeContext } from "@/context/theme-provider";
import { FC, useEffect, useState } from "react";
import { Range } from "react-range";

type RangeInputProps = {
  value?: number;
  isDisabled?: boolean;
};

const RangeInput: FC<RangeInputProps> = ({ value = 0, isDisabled }) => {
  const [range, hangleRange] = useState([value]);
  const rangeChange = (event: any) => {
    hangleRange(event);
  };

  useEffect(() => {
    hangleRange([value]);
  }, [value]);

  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;

  return (
    <Range
      disabled={isDisabled}
      step={0.1}
      min={0}
      max={100}
      values={range}
      onChange={(values) => rangeChange(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            background: `linear-gradient(to right, ${
              value === 100 ? "#00CD2C" : "#E7461E"
            } ${range[0]}%,${!isDark ? "#F8F8F8" : "#434343"}  ${range[0]}%)`,
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
            height: "16px",
            width: "16px",
            borderRadius: "100%",
            backgroundColor: "#fff",
            border: `3px solid ${value === 100 ? "#00CD2C" : "#E7461E"}`,
          }}
          key={1}
        />
      )}
    />
  );
};

export default RangeInput;
