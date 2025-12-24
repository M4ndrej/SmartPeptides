"use client";

import SearchIcon from "@/components/Icons/SearchIcon";
import Input from "@/components/Input/Input";
import useDebounce from "@/hooks/useDebounce";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface TableSearchProps {
  label?: string;
  onSearch: Dispatch<SetStateAction<string>>;
}

const TableSearch: FC<TableSearchProps> = ({ onSearch, label }) => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    onSearch(debouncedInput);
  }, [debouncedInput]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };

  return (
    <div className="relative w-full max-w-72 sm:max-w-full">
      <div className="w-full">
        <Input
          label={label ?? "Search name"}
          required={false}
          name="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          customClass={
            "w-full bg-transparent !border-0 !bg-transparent focus:!bg-transparent !p-0 !h-[24px] !font-normal !leading-[29px] font-D24px-M14px relative z-1 dark:focus:!bg-transparent"
          }
          customLabelClass="!pl-0 !pt-[0] sm:!pt-[3px] font-D24px-M14px"
          type="text"
        />
        <div className="h-[1px] w-full bg-borderColor" />
      </div>
      <SearchIcon width={24} height={24} className="absolute right-0 top-0" />
    </div>
  );
};

export default TableSearch;
