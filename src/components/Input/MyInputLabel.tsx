"use client";

import classNames from "classnames";
import { FC, useMemo } from "react";

function measureText(text: string, fontSize: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;
  context.font = `${fontSize}px sans-serif`;
  return context.measureText(text).width;
}

interface MyInputLabelProps {
  label: string;
  isFocused?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  asteriskClassName?: string;
  reverseColors?: boolean;
}

const MyInputLabel: FC<MyInputLabelProps> = ({
  isFocused,
  isEmpty,
  isError,
  label,
  name,
  required,
  className,
  asteriskClassName,
  reverseColors,
}) => {
  const labelWidth = useMemo(() => {
    if (typeof document === "undefined") return "auto";
    const asteriskMod = required ? 5 : 0;
    return measureText(label, 13) + 16 + asteriskMod;
  }, [label, required]);

  return (
    <>
      {/* Top border space when focused */}
      <div
        className={classNames(
          "absolute left-4 top-0 origin-left bg-[#f0f0f0] opacity-100 transition-all duration-200 ease-linear",
          reverseColors
            ? "bg-white dark:bg-transparent"
            : "bg-[#f0f0f0] dark:bg-transparent",
          isError && "!bg-lightred"
        )}
        style={{
          height: 1,
          width: isFocused ? labelWidth : 0,
        }}
      />
      <label
        className={classNames(
          "pointer-events-none absolute origin-left overflow-hidden whitespace-nowrap text-left transition-all duration-200 ease-linear",
          !isFocused &&
            isEmpty &&
            "font-D16px-M14px inset-[1px] px-[16px] py-[12px] text-gray2",
          (isFocused || !isEmpty) &&
            "font-12px-ALL -top-2 left-5 px-1 text-[#333333]",
          !isFocused && !isEmpty && "!p-0",
          isError && "!text-red",
          className
        )}
        htmlFor={name}
        style={{
          width: isFocused ? labelWidth : isEmpty ? "100%" : 0,
        }}
      >
        {label}
        {/*  If input is required show red (*) */}
        {required && (
          <span className={classNames("text-[#333333]", asteriskClassName)}>
            {"*"}
          </span>
        )}
      </label>
    </>
  );
};

export default MyInputLabel;
