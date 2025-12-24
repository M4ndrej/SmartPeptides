"use client";

import classNames from "classnames";
import { useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import CartEmptyState from "../CartEmptyState/CartEmptyState";
import CartProductItem from "../CartProductItem/CartProductItem";
import CartPageRightSide from "./CartPageRightSide";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/helpers/fetchers";
import { getPercentage } from "@/helpers/percentage_helper";
import { formatCurrency } from "@/helpers/curency_format";
import { useRouter } from "next/navigation";
import { CartResponse } from "@/types/cart_types";
import { removeCouponCode } from "@/app/actions/coupons/remove/actions";
import CartPageSteps from "./CartPageSteps/CartPageSteps";
import CartFeaturedProducts from "../FeaturedProducts/CartFeaturedProduct/CartFeaturedProducts";

type CartType = "US" | "WORLDWIDE";

const CartPage = () => {
  const [cartType, setCartType] = useState<CartType>("US");
  const { data, error, isLoading } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );
  const [isInDeleteProcess, handleDeleteProcess] = useState(false);

  const handleDeleteItem = (updatedCart: boolean) => {
    handleDeleteProcess(updatedCart);
  };

  const {
    cart: { items, total, subtotal, totals, coupons, shipping_rates },
  } = data || {
    cart: {
      items: [],
      fees: [],
      coupons: [],
      shipping_rates: [],
      total: 0,
      subtotal: 0,
      totals: {
        price: 0,
        shipping: 0,
        subtotal: 0,
        discount: 0,
      },
    },
  };

  const [removeCouponLoading, setRemoveCouponLoading] = useState("");

  const handleRemoveCouponCode = async (code: string) => {
    setRemoveCouponLoading(code);
    const remove_coupon = await removeCouponCode(code);
    if (remove_coupon.success) {
      mutate("/api/cart/get_cart", {
        cart: remove_coupon.success.cart.data,
        loggedUser: "success",
      });
      mutate("/api/checkout");
      setRemoveCouponLoading("");
    }
  };

  const CARTORDERSPENTPRIORITY = cartType === "US" ? 15000 : 50000; // Actual price is 150$ or $500 but we add extra two zero
  const CARTORDERSPENTEXPRESS = cartType === "US" ? 50000 : 75000; // Actual price is 500$ or 750% but we add extra two zero
  const CARTORDERSPENGIFT = cartType === "US" ? 50000 : 75000; // Actual price is 500$ or 750% but we add extra two zero

  const router = useRouter();

  return (
    <>
      {/* Steps section*/}
      <CartPageSteps />
      {/* Product section below steps */}
      {items?.length ? (
        <div
          className={classNames({
            "container-margin-bottom-D96px-M64px container-padding-inline mx-[auto] mt-[48px] flex w-full max-w-[1264px] gap-[23px] sm:flex-col sm:gap-[32px] ":
              true,
          })}
        >
          {/* Left side */}
          <div className="w-full max-w-none xl:max-w-[798px]">
            {/* Product labels : /name/price, quanitiy/total */}
            <div className="label grid grid-cols-5 gap-[16px] border-b-[1px] border-borderColor pb-[16px] sm:gap-[16px] sm:pr-0 lg:grid-cols-6">
              <div className="col-span-2 text-black lg:col-span-3">
                {items.length < 2 ? "PRODUCT" : "PRODUCTS"}
              </div>
              <div className="label flex  justify-center text-[#E7461E] sm:hidden">
                PRICE
              </div>
              <div className="label flex justify-center text-black sm:hidden">
                QUANTITY
              </div>
              <div className="label flex justify-center text-black sm:hidden">
                SUBTOTAL
              </div>
            </div>

            {/* Cart product items */}
            {items?.length
              ? items.map((item) => {
                  return (
                    <CartProductItem
                      key={item.key}
                      item={item}
                      onDelete={handleDeleteItem}
                      isInDeleteProcess={isInDeleteProcess}
                    />
                  );
                })
              : ""}

            <div className="md:flex md:gap-[16px] lg:flex lg:gap-[16px]">
              {/* Cta buttons, rane sliders and coupon code */}
              <div className="md:w-[100%] md:min-w-[442px] md:max-w-full  lg:w-full lg:min-w-[542px] xl:max-w-full">
                <div className="mt-[40px] sm:mt-[24px] xl:mt-[24px]">
                  <CartFeaturedProducts cartItems={items} />
                </div>
                {/* Cta buttons */}
                <div className="flex flex-row items-center gap-[16px] sm:w-full sm:flex-none sm:flex-col sm:items-start sm:gap-0 from834:w-full from834:flex-none from834:flex-col from834:items-start from834:gap-0">
                  <div className="sm:w-full lg:w-full">
                    <div className="relative mx-auto mb-[37px] flex w-full justify-center after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-borderGray after:content-[''] sm:mb-[24px] sm:mt-[24px] sm:max-w-[100%] md:mt-[40px] lg:mt-[32px] xl:mt-[40px] xl:max-w-[496px]">
                      <button
                        className={`product-btn ${
                          cartType === "US" ? "product-btn--active" : ""
                        }`}
                        onClick={() => setCartType("US")}
                      >
                        US
                      </button>
                      <button
                        className={`product-btn ${
                          cartType === "WORLDWIDE" ? "product-btn--active" : ""
                        }`}
                        onClick={() => setCartType("WORLDWIDE")}
                      >
                        Worldwide
                      </button>
                    </div>

                    {/* Range  */}
                    <div className="flex flex-col gap-[21px] sm:gap-[16px]">
                      {/* <RangeSlider
                        isDisabled={true}
                        price={formatCurrency(CARTORDERSPENGIFT - +total)}
                        linkTo="/shop"
                        type={cartType}
                        showHintText={+total < CARTORDERSPENGIFT}
                        shppingExpressPriority="gift"
                        value={getPercentage(CARTORDERSPENGIFT, +total)}
                        page="Cart"
                      /> */}
                      <RangeSlider
                        price={formatCurrency(CARTORDERSPENTPRIORITY - +total)}
                        linkTo="/shop"
                        type={cartType}
                        showHintText={+total < CARTORDERSPENTPRIORITY}
                        shppingExpressPriority="priority"
                        value={getPercentage(CARTORDERSPENTPRIORITY, +total)}
                        isDisabled={true}
                        page="Cart"
                      />
                      <RangeSlider
                        isDisabled={true}
                        price={formatCurrency(CARTORDERSPENTEXPRESS - +total)}
                        linkTo="/shop"
                        type={cartType}
                        showHintText={+total < CARTORDERSPENTEXPRESS}
                        shppingExpressPriority="express"
                        value={getPercentage(CARTORDERSPENTEXPRESS, +total)}
                        page="Cart"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="max-w-[381px] sm:hidden sm:w-0 sm:max-w-[0] sm:pt-0 md:block md:pt-[64px] from834:hidden from834:pt-0 lg:w-0 lg:max-w-[0] xl:w-0">
                      <CartPageRightSide
                        prices={totals}
                        coupons={coupons}
                        removeCouponLoading={removeCouponLoading}
                        shippingRates={shipping_rates}
                        handleRemoveCouponCode={handleRemoveCouponCode}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[40px] hidden md:hidden md:w-[100%] md:max-w-[50%] from834:block lg:block lg:w-full lg:max-w-[434px] xl:mt-[24px] xl:hidden">
                <CartPageRightSide
                  prices={totals}
                  coupons={coupons}
                  removeCouponLoading={removeCouponLoading}
                  shippingRates={shipping_rates}
                  handleRemoveCouponCode={handleRemoveCouponCode}
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full max-w-[381px] sm:max-w-[100%] md:hidden lg:hidden xl:block">
            <CartPageRightSide
              prices={totals}
              coupons={coupons}
              removeCouponLoading={removeCouponLoading}
              shippingRates={shipping_rates}
              handleRemoveCouponCode={handleRemoveCouponCode}
            />
          </div>
        </div>
      ) : (
        <CartEmptyState
          page="cart-page"
          navigate={() => router.push("/shop/")}
        />
      )}
    </>
  );
};

export default CartPage;
