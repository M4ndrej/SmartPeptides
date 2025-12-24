import React, { KeyboardEvent, ChangeEvent, RefObject } from "react";
import Input from "../Input/Input";

type SearchInputProps = {
  searchTerm: string;
  modifiedSuggestion: string;
  handleChangeSearchTerm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTabPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  mainInputRef: RefObject<HTMLInputElement>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  modifiedSuggestion,
  handleChangeSearchTerm,
  handleTabPress,
  mainInputRef,
}) => (
  <div className="relative m-auto md:max-w-[570px]">
    <div className="relative">
      <Input
        label={searchTerm.length ? "" : "I’m shopping for ..."}
        required={false}
        value={modifiedSuggestion}
        customClass={
          "w-full !text-gray !border-0 !bg-transparent focus:!bg-transparent absolute sm:top-[5px]  !font-normal select-none !p-0 !h-[29px] sm:!h-[16px] font-D24px-M14px"
        }
        customLabelClass="!pl-0  top-[-5px] !pt-[0] sm:!pt-0 font-D24px-M14px text-transparent"
        onChange={() => {}}
      />
      <Input
        ref={mainInputRef}
        label={"I’m shopping for ..."}
        required={false}
        animation={true}
        tabIndex={1}
        value={searchTerm}
        customClass={
          "w-full bg-transparent !border-0 !bg-transparent focus:!bg-transparent !p-0 !h-[29px] !font-normal !leading-[29px] sm:!h-[28px] font-D24px-M14px !text-black relative z-1"
        }
        customLabelClass="!pl-0 !pt-[0] sm:!pt-[3px] font-D24px-M14px"
        onChange={handleChangeSearchTerm}
        onKeyDown={handleTabPress}
      />
    </div>
    <div className="mt-[16px] h-[1px] w-full bg-borderColor"></div>
  </div>
);

export default SearchInput;
