"use client";

import { usePathname } from "next/navigation";
import HeaderCartButton from "./HeaderCartButton";
import HeaderSearchButton from "./HeaderSearchButton";
import HeaderWishlistButton from "./HeaderWishlistButton";
import { FC } from "react";

const HeaderPopoverButtons: FC = () => {
  const path = usePathname();
  return (
    <>
      <div className="flex items-center justify-end gap-4">
        {path !== "/cart/" && (
          <>
            <HeaderCartButton />
            <div className="h-[35px] w-[1px] bg-gray4 sm:hidden" />
          </>
        )}
        <div className="flex items-center justify-end gap-2 sm:hidden">
          <div className="hidden xl:block">
            <HeaderSearchButton />
          </div>
          <div className="">
            <HeaderWishlistButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPopoverButtons;
