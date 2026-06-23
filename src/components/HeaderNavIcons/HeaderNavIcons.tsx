"use client";

import { GET_WISHLIST_ITEMS, UPDATE_CART_ITEMS } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useContext, useEffect, useState } from "react";
import useSWR from "swr";

interface HeaderNavIconsProps {
  handlePopoverAction?: (open: boolean, type: string, fromTop: boolean) => void;
  isInSidebar?: boolean;
  closePopover?: () => void;
  hasIconX?: boolean;
}

const HeaderNavIcons: FC<HeaderNavIconsProps> = ({
  handlePopoverAction,
  isInSidebar,
  hasIconX,
  closePopover,
}) => {
  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );
  const [hoveredIcon, handleHoverIcons] = useState(0);
  const appContext: any = useContext(ThemeContext);

  const pathName = usePathname();

  const totalPriceInCart = cartData?.cart?.totals?.price;

  const totalFormatedPriceInCart = formatCurrency(
    totalPriceInCart ? +totalPriceInCart : 0,
    false,
    false
  );

  useEffect(() => {
    if (cartData?.cart) {
      const cartItems = cartData.cart?.items?.map((item) => {
        return { key: item.key, id: item.id, quantity: item.quantity };
      });

      appContext.dispatch({
        type: UPDATE_CART_ITEMS,
        payload: cartItems,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  useEffect(() => {
    appContext.dispatch({ type: GET_WISHLIST_ITEMS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const functionIsNotUndefinedCheck = handlePopoverAction !== undefined;

  useEffect(() => {
    if (appContext.state.showCartModal && functionIsNotUndefinedCheck) {
      handlePopoverAction(true, "cart", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.state.showCartModal]);

  const sidePopoverAction = (open: boolean, type: string, fromTop: boolean) => {
    if (closePopover) {
      closePopover();

      setTimeout(() => {
        functionIsNotUndefinedCheck && handlePopoverAction(open, type, fromTop);
      }, 500);
    } else {
      functionIsNotUndefinedCheck && handlePopoverAction(open, type, fromTop);
    }
  };

  const {
    cart: { items_count },
  } = cartData || { cart: { items_count: 0, loggedUser: "" } };

  const { wishlistItemIds } = appContext.state;

  return (
    <div
      id="icons"
      className="inline-flex h-[37px] w-[128px] items-center justify-between sm:h-[27px] sm:w-auto sm:justify-normal md:w-auto  lg:w-auto"
    >
      <div
        className={classNames({
          "relative ml-4 hidden h-[37px] w-[36px] cursor-pointer items-center justify-center sm:ml-2 sm:h-[32px] sm:w-[32px] xl:flex":
            true,
          "!flex": isInSidebar,
        })}
        onMouseEnter={() => {
          handleHoverIcons(3);
        }}
        onMouseLeave={() => {
          handleHoverIcons(0);
        }}
        onClick={() => sidePopoverAction(true, "search", true)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer sm:h-[32px] sm:w-[32px]"
        >
          <g clipPath="url(#clip0_493_160674)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.07043 21.49C5.64043 18.06 5.64043 12.5 9.07043 9.06997C12.5004 5.63997 18.0604 5.63997 21.4904 9.06997C24.9204 12.5 24.9204 18.06 21.4904 21.49C18.0604 24.92 12.5004 24.92 9.07043 21.49ZM8.01043 8.00997C4.00043 12.03 4.00043 18.54 8.01043 22.55C11.8304 26.37 17.9004 26.56 21.9404 23.11C21.9704 23.16 22.0104 23.21 22.0604 23.26L26.3004 27.5C26.5904 27.79 27.0704 27.79 27.3604 27.5C27.6504 27.21 27.6504 26.73 27.3604 26.44L23.1204 22.2C23.1204 22.2 23.0304 22.12 22.9804 22.09C26.5604 18.05 26.4204 11.87 22.5504 7.99997C18.5404 3.99997 12.0304 3.99997 8.01043 8.00997Z"
              className={classNames("fill-textWhite")}
            />
          </g>
          <defs>
            <clipPath id="clip0_493_160674">
              <rect
                width="22.58"
                height="22.73"
                fill="white"
                transform="translate(5 5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div
        className={classNames({
          "relative ml-2 hidden h-[37px] w-[36px] cursor-pointer items-center justify-center sm:h-[32px]  sm:w-[32px] xl:flex":
            true,
          "!flex": isInSidebar,
        })}
        onMouseEnter={() => {
          handleHoverIcons(2);
        }}
        onMouseLeave={() => {
          handleHoverIcons(0);
        }}
        onClick={() => sidePopoverAction(true, "whishlist", false)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer sm:h-[32px] sm:w-[32px]"
        >
          <path
            d="M22.25 4.25C19.625 4.25 17.3425 5.43375 16 7.4175C14.6575 5.43375 12.375 4.25 9.75 4.25C7.76159 4.25232 5.85528 5.04324 4.44926 6.44926C3.04324 7.85528 2.25232 9.76159 2.25 11.75C2.25 15.4 4.525 19.1987 9.0125 23.0387C11.0688 24.791 13.29 26.3399 15.645 27.6637C15.7541 27.7224 15.8761 27.7531 16 27.7531C16.1239 27.7531 16.2459 27.7224 16.355 27.6637C18.71 26.3399 20.9312 24.791 22.9875 23.0387C27.475 19.1987 29.75 15.4 29.75 11.75C29.7477 9.76159 28.9568 7.85528 27.5507 6.44926C26.1447 5.04324 24.2384 4.25232 22.25 4.25ZM16 26.1388C13.9487 24.955 3.75 18.715 3.75 11.75C3.75165 10.1592 4.38433 8.63405 5.50919 7.50919C6.63405 6.38433 8.15921 5.75165 9.75 5.75C12.285 5.75 14.4137 7.10375 15.3062 9.28375C15.3628 9.42131 15.4589 9.53896 15.5824 9.62176C15.7059 9.70457 15.8513 9.74877 16 9.74877C16.1487 9.74877 16.2941 9.70457 16.4176 9.62176C16.5411 9.53896 16.6372 9.42131 16.6938 9.28375C17.5863 7.10375 19.715 5.75 22.25 5.75C23.8408 5.75165 25.366 6.38433 26.4908 7.50919C27.6157 8.63405 28.2483 10.1592 28.25 11.75C28.25 18.715 18.0513 24.955 16 26.1388Z"
            className={classNames("fill-textWhite")}
          />
        </svg>

        {wishlistItemIds.length > 0 && (
          <div
            className={classNames({
              "font-D13px-M11px absolute right-[-5px] top-0 flex h-[20px] w-[20px] select-none items-center justify-center rounded-full bg-[#333333] text-white sm:right-[-3px] sm:top-[-3px] sm:h-[18px] sm:w-[18px] sm:pt-[1px]":
                true,
              "font-D13px-M11px right-[-6px] !h-[23px] !w-[23px] pt-[1px] text-[12px] leading-[15px] sm:right-[-8px] sm:top-[-4px]  sm:!h-[24px] sm:!w-[24px] sm:pt-0":
                wishlistItemIds.length > 9,
            })}
          >
            {wishlistItemIds.length}
          </div>
        )}
      </div>
      <div
        className={classNames({
          "ml-[43px] mr-[10px] hidden": true,
          "sm:block": hasIconX,
        })}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => closePopover && closePopover()}
        >
          <path
            d="M1 1.00183L16.9989 17.0007"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1 16.9979L16.9989 0.999035"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className={classNames({
          "ml-4 max-w-none xl:hidden": true,
          hidden: isInSidebar,
        })}
        onClick={() =>
          functionIsNotUndefinedCheck &&
          handlePopoverAction(true, "navigation", false)
        }
      >
        <Image
          src="/images/hamburger.svg"
          width={32}
          height={32}
          alt="Hamburger"
          className="select-none sm:h-[24px] sm:w-[24px]"
        />
      </div>
    </div>
  );
};

export default HeaderNavIcons;
