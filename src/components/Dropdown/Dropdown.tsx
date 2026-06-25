import classNames from "classnames";
import DropdownIcon from "../Icons/DropdownIcon";
import AnimateHeight from "react-animate-height";
import { FC, useMemo, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedId: number;
  changeSelectedId: (id: number) => void;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({
  items,
  selectedId,
  changeSelectedId,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const height = useMemo(() => (isOpen ? "auto" : 0), [isOpen]);

  const elRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(elRef, () => setIsOpen(false));

  const handleItemClick = (id: number) => {
    changeSelectedId(id);
    setIsOpen(false);
  };

  return (
    <div
      ref={elRef}
      className={classNames(
        "relative z-10 w-full transition-shadow",
        className,
        isOpen && "rounded-[5px] bg-white shadow-globalShadow"
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "font-D16px-M13px flex w-full cursor-pointer items-center justify-between bg-lightgray p-4 font-bold text-darkgray transition-all ease-in-out hover:bg-lightgray hover:text-gray sm:py-[10px]",
          isOpen ? "rounded-t-[5px]" : "rounded-[5px]"
        )}
      >
        <span className="text-darkgray">
          {items.find((item) => item.id == selectedId)?.name}
        </span>
        <DropdownIcon
          className={classNames(
            "!stroke-[#9A9A9F] transition duration-200",
            !isOpen && "rotate-[180deg]"
          )}
        />
      </div>

      <AnimateHeight
        height={height}
        duration={200}
        className="ease-[cubic-bezier(0.11, 0, 0.5, 0)] transition-all"
      >
        <div
          className={classNames(
            "w-full overflow-hidden",
            isOpen && "rounded-b-[5px]"
          )}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={classNames(
                "font-D16px-M13px w-full cursor-pointer p-[16px] transition-all ease-in-out hover:bg-lightgray hover:font-bold hover:text-gray sm:py-[10px]",
                item.id === selectedId &&
                  "bg-lightgray font-bold text-darkgray"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default Dropdown;
