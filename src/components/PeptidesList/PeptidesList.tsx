"use client";

import { useState, FC } from "react";
import Image from "next/image";
import SidePopover from "../SidePopover/SidePopover";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const PeptidesList: FC = () => {
  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");

  const handlePopoverAction = (open: boolean, type: string) => {
    const peptidesList = document.querySelector(
      ".products-peptdes-list"
    ) as HTMLElement;

    handlePopover(open);
    handlePopoverType(type);
    peptidesList?.classList.add("z-index-3");
  };

  const pathname = usePathname();

  return (
    <>
      <div
        id="peptides-list"
        className={classNames({
          "absolute left-0 flex h-[44px] w-[44px] cursor-pointer select-none items-center justify-center rounded-r-[5px] bg-[#333333] opacity-70 duration-200 hover:bg-[#333333] sm:top-[-70px] md:top-[25px] ":
            true,
          "sm:!top-[113px] md:top-[46px] lg:top-[8px] xl:top-[12px]":
            pathname === "/shop/",
          "opacity-0 delay-100": popoverOpened,
          "sm:!top-[113px] md:!top-[46px] lg:!top-[8px] xl:!top-[12px]":
            pathname === "/peptides/" ||
            pathname === "/blends/" ||
            pathname === "/cosmetic/" ||
            pathname === "/supplies/",
        })}
        onClick={() => handlePopoverAction(true, "peptidescategories")}
      >
        <Image
          className="h-[32px] w-[32px]"
          src="/images/products_tags_opener.svg"
          width={32}
          height={32}
          alt="Tags"
        />
      </div>
      <SidePopover
        popoverOpened={popoverOpened}
        type={popoverType}
        fromTop={false}
        fromLeft={true}
        hideArrow={true}
        customClass="px-[16px] pr-[32px]"
        onClose={() => {
          handlePopover(false);
        }}
      />
    </>
  );
};

export default PeptidesList;
