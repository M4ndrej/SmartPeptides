"use client";

import InsideScroll from "@/components/Scroll/InsideScroll";
import SidePopoverMain from "@/components/SidePopover/SidePopoverMain";
import Image from "next/image";
import { FC, ReactElement, useState } from "react";

type BlogsMobileType = {
  children: ReactElement;
};

const BlogsMobile: FC<BlogsMobileType> = ({ children }) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <>
      <div
        className="fixed left-0 top-[356px] z-[1] flex h-[44px] w-[44px] items-center justify-center rounded-r-[5px] bg-[#9A9A9F] opacity-70 xl:hidden"
        onClick={() => setOpenPopover(true)}
      >
        <Image
          className="select-none xl:hidden "
          src="/images/filter-icon.svg"
          width={22}
          height={22}
          alt="Filter"
        />
      </div>
      <SidePopoverMain
        onClose={() => {
          setOpenPopover(false);
        }}
        popoverOpened={openPopover}
        fromLeft={true}
        type="blogssidebar"
      >
        <InsideScroll className="h-[100dvh]">{children}</InsideScroll>
      </SidePopoverMain>
    </>
  );
};

export default BlogsMobile;
