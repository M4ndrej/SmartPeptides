"use client";

import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";
import { checkPaymentForCountry } from "@/helpers/payment_methods_helper";
import { PaymentMethods } from "@/types/payment";
import { AvailablePayments } from "@/types/payments";
import classNames from "classnames";
import { FC, useState } from "react";
import { mutate } from "swr";
import CheckoutPaymentOverlay from "../Checkout/Steps/CheckoutFinishOrder/CheckoutPaymentOverlay";
import CreditCardPaymentMethods from "../Checkout/Steps/CheckoutFinishOrder/CreditCardPaymentMethods";
import NonCreditCardPaymentMethods from "../Checkout/Steps/CheckoutFinishOrder/NonCreditPaymentMethods";

interface CheckoutRecoveryPaymentMethodsProps {
  activePaymentOption?: "authnet" | "quantumepay" | "nmi";
  availablePayments?: AvailablePayments;
  fieldsError?: PlaceOrderErrorProps;
  billingCountry?: string;
  isBannedEmail?: boolean;
  isPayPalUser?: boolean;
  isAbakaUser?: boolean;
  isStripeUser?: boolean;
  selectedPaymentMethod: PaymentMethods;
  updatePaymentMethod: (method: PaymentMethods) => void;
}

const CheckoutRecoveryPaymentMethods: FC<
  CheckoutRecoveryPaymentMethodsProps
> = ({
  availablePayments,
  fieldsError,
  billingCountry,
  isBannedEmail,
  isPayPalUser,
  isAbakaUser,
  isStripeUser,
  selectedPaymentMethod,
  updatePaymentMethod,
}) => {
  const [paymentMethodUpdating, setPaymentMethodUpdating] = useState("");

  const handleUpdatePaymentMethod = async (method: PaymentMethods) => {
    updatePaymentMethod(method);
    setPaymentMethodUpdating(method);
    await fetch(`/api/cart/updatecheckout?payment_method=${method}`, {
      method: "GET",
    });
    await mutate("/api/cart/get_cart");
    setPaymentMethodUpdating("");
  };

  const checkPaymentMethod = (method: PaymentMethods) => {
    const isEnabled = availablePayments?.[method]?.enabled === "yes";
    const isCountryAllowed = checkPaymentForCountry(method, billingCountry);
    if (method === "pepten_card" && !isStripeUser) {
      return false;
    }
    if (method === "peptide-paypal" && !isPayPalUser) {
      return false;
    }
    if (method === "gwpaymentplugin" && !isAbakaUser) {
      return false;
    }
    return isEnabled && isCountryAllowed;
  };

  if (!availablePayments) return null;
  return (
    <div
      className={classNames(
        "relative w-full overflow-hidden rounded-[5px] bg-lightgray p-6",
        paymentMethodUpdating && "pointer-events-none"
      )}
    >
      <CheckoutPaymentOverlay />
      {billingCountry !== "US" && !isBannedEmail && (
        <CreditCardPaymentMethods
          selectedPaymentMethod={selectedPaymentMethod}
          handleUpdatePaymentMethod={handleUpdatePaymentMethod}
          checkPaymentMethod={checkPaymentMethod}
          paymentMethodUpdating={paymentMethodUpdating}
          fieldsError={fieldsError}
          availablePayments={availablePayments}
        />
      )}
      <NonCreditCardPaymentMethods
        selectedPaymentMethod={selectedPaymentMethod}
        handleUpdatePaymentMethod={handleUpdatePaymentMethod}
        checkPaymentMethod={checkPaymentMethod}
        paymentMethodUpdating={paymentMethodUpdating}
        availablePayments={availablePayments}
      />
      {billingCountry === "US" && !isBannedEmail && (
        <CreditCardPaymentMethods
          selectedPaymentMethod={selectedPaymentMethod}
          handleUpdatePaymentMethod={handleUpdatePaymentMethod}
          checkPaymentMethod={checkPaymentMethod}
          paymentMethodUpdating={paymentMethodUpdating}
          fieldsError={fieldsError}
          availablePayments={availablePayments}
        />
      )}
    </div>
  );
};

export default CheckoutRecoveryPaymentMethods;
