"use client";

import classNames from "classnames";
import { FC, useState } from "react";

export type TabItem = {
  name: string;
  id: number | string;
};

interface TabsProps {
  tabs: TabItem[];
  activeTab: number | string;
  onChange: (tab: TabItem) => void;
  className?: string;
}

const Tabs: FC<TabsProps> = ({ tabs, onChange, activeTab, className }) => {
  const [animation, setAnimation] = useState(false);
  const [linePosition, setLinePosition] = useState(0);
  const lineWidth = 100 / tabs.length;

  const handleSwitch = (tab: TabItem) => {
    const element = document.getElementById(`tab-${tab.id}`);
    const linePos = element?.offsetLeft;

    setLinePosition(linePos!);
    setAnimation(true);

    setTimeout(() => {
      onChange(tab);
      setAnimation(false);
    }, 200);
  };

  return (
    <div
      className={classNames(
        "relative flex w-full items-center pb-[2px]",
        className
      )}
    >
      {tabs.map((tab, i) => (
        <div
          key={i}
          id={`tab-${tab.id}`}
          className={classNames(
            "font-16px-ALL hover:text-purple w-full cursor-pointer border-b-[2px] border-lightgray text-center text-gray2 transition-all",
            tab.id == activeTab &&
              !animation &&
              "!border-[#333333] font-bold !text-[#333333]"
          )}
          onClick={() => handleSwitch(tab)}
        >
          {tab.name}
        </div>
      ))}
      <div
        className={classNames(
          "absolute bottom-[2px] border-b-[2px] border-[#333333] transition-all",
          animation ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: lineWidth + "%",
          left: linePosition,
        }}
      ></div>
    </div>
  );
};

export default Tabs;
