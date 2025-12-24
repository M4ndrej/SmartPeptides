"use client";

import { useScrollContext } from "@/context/ScrollContext";
import useDebounce from "@/hooks/useDebounce";
import classNames from "classnames";
import HeaderTopBar from "./HeaderWidgets/HeaderTopBar";

const StickyTopBar = () => {
  const { direction, scrollTop } = useScrollContext(["direction", "scrollTop"]);
  const isOpen = direction.get == "up" || scrollTop.get < 30;

  const isOverflowVisible = useDebounce(isOpen, 300);

  return (
    <div
      style={{ height: isOpen ? 30 : 0 }}
      className={classNames(
        "z-20 transition-all duration-300 ease-out",
        isOpen && isOverflowVisible ? "overflow-visible" : "overflow-hidden"
      )}
    >
      <HeaderTopBar isOpen={isOpen} />
    </div>
  );
};

export default StickyTopBar;
