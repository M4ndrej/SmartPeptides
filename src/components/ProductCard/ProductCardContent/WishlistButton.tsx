"use client";

import {
  GET_WISHLIST_ITEMS,
  UPDATE_WISHLIST_ITEM_LOADING,
} from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import WishlistIcon from "@/components/Icons/WishlistIcon";
import Spinner from "@/components/SvgComponents/Spinner";
import Tooltip from "@/components/Tooltip/Tooltip";
import classNames from "classnames";
import { FC, useState } from "react";
import { mutate } from "swr";

type WishlistButtonProps = {
  viewMode: string;
  productId: number;
  listView?: boolean;
};

const WishlistButton: FC<WishlistButtonProps> = ({
  viewMode,
  productId,
  listView,
}) => {
  const appContext: any = useThemeContext();

  const { wishlistItemIds } = appContext.state;
  const [addingItemToWishlist, setAddingItemToWishlist] = useState(false);

  const handleAddToWishlist = async () => {
    setAddingItemToWishlist(true);
    appContext.dispatch({ type: UPDATE_WISHLIST_ITEM_LOADING, payload: true });
    if (wishlistItemIds.includes(+productId! as never)) {
      await fetch(`/api/wishlist/remove/?product_id=${productId}`);
    } else {
      await fetch(`/api/wishlist/add/?product_id=${productId}`);
    }

    appContext.dispatch({ type: GET_WISHLIST_ITEMS });
    mutate("/api/wishlist");

    appContext.dispatch({ type: UPDATE_WISHLIST_ITEM_LOADING, payload: false });
    setAddingItemToWishlist(false);
  };

  const productIsInWishlist = wishlistItemIds.includes(productId);

  return (
    <div
      onClick={handleAddToWishlist}
      className={classNames({
        "group/wishlist cart-img-btn ease-[cubic-bezier(0.11, 0, 0.5, 0)] cursor-pointer":
          true,
        "absolute right-[16px] top-[16px] bg-white transition duration-200 hover:bg-black sm:right-[8px] sm:top-[8px]":
          viewMode !== "rows",
        "ml-[34px]": viewMode === "rows",
      })}
    >
      {!listView && (
        <div>
          <Tooltip
            text={
              productIsInWishlist ? `Remove from wishlist` : `Add to wishlist`
            }
            pointerSide="right"
            customClass={`top-[10px] sm:top-[6px] sm z-[3] scale-[.7] translate-x-[30px] group-hover/wishlist:translate-x-[0] group-hover/wishlist:scale-[1] opacity-0 transition duration-150 group-hover/wishlist:opacity-100 ${productIsInWishlist ? "left-[-160px]" : "left-[-117px]"}`}
          />
        </div>
      )}
      {addingItemToWishlist && !listView ? (
        <Spinner
          widthHeight={classNames({
            "h-[24px] w-[24px] mr-[1px] ml-[1px] mt-[10px] mb-[10px] sm:h-[19px] sm:w-[19px]":
              true,
          })}
        />
      ) : (
        <div
          className={classNames({
            "flex select-none items-center gap-[8px]": listView,
          })}
        >
          {listView && addingItemToWishlist ? (
            <Spinner widthHeight="h-[30px] w-[30px] mr-[1px] mt-[10px] mb-[10px] " />
          ) : (
            <WishlistIcon
              listView={listView}
              customClass={classNames({
                "group-hover/wishlist:[&_path]:!stroke-white group-hover/wishlist:[&_path]:!fill-black sm:w-[19px] sm:h-[19px]":
                  !listView,
                "group-hover/wishlist:[&_path]:!stroke-[#9A9A9F] group-hover/wishlist:[&_path]:!fill-[#9A9A9F] w-[32px] h-[32px] ":
                  listView,
              })}
              inWishlist={productIsInWishlist}
            />
          )}
          {listView && (
            <span className="font-16px-ALL  text-gray2 transition duration-200 group-hover/wishlist:text-darkgray">
              WISHLIST
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistButton;
