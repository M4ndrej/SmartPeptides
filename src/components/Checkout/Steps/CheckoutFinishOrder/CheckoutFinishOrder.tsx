"use client";
import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";
import { formatCurrency } from "@/helpers/curency_format";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useCheckoutData } from "@/hooks/useCheckoutData";
import { CartResponse, ShippingAddress } from "@/types/cart_types";
import { AvailablePayments } from "@/types/payments";
import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import Checkbox from "../../../Checkbox/Checkbox";
import BillingAddress from "../../BillingAddress/BillingAddress";
import CheckoutPaymentMethods from "./CheckoutPaymentMethods";

interface CheckoutFinishOrderProps {
  cartData?: CartResponse;
  fieldsError?: PlaceOrderErrorProps;
  availablePayments?: AvailablePayments;
  changeStep: (step: number) => void;
  isBannedEmail?: boolean;
  isPayPalUser?: boolean;
  isAbakaUser?: boolean;
  isStripeUser?: boolean;
}

export const CheckoutFinishOrder: FC<CheckoutFinishOrderProps> = ({
  cartData,
  fieldsError,
  availablePayments,
  changeStep,
  isBannedEmail,
  isPayPalUser,
  isAbakaUser,
  isStripeUser,
}) => {
  // state hooks
  const {
    acceptedTerms,
    isPrivacyAccepted,
    isSameAsShippingAddress,
    customer_note,
    handleUpdateTerms,
    handleUpdatePrivacy,
    handleUpdateSameAsShippingAdderss,
  } = useCheckoutContext();

  // Checkout hook data
  const { checkoutData } = useCheckoutData();

  const { shipping_address, billing_address } = checkoutData || {};

  const [billingAddress, setBillingAddress] = useState<
    Partial<ShippingAddress> & { email?: string }
  >(billing_address || { email: "" });

  // Update billing address when "Same as shipping address" is selected
  useEffect(() => {
    if (isSameAsShippingAddress && shipping_address) {
      setBillingAddress({
        ...shipping_address,
        email: billing_address?.email,
      });
    }
  }, [isSameAsShippingAddress, shipping_address, billing_address?.email]);

  const selectedShippmentMethod = useMemo(() => {
    return cartData?.cart?.shipping_rates?.find((rate) => rate.selected);
  }, [cartData]);

  return (
    <>
      <div className="mb-[32px] rounded-[5px] border border-borderColor p-[24px] sm:p-[16px]">
        <div className="flex items-center justify-between sm:items-start md:items-start">
          <div className="flex gap-[32px] sm:grid sm:gap-[8px] md:grid md:gap-[8px]">
            <span className="font-D16px-M13px text-nowrap">Contact</span>
            <span className="font-D16px-M13px font-bold">
              {billing_address?.email}
            </span>
          </div>
          <button
            className="font-D16px-M13px flex self-start text-gray2 "
            onClick={async () => changeStep(1)}
          >
            Change
          </button>
        </div>
        <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
        <div className="flex items-center justify-between sm:items-start md:items-start">
          <div className="flex gap-[39px] sm:grid sm:gap-[8px] md:grid md:gap-[8px]">
            <span className="font-D16px-M13px text-nowrap">Ship to</span>
            <span className="font-D16px-M13px font-bold md:max-w-[320px] lg:max-w-[320px] xl:max-w-full">
              {`${shipping_address?.address_1}, ${shipping_address?.city}, ${shipping_address?.state} ${shipping_address?.postcode}`}
            </span>
          </div>
          <button
            className="font-D16px-M13px flex self-start text-gray2 "
            onClick={async () => changeStep(2)}
          >
            Change
          </button>
        </div>
        <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
        <div className="flex items-center justify-between sm:items-start md:items-start">
          <div className="flex gap-[32px] sm:grid sm:gap-[8px] md:grid md:gap-[8px]">
            <span className="font-D16px-M13px text-nowrap">Method</span>
            <span className="font-D16px-M13px font-bold">
              {selectedShippmentMethod && (
                <>
                  <div
                    className={`xl:inline ${selectedShippmentMethod.label.includes("[Free Shipping]") ? "lg:block" : "lg:inline"} sm:inline`}
                  >
                    {selectedShippmentMethod.label
                      .replace("working", "")
                      .replace("[Free Shipping]", "")}
                    {!selectedShippmentMethod.label.includes(
                      "[Free Shipping]"
                    ) && (
                      <>
                        : {formatCurrency(+selectedShippmentMethod.cost, true)}
                      </>
                    )}
                  </div>
                  {selectedShippmentMethod.label.includes(
                    "[Free Shipping]"
                  ) && (
                    <div className="sm:inline lg:block xl:inline">
                      [Free Shipping]:{" "}
                      {formatCurrency(+selectedShippmentMethod.cost, true)}
                    </div>
                  )}
                </>
              )}
            </span>
          </div>
          <button
            className="font-D16px-M13px flex self-start text-gray2 "
            onClick={async () => changeStep(2)}
          >
            Change
          </button>
        </div>
      </div>

      {/* {checkoutData?.shipping_address?.country === "US" && ( */}
      <BillingAddress
        sameAsShippingAddress={isSameAsShippingAddress}
        fieldsError={fieldsError}
        billing_address={billingAddress}
        setShippingAddress={setBillingAddress}
        setSameAsShippingAddress={handleUpdateSameAsShippingAdderss}
      />
      {/* )} */}

      <div>
        <div className="mb-[16px]">
          <div className="mb-[8px] grid">
            <span className="font-D18px-M16px mb-[8px] font-medium">
              Payment methods
            </span>
            <span className="font-D16px-M13px">
              All transactions are secure and encrypted.
            </span>
          </div>
          <CheckoutPaymentMethods
            fieldsError={fieldsError}
            availablePayments={availablePayments}
            billingCountry={billingAddress?.country ?? billing_address?.country}
            isBannedEmail={isBannedEmail}
            isPayPalUser={isPayPalUser}
            isAbakaUser={isAbakaUser}
            isStripeUser={isStripeUser}
          />
        </div>
        <span className="font-D16px-M13px">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </span>
        <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
        <div className="mb-[32px]">
          <div className="flex items-start gap-[8px] ">
            <div className="mt-[3px] min-w-[16px] max-w-[16px]">
              <Checkbox
                name="terms"
                checked={acceptedTerms}
                onChange={() => handleUpdateTerms()}
                errorInput={!!fieldsError?.terms}
                customErrorText={
                  fieldsError?.terms ? fieldsError?.terms[0] : ""
                }
              />
            </div>
            <span
              className="font-D16px-M13px cursor-pointer"
              onClick={() => handleUpdateTerms()}
            >
              I have read and agree to the website&nbsp;
              <Link href="/terms">
                <span className="cursor-pointer underline transition duration-300 hover:text-gray">
                  terms and conditions
                </span>
              </Link>
              <span className="text-red">&nbsp;*</span>
            </span>
          </div>
          {!!fieldsError?.terms && (
            <div className="font-12px-ALL my-[4px] text-red">
              {fieldsError?.terms
                ? fieldsError?.terms
                : "Field is required/invalid"}
            </div>
          )}
          <div className="mt-5 flex items-start gap-[8px] border-t border-borderColor pt-5">
            <div className="mt-[3px] min-w-[16px] max-w-[16px]">
              <Checkbox
                name="privacy"
                checked={isPrivacyAccepted}
                onChange={() => handleUpdatePrivacy()}
                errorInput={!!fieldsError?.privacy}
                customErrorText={
                  fieldsError?.privacy ? fieldsError?.privacy[0] : ""
                }
              />
            </div>
            <span
              className="font-D16px-M13px cursor-pointer"
              onClick={() => handleUpdatePrivacy()}
            >
              I agree that the products purchased on this website will not be
              used for human or animal consumption and/or ingestion of any kind.
              I am a licensed and/or qualified professional. I am at least 21
              years of age.&nbsp;
              <span className="text-red">&nbsp;*</span>
            </span>
          </div>
          {!!fieldsError?.privacy && (
            <div className="font-12px-ALL my-[4px] text-red">
              {fieldsError?.privacy
                ? fieldsError?.privacy
                : "Field is required/invalid"}
            </div>
          )}
        </div>
      </div>
      <input
        type="hidden"
        name="shipping_first_naem"
        value={shipping_address?.first_name}
      />
      <input
        type="hidden"
        name="shipping_last_name"
        value={shipping_address?.last_name}
      />
      <input
        type="hidden"
        name="shipping_address_1"
        value={shipping_address?.address_1}
      />
      <input
        type="hidden"
        name="shipping_address_2"
        value={shipping_address?.address_2 ?? undefined}
      />
      <input
        type="hidden"
        name="shipping_city"
        value={shipping_address?.city}
      />
      <input
        type="hidden"
        name="shipping_country"
        value={shipping_address?.country}
      />
      <input
        type="hidden"
        name="shipping_phone"
        value={shipping_address?.phone}
      />
      <input
        type="hidden"
        name="shipping_postcode"
        value={shipping_address?.postcode}
      />
      <input
        type="hidden"
        name="shipping_state"
        value={shipping_address?.state}
      />
      <input
        type="hidden"
        name="shipping_email"
        value={billing_address?.email}
      />
      <input type="hidden" name="customer_note" value={customer_note} />
    </>
  );
};
