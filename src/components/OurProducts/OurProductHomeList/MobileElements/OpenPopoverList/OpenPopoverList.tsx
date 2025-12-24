"use client";
import { FC, useState } from "react";
import Image from "next/image";
import SidePopover from "@/components/SidePopover/SidePopover";

type OpenPopoverListProps = {};

const OpenPopoverList: FC<OpenPopoverListProps> = () => {
  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");

  const handlePopoverAction = (open: boolean, type: string) => {
    handlePopover(open);
    handlePopoverType(type);
  };

  return (
    <>
      <div
        className="absolute left-0 top-[72px] z-[1] hidden items-center justify-center rounded-r-[5px] bg-[#E7461E] opacity-70 sm:flex sm:h-[44px] sm:w-[44px] md:flex md:h-[44px] md:w-[44px] lg:flex lg:h-[44px] lg:w-[44px] xl:hidden"
        onClick={() => handlePopoverAction(true, "productslist")}
      >
        <Image
          className="hidden select-none sm:block sm:h-[32px] sm:w-[32px] md:block md:h-[32px] md:w-[32px] lg:block lg:h-[32px] lg:w-[32px] xl:hidden"
          src="/images/products_tags_opener.svg"
          width={40}
          height={40}
          alt="Tags"
        />
      </div>
      <SidePopover
        popoverOpened={popoverOpened}
        type={popoverType}
        fromTop={false}
        fromLeft={true}
        showClosingArrow={true}
        customClass="!px-[16px] !py-[24px]"
        onClose={() => {
          handlePopover(false);
        }}
      />
    </>
  );
};

export default OpenPopoverList;
