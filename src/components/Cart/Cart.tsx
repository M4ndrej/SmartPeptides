import clearAllFromCart from "@/app/actions/cart/clear/actions";
import removeFromCart from "@/app/actions/cart/remove/actions";
import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { getPercentage } from "@/helpers/percentage_helper";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import Button from "../Button/Button";
import CartEmptyState from "../CartEmptyState/CartEmptyState";
import CartFeaturedProducts from "../FeaturedProducts/CartFeaturedProduct/CartFeaturedProducts";
import PromotionCartLabel from "../PromotionCartLabel/PromotionCartLabel";
import RangeInput from "../Range/Range";
import InsideScroll from "../Scroll/InsideScroll";
import SidebarMobileHeader from "../SidebarMobileHeader/SidebarMobileHeader";
import CartItem from "./CartItem";
import ClearCartButton from "./ClearCartButton/ClearCartButton";

type CartType = "US" | "WORLDWIDE";

interface ICartProps {
  closePopover?: any;
  itemsCount?: number;
}

const Cart: FC<ICartProps> = ({ closePopover, itemsCount }) => {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const { data, error, isLoading } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const [cartType, setCartType] = useState<CartType>("US");
  const {
    cart: { items, total, fees, subtotal },
  } = data?.cart ? data : {
    cart: {
      items: [],
      fees: [],
      total: 0,
      subtotal: 0,
    },
  };

  const hasGift = useMemo(() => {
    return items?.find((item) => !!item?.is_gift_item);
  }, [items]);

  const handleOpenProductPage = () => {
    router.push("/shop/");
    closePopover();
  };

  const viewCartHandler = () => {
    router.push("/cart");
    closePopover();
  };

  const viewCheckoutScreens = () => {
    router.push("/payment");
    closePopover();
  };

  const handleClearCart = async () => {
    setUpdating(true);
    const clearData = await clearAllFromCart();
    if (clearData.success) {
      await mutate("/api/cart/get_cart", {
        cart: clearData.success.cart.data,
        loggedUser: "success",
      });
    }
    setUpdating(false);
  };

  const CARTORDERSPENTPRIORITY = cartType === "US" ? 15000 : 50000; // Actual price is 150$ or $500 but we add extra two zero
  const CARTORDERSPENTEXPRESS = cartType === "US" ? 50000 : 75000; // Actual price is 500$ or 750% but we add extra two zero
  const CARTORDERSPENTGIFT = 50000; // Actual price is 500$

  const handleRemoveFromCart = async (key: string) => {
    setUpdating(true);
    const removeFromCartResponse = await removeFromCart({ key });
    if (removeFromCartResponse.success) {
      mutate("/api/cart/get_cart", {
        cart: removeFromCartResponse.success.cart.data,
        loggedUser: "success",
      });
    }

    setUpdating(false);
  };

  return (
    <div className="h-[100dvh] w-[596px] sm:!w-full">
      {items?.length ? (
        <>
          <div className="relative h-full max-h-[100dvh-80px]">
            <InsideScroll className="max-h-[calc(100dvh-80px)]">
              <div className="mb-[8px] flex h-full w-full flex-1 flex-col justify-between gap-[16px] px-[32px] pt-[32px] sm:px-[10px] sm:pt-0 from834:px-[24px] ">
                <div
                  className={classNames({
                    "flex flex-1 flex-col pb-[5px] sm:overflow-visible": true,
                    //Here is change to add min 500px to mobile
                    "min-h-none": items?.length > 1,
                    "pointer-events-none opacity-20": updating,
                  })}
                >
                  <SidebarMobileHeader
                    title="My Cart"
                    closeBtnAction={() => closePopover()}
                    fixedPosition
                    count={itemsCount}
                    customCloseBtnClass="sm:!right-[12px]"
                  />
                  <div
                    className={classNames({
                      "relative flex flex-1 flex-col overflow-hidden sm:mt-0 sm:pt-[88px]":
                        true,
                    })}
                  >
                    <div className="">
                      <div className="flex flex-col gap-[16px]">
                        {items.map((item) => (
                          <CartItem
                            handleRemoveFromCart={() =>
                              handleRemoveFromCart(item.key)
                            }
                            key={item.key}
                            item={item}
                            closePopover={closePopover}
                          />
                        ))}
                      </div>
                      {/* Clear Cart */}
                      <ClearCartButton handleClearCart={handleClearCart} />
                    </div>
                  </div>

                  {/* <div className="flex justify-between gap-[16px] sm:gap-[8px]">
                    <PromotionCartLabel
                      textBold="save 5%"
                      textNormal="Buy 5+ of each and"
                    />
                    <PromotionCartLabel
                      textBold="save 8%"
                      textNormal="Buy 10+ of each and"
                    />
                  </div> */}
                  <div className="mt-[24px] sm:mt-[16px]">
                    <CartFeaturedProducts
                      cartItems={items}
                      closeSidePopover={closePopover}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div
                      onClick={() => setCartType("US")}
                      className={classNames({
                        "font-D16px-M14px flex w-[50%] cursor-pointer select-none items-center justify-center rounded-l-[5px] text-center font-normal text-gray2 transition duration-200 hover:text-gray dark:text-borderGray":
                          true,
                        "!font-bold dark:!text-darkgray": cartType === "US",
                      })}
                    >
                      US
                    </div>
                    <div
                      onClick={() => setCartType("WORLDWIDE")}
                      className={classNames({
                        "font-D16px-M14px flex w-[50%] cursor-pointer select-none items-center justify-center rounded-r-[5px] text-center font-normal text-gray2 transition duration-200 hover:text-gray dark:text-borderGray":
                          true,
                        "!font-bold dark:!text-darkgray":
                          cartType === "WORLDWIDE",
                      })}
                    >
                      Worldwide
                    </div>
                  </div>
                  <div className="relative mt-[8px] h-[2px] w-full overflow-hidden rounded-[5px] bg-borderGray">
                    <div
                      className={classNames({
                        "absolute left-0 h-[2px] w-[50%] bg-gray2 transition-all duration-[300ms] ease-in-out dark:bg-[#9A9A9F]":
                          true,
                        "translate-x-[100%]": cartType === "WORLDWIDE",
                      })}
                    ></div>
                  </div>
                  <div className="mt-[16px] flex">
                    <div className="font-D16px-M13px flex-1">Subtotal</div>
                    <div className="font-D16px-M13px text-darkgray">
                      {formatCurrency(+subtotal, false, false)}
                    </div>
                  </div>
                  {fees
                    .filter(
                      (fee) =>
                        fee.key !== "first-order-discount" &&
                        !fee.name?.toLowerCase().includes("quantity") &&
                        !fee.name?.toLowerCase().includes("zelle") &&
                        !fee.name?.toLowerCase().includes("crypto") &&
                        !fee.name?.toLowerCase().includes("cryptocurrency") &&
                        !fee.name?.toLowerCase().includes("bank") &&
                        !fee.name?.toLowerCase().includes("cash") &&
                        !fee.name?.toLowerCase().includes("venmo") &&
                        !fee.name?.toLowerCase().includes("payment method")
                    )
                    .map((fee) => (
                      <div key={fee.key} className="mb-[12px] mt-[12px] flex">
                        <div className="font-D16px-M13px flex-1">
                          {fee.name}
                        </div>
                        <div className="font-D16px-M13px text-darkgray">
                          {formatCurrency(+fee.total, false, false)}
                        </div>
                      </div>
                    ))}
                  <div className="mb-[21px] mt-[12px] flex">
                    <div className="font-D16px-M13px flex-1 font-bold">
                      Total
                    </div>
                    <div className="font-D16px-M13px font-bold text-darkgray">
                      {formatCurrency(+total, false, false)}
                    </div>
                  </div>
                  {/* <div
                    className={classNames({
                      "w-full": true,
                      "sm:pr-[8px]":
                        getPercentage(CARTORDERSPENTGIFT, +total) > 90,
                    })}
                  >
                    <RangeInput
                      isDisabled={true}
                      value={getPercentage(CARTORDERSPENTGIFT, +total)}
                    />
                  </div> */}
                  {/* <div className="font-D16px-M14px mt-[13px]">
                    {+total < CARTORDERSPENTGIFT ? (
                      <div className="font-D16px-M13px mt-[13px] sm:leading-[16px]">
                        Spend{" "}
                        <span className=" font-bold text-darkgray">
                          {formatCurrency(CARTORDERSPENTGIFT - +total)}{" "}
                        </span>
                        more for <span className="font-bold">FREE GIFT</span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="flex flex-wrap gap-1">
                          Congratulations! You’ve got{" "}
                          <Link
                            href="/merch"
                            onClick={() => closePopover()}
                            className={classNames(
                              "group/gift flex gap-1 font-bold uppercase text-darkgray transition-colors duration-200 hover:text-gray",
                              hasGift && "pointer-events-none"
                            )}
                          >
                            <GiftIcon className="fill-[#9A9A9F] stroke-[#9A9A9F] transition-colors duration-200 group-hover/gift:fill-[#9A9A9F] group-hover/gift:stroke-[#9A9A9F]" />
                            <span>FREE GIFT</span>
                          </Link>
                        </div>
                        {hasGift && (
                          <span className="font-bold uppercase text-gray3">
                            PRIZE CLAIMED
                          </span>
                        )}
                      </div>
                    )}
                  </div> */}
                  <div
                    className={classNames({
                      "mt-[21px] w-full": true,
                      "sm:pr-[8px]":
                        getPercentage(CARTORDERSPENTPRIORITY, +total) > 90,
                    })}
                  >
                    <RangeInput
                      isDisabled={true}
                      value={getPercentage(CARTORDERSPENTPRIORITY, +total)}
                    />
                  </div>
                  <div className="font-D16px-M14px mt-[13px] overflow-hidden text-ellipsis whitespace-nowrap sm:leading-[16px]">
                    {+total < CARTORDERSPENTPRIORITY ? (
                      <div className="font-D16px-M13px mt-[13px] sm:leading-[16px]">
                        Spend{" "}
                        <span className=" font-bold text-darkgray">
                          {formatCurrency(CARTORDERSPENTPRIORITY - +total)}{" "}
                        </span>
                        more for{" "}
                        <span className="font-bold">
                          FREE PRIORITY SHIPPING
                        </span>
                      </div>
                    ) : (
                      <>
                        Congratulations! You’ve got{" "}
                        <span className="font-bold uppercase">
                          free priority shipping
                        </span>
                      </>
                    )}
                  </div>
                  <div
                    className={classNames({
                      "mt-[21px] w-full": true,
                      "sm:pr-[8px]":
                        getPercentage(CARTORDERSPENTEXPRESS, +total) > 90,
                    })}
                  >
                    <RangeInput
                      isDisabled={true}
                      value={getPercentage(CARTORDERSPENTEXPRESS, +total)}
                    />
                  </div>
                  <div className="font-D16px-M14px mt-[13px] overflow-hidden text-ellipsis whitespace-nowrap sm:leading-[16px]">
                    {+total < CARTORDERSPENTEXPRESS ? (
                      <div className="font-D16px-M13px mt-[13px] sm:leading-[16px]">
                        Spend{" "}
                        <span className=" font-bold text-darkgray">
                          {formatCurrency(CARTORDERSPENTEXPRESS - +total)}{" "}
                        </span>
                        more for{" "}
                        <span className="font-bold">FREE EXPRESS SHIPPING</span>
                      </div>
                    ) : (
                      <>
                        Congratulations! You’ve got{" "}
                        <span className="font-bold uppercase">
                          free express shipping
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </InsideScroll>
            <div className="cart-controls absolute bottom-0 flex w-full justify-center gap-[15px] bg-white px-[32px] pb-[32px] pt-[16px] shadow-globalShadow transition duration-200 sm:px-[10px] sm:pb-[16px]">
              <div
                className="w-full max-w-[259px] sm:max-w-[100%]"
                onClick={viewCartHandler}
              >
                <Button text={"VIEW CART"} customClass="w-full" />
              </div>

              <div className="w-full max-w-[259px] sm:max-w-[100%]">
                <div onClick={viewCheckoutScreens}>
                  <Button text={"CHECKOUT"} highlighted customClass="w-full" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <SidebarMobileHeader
            title="My Cart"
            closeBtnAction={() => closePopover()}
          />
          <CartEmptyState navigate={handleOpenProductPage} />
        </>
      )}
    </div>
  );
};

export default Cart;
