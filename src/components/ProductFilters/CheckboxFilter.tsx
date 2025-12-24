import React from "react";
import { FilterOptions } from "@/types/filters";
import { ACTIVE_FILTERS_TRUE_PARAMS } from "@/data/filter_data";
import Checkbox from "../Checkbox/Checkbox";

interface CheckboxFilterProps {
  options: FilterOptions[];
  activeValues: string[];
  onOptionChange: (option: FilterOptions) => void;
  filterValueName: string;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  options,
  activeValues,
  onOptionChange,
  filterValueName,
}) => {
  return (
    <>
      {options.map((option: FilterOptions, i) => (
        <div
          key={i}
          className="flex items-center gap-x-[8px] hover:cursor-pointer [&_label]:transition [&_label]:duration-150 [&_label]:hover:text-[#E7461E]"
          onClick={() => onOptionChange(option)}
        >
          <div className="flex h-[15px] w-[15px] items-center">
            <Checkbox
              checked={
                !!activeValues.find(
                  (itm) =>
                    itm ===
                    ACTIVE_FILTERS_TRUE_PARAMS[
                      option.name as keyof typeof ACTIVE_FILTERS_TRUE_PARAMS
                    ]
                )
              }
              rounded
              onChange={() => {}}
            />
          </div>

          <label className="font-14px-ALL hover:cursor-pointer">
            {option.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxFilter;
