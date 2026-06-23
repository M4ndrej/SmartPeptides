import classNames from "classnames";
import { FC } from "react";

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

const GroupProfileTabs: FC<DropdownProps> = ({
  items,
  selectedId,
  changeSelectedId,
  className,
}) => {
  const handleItemClick = (id: number) => {
    changeSelectedId(id);
  };

  return (
    <>
      <div className="flex justify-between rounded-[5px] bg-lightgray sm:hidden xl:hidden">
        {items.map((item) => (
          <div
            key={item.id}
            className={classNames(
              "font-D16px-M13px  cursor-pointer rounded-[5px] p-[16px] transition-all ease-in-out hover:bg-lightgray hover:font-bold hover:text-[#333333] sm:py-[10px]",
              item.id == selectedId && "bg-lightgray font-bold text-[#333333]",
              item.id == selectedId &&
                "first:rounded-tl-none first:rounded-tr-none",
              item.id === 7 && "hidden"
            )}
            onClick={() => handleItemClick(item.id)}
          >
            {item.id === 6 ? "Affiliate" : item.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupProfileTabs;
