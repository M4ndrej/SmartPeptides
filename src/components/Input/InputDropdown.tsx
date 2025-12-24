import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";

import AnimateHeight from "react-animate-height";
import DropdownIcon from "../Icons/DropdownIcon";
import MyInput from "./MyInput";
import classNames from "classnames";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface Item {
  name: string;
}

interface InputDropdownProps<T extends Item> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
  name: string;
  maxHeight: number;
  inputKey: string;
  inputPrefix?: string;
  errorInput?: boolean;
  errorMessage?: string;
  items: T[];
  selectedItem?: T;
  changeSelectedItem: (item: T) => void;
  reverseColor?: boolean;
  withElipsisText?: boolean;
  isLabelShown?: boolean;
  className?: string;
}

export default function InputDropdown<T extends Item>({
  isOpen,
  setIsOpen,
  label,
  name,
  maxHeight = 200,
  inputPrefix,
  inputKey,
  errorInput,
  errorMessage,
  items,
  selectedItem,
  changeSelectedItem,
  reverseColor = false,
  withElipsisText = false,
  isLabelShown = false,
  className,
}: InputDropdownProps<T>) {
  const elRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(elRef, () => setIsOpen(false));

  const [search, setSearch] = useState("");
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const onSelect = (item: T) => {
    changeSelectedItem(item);
    setSearch(item.name);
  };

  const handleButtonKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
    if (e.key === "Tab" && isOpen && index + 1 === filteredItems.length) {
      setIsOpen(false);
    }
  };

  const selectedItemValue = selectedItem?.[inputKey as keyof T];

  return (
    <div
      ref={elRef}
      className={classNames("relative", isOpen ? "z-[99]" : "z-[3]", className)}
    >
      <input
        type="string"
        hidden
        readOnly
        value={selectedItemValue ? `${selectedItemValue}` : ""}
        name={name}
        prefix={inputPrefix}
      />
      {/* Button */}
      <div className="h-[48px]" />
      <AnimateHeight
        height={isOpen ? "auto" : 48}
        duration={200}
        className={classNames(
          "absolute left-0 top-0 w-full rounded-[5px] border transition-colors duration-200 ease-linear dark:border-none",
          isOpen && "shadow-globalShadow",
          reverseColor
            ? "border-gray bg-inputColor"
            : "border-gray bg-inputColor"
          // selectedItem &&
          //   !reverseColor &&
          //   "!border-light-blue2 !bg-[#FFE9E3] text-[#E7461E]",
          // selectedItem && reverseColor && "!border-white !bg-white text-[#E7461E]"
        )}
      >
        <div
          className={classNames(
            "relative flex h-[48px] cursor-pointer items-center px-[16px] py-[12px] sm:px-[10px]",
            isOpen && "z-[99]"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={classNames(
              "font-D16px-ALL",
              selectedItem && "!text-purple"
            )}
          >
            {(!selectedItem || isLabelShown) && <span>{`${label}: `}</span>}
            <span>{selectedItem?.name ?? ""}</span>
          </div>
          <DropdownIcon
            className={classNames(
              "absolute right-[16px] top-[24px] transition duration-300 xs:top-[16px] sm:top-[21px]",
              !isOpen && "rotate-[-180deg]"
            )}
          />
        </div>
        <div className="px-[16px] sm:px-[10px]">
          <MyInput
            inputRef={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            label="Search..."
            name={`${name}_search`}
            onFocus={() => !isOpen && setIsOpen(true)}
            reverseColors={reverseColor}
            className="!bg-white"
          />
        </div>
        <div
          className="scrollbar relative mt-2 overflow-y-auto overflow-x-hidden"
          style={{
            maxHeight: `${maxHeight}px`,
          }}
        >
          <ul className="!ml-0 !mr-0 mt-[4px] h-full w-full !list-none pb-[4px]">
            {filteredItems?.map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  role="select"
                  onClick={() => onSelect(item)}
                  onKeyDown={(e) => handleButtonKeyDown(e, index)}
                  className={classNames(
                    "font-D16px-M13px flex h-[35px] cursor-pointer items-center justify-start border-none px-[16px] py-[12px] outline-none transition duration-200 hover:text-[#FE7913] focus:text-[#FE7913] sm:px-[10px] sm:leading-[16px]",
                    withElipsisText &&
                      "max-w-[196px] overflow-hidden whitespace-nowrap sm:max-w-none"
                  )}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <span className="overflow-hidden text-ellipsis">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </AnimateHeight>
      {errorInput && (
        <div className="font-12px-ALL my-[4px] px-[4px] text-red">
          {errorMessage ?? "Field is required/invalid"}
        </div>
      )}
    </div>
  );
}
