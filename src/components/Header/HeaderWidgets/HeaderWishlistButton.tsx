"use client";

import classNames from "classnames";
import { FC } from "react";
import { useThemeContext } from "@/context/theme-provider";
import HeartIcon from "../../Icons/HeartIcon";
import { useSidePopoverContext } from "@/context/SidePopoverContext";

interface HeaderWishlistButtonProps {
  isSmaller?: boolean;
}

const HeaderWishlistButton: FC<HeaderWishlistButtonProps> = ({ isSmaller }) => {
  const appContext = useThemeContext();
  const { handlePopoverAction } = useSidePopoverContext();

  const wishlistItemIds = appContext?.state?.wishlistItemIds ?? [];
  return (
    <button
      type="button"
      className={classNames(
        "group/wishlist z-3 relative flex items-center justify-center ",
        isSmaller ? "!h-[28px]" : "h-[36px] sm:!h-8"
      )}
      onClick={() => handlePopoverAction(true, "whishlist")}
    >
      {!!wishlistItemIds.length && (
        <div
          className={classNames(
            "font-D13px-M11px absolute right-[-5px] top-0 flex h-[20px] w-[20px] cursor-pointer select-none items-center justify-center rounded-full bg-[#333333] text-white sm:right-[-3px] sm:top-[-3px] sm:h-[14px] sm:w-[14px] sm:pt-[1px]",
            wishlistItemIds.length > 9 &&
              "right-[-4px] !h-[23px] !w-[23px] pt-[1px] text-[12px] leading-[15px] sm:right-[-8px] sm:top-[-4px] sm:!h-[20px] sm:!w-[20px] sm:pt-0"
          )}
        >
          {wishlistItemIds.length}
        </div>
      )}
      <HeartIcon
        className={classNames(
          "transition-colors duration-300 group-hover/wishlist:!fill-[#333333]",
          isSmaller ? "!h-6 !w-6 sm:!h-5 sm:!w-5" : "sm:!h-6 sm:!w-6"
        )}
      />
    </button>
  );
};

export default HeaderWishlistButton;
