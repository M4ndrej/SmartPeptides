"use client";

import { addCouponCode } from "@/app/actions/coupons/add/actions";
import { applyCouponStoreValue } from "@/app/actions/coupons/apply-coupon-store/actions";
import { removeCouponCode } from "@/app/actions/coupons/remove/actions";
import StoreCreditIcon from "@/components/Icons/StoreCreditIcon";
import XMarkIcon from "@/components/Icons/XMarkIcon";
import MyInput from "@/components/Input/MyInput";
import Spinner from "@/components/SvgComponents/Spinner";
import { formatCurrency } from "@/helpers/curency_format";
import { CartResponse } from "@/types/cart_types";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import AnimateHeight from "react-animate-height";
import { mutate } from "swr";
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorSuccessMessages/ErrorMessage";
import CouponIcon from "../../Icons/CouponIcon";

interface CheckoutCouponInputProps {
  cartData: CartResponse;
}

const CheckoutCouponInput: FC<CheckoutCouponInputProps> = ({ cartData }) => {
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState("");
  const [removeCouponLoading, setRemoveCouponLoading] = useState("");

  const appliedCoupon = cartData?.cart?.coupons[0];
  const redeemedCoupon = cartData?.cart?.applied_coupon_store_credit;
  const couponAmount = Number(appliedCoupon?.amount) || 0;
  const couponPercent = appliedCoupon?.applied_percentage || 0;

  const changeCouponCode = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    setCouponCodeInput(fieldValue);
  };

  const hadnleAddingCouponCode = async () => {
    const apply_code = await addCouponCode(couponCodeInput);
    if (apply_code.success) {
      await mutate("/api/cart/get_cart");

      setShowErrorMessage(false);
      setCouponCodeInput("");
    } else {
      setShowErrorMessage(true);
      setErrorMessageText(apply_code.errors);
    }
  };

  const handleCouponStoreValue = async () => {
    setShowErrorMessage(false);
    setErrorMessageText("");
    const couponCode = appliedCoupon?.code || couponCodeInput;
    const response = await applyCouponStoreValue(couponCode);

    if (response.success) {
      await mutate("/api/cart/get_cart");
    } else {
      setShowErrorMessage(true);
      setErrorMessageText(response.errors);
    }
  };

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
      setCouponCodeInput("");
    } else {
    }
  };

  return (
    <>
      <div className="mt-[24px] flex flex-col  rounded-[5px] border-[2px] border-dashed border-borderColor bg-gray5 px-[16px]">
        <div className="group my-[24px] flex w-fit items-center gap-[8px]">
          <CouponIcon customClass=" transition duration-200" />
          <p className="font-D16px-M13px transition duration-200  ">
            Have a coupon code?
          </p>
        </div>
        <div className="flex flex-col gap-[16px] pb-[24px] xl:flex-row">
          <MyInput
            label="Coupon code"
            required={false}
            name="coupon_code"
            disabled={!!(appliedCoupon?.code || redeemedCoupon?.code)}
            value={
              appliedCoupon?.code || redeemedCoupon?.code || couponCodeInput
            }
            onChange={changeCouponCode}
            containerClassName="w-full xl:max-w-[224px]"
            icon={
              removeCouponLoading == appliedCoupon?.code ? (
                <div className="h-[24px] w-[24px]">
                  <Spinner customClass="mr-[8px]" />
                </div>
              ) : (
                appliedCoupon && (
                  <div className="h-[24px] w-[24px]">
                    <XMarkIcon
                      width={24}
                      height={24}
                      className="cursor-pointer !stroke-gray3"
                      onClick={() =>
                        !removeCouponLoading
                          ? handleRemoveCouponCode(
                              appliedCoupon?.code ||
                                redeemedCoupon?.code ||
                                couponCodeInput
                            )
                          : {}
                      }
                    />
                  </div>
                )
              )
            }
          />
          <Button
            onPress={hadnleAddingCouponCode}
            showSpiner
            disabled={!!(appliedCoupon?.code || redeemedCoupon?.code)}
            text={
              appliedCoupon?.code || redeemedCoupon?.code ? "APPLIED" : "APPLY"
            }
            customClass={`!px-[25px] min-w-[173px] ${(appliedCoupon || redeemedCoupon) && "bg-gray4 text-gray2 border-none hover:!bg-gray4 hover:!text-gray2"}`}
          />
        </div>
        {showErrorMessage && (
          <div className="mb-[24px] mt-[-8px]">
            <ErrorMessage
              message={errorMessageText}
              hideErrorMessage={() => setShowErrorMessage(false)}
            />
          </div>
        )}
        <AnimateHeight
          height={appliedCoupon || redeemedCoupon ? "auto" : 0}
          duration={300}
        >
          {/* {(appliedCoupon || redeemedCoupon) && ( */}
          <div className="relative ">
            <div className="mt-1 h-[1px] bg-gray4"></div>
            <Image
              src={"/images/cryptoRecommend.svg"}
              width={121}
              height={26}
              alt="cryptoRecommend"
              className="absolute top-[-4px] h-[26px] w-[121px] -translate-x-1/2 transform sm:left-[260px] md:left-[200px] from834:left-[230px] lg:left-[310px] xl:left-[320px]"
            />
            <div className="mb-4 mt-[30px] grid gap-2">
              <div className="text-[13px] text-darkgray">
                You can turn{" "}
                {couponPercent
                  ? couponPercent
                  : redeemedCoupon?.percentage
                    ? redeemedCoupon.percentage / 2
                    : 0}
                % into{" "}
                {couponPercent
                  ? couponPercent * 2
                  : redeemedCoupon?.percentage ?? 0}
                % if you redeem this coupon to store credit.
              </div>
              <div className="text-[13px] text-darkgray">
                <span className="font-bold">NOTE:</span> Newly earned store
                credit can be used in next order
              </div>
            </div>
            <Button
              text={`${!redeemedCoupon ? "REDEEM NOW" : "REDEEMED"}`}
              showSpiner
              disabled={!!redeemedCoupon}
              customClass={`!w-full mb-6 ${redeemedCoupon && "bg-gray4 text-gray2 border-none hover:!bg-gray4 hover:!text-gray2"}`}
              onPress={handleCouponStoreValue}
            />
          </div>
          {/* )} */}
        </AnimateHeight>
      </div>

      {(appliedCoupon || redeemedCoupon) && (
        <div>
          <div className="mt-4 rounded-[5px] border-[2px] border-dashed border-[#9A9A9F] bg-[#f0f0f0] p-4 text-[16px] dark:bg-transparent">
            {redeemedCoupon && (
              <div className="mb-4 flex items-center gap-[8px] text-darkgray sm:items-start md:items-start">
                <StoreCreditIcon
                  customClass={`transition duration-300 sm:mt-1 md:mt-1`}
                />
                Store credit that can be used for next order.
              </div>
            )}
            <div className="flex justify-between  md:flex md:flex-col md:gap-[8px] from834:flex-row">
              <div
                className={`text-darkgray ${redeemedCoupon && "md:hidden from834:block"}`}
              >
                {appliedCoupon ? "Potential store credit" : "Amount"} (
                {appliedCoupon ? couponPercent * 2 : redeemedCoupon?.percentage}
                %)
              </div>
              <div className="text-darkgray">
                {formatCurrency(
                  appliedCoupon
                    ? couponAmount * 2
                    : redeemedCoupon?.amount ?? 0,
                  false,
                  false
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutCouponInput;
