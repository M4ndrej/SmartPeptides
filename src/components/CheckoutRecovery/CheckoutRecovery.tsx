"use client";

import placeOrderAction, {
  PlaceOrderErrorProps,
} from "@/app/actions/checkout/place-order/actions";
import { UPDATE_PREVIEW_ORDER_ID } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import { fetcher } from "@/helpers/fetchers";
import { CheckoutFailedPaymentModal } from "@/modals/CheckoutFailedPaymentModal";
import { ShippingAddress } from "@/types/cart_types";
import { Billing, Order, Shipping } from "@/types/orders";
import { PaymentMethods } from "@/types/payment";
import { AvailablePayments } from "@/types/payments";
import { LoggedUserData, SpecificUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import useSWR from "swr";
import BillingAddress from "../Checkout/BillingAddress/BillingAddress";
import Logo from "../Logo/Logo";
import SubmitButton from "../SubmitButton/SubmitButton";
import CheckoutRecoveryCheckboxes from "./CheckoutRecoveryCheckboxes";
import CheckoutRecoveryHiddenFields from "./CheckoutRecoveryHiddenFields";
import CheckoutRecoveryOrderInfo from "./CheckoutRecoveryOrderInfo";
import CheckoutRecoveryOrderItems from "./CheckoutRecoveryOrderItems";
import CheckoutRecoveryPaymentMethods from "./CheckoutRecoveryPaymentMethods";
import { createPeptenCardRedirect } from "@/helpers/checkout_helpers";

const checkAddressEquality = (order: Order) => {
  const { billing, shipping } = order;
  if (!billing || !shipping) return false;

  const shippingKeys = Object.keys(shipping);
  const billingKeys = Object.keys(billing).filter((k) => k !== "email");

  for (const key of billingKeys) {
    if (
      shippingKeys.includes(key) &&
      billing[key as keyof Billing] !== shipping[key as keyof Shipping]
    ) {
      return false;
    }
  }
  return true;
};

interface CheckoutRecoveryProps {
  userData?: LoggedUserData;
  order: Order;
  orderId: number;
  availablePayments?: AvailablePayments;
}

const CheckoutRecovery: FC<CheckoutRecoveryProps> = ({
  userData,
  order,
  orderId,
  availablePayments,
}) => {
  const { dispatch } = useThemeContext();
  const router = useRouter();

  const email = userData?.user?.email || order.billing.email;
  const { data: bannedData } = useSWR(
    `/api/cart/check_email?email=${email ?? ""}`,
    fetcher
  );

  // FOR PAYPAL
  const { data: specificUser } = useSWR<SpecificUser>(
    "/api/user/specific_user",
    fetcher
  );

  const [sameAddresses, setSameAddresses] = useState(
    checkAddressEquality(order)
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [fieldsError, setFieldsError] = useState<PlaceOrderErrorProps>();
  const [billingAddress, setBillingAddress] = useState<
    Partial<ShippingAddress> & { email?: string }
  >(order.billing);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethods>(order.payment_method as PaymentMethods);

  const [isAcceptingTerms, setIsAcceptingTerms] = useState(false);
  const [isAcceptingPrivacy, setIsAcceptingPrivacy] = useState(false);

  const [paymentFailedModalOpen, setPaymentFailedModalOpen] = useState(false);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState("");

  const handlePlaceOrderAction = async (formData: FormData) => {
    const placeOrder = await placeOrderAction(formData, orderId);

    setFieldsError({});
    if (placeOrder?.errors) {
      setFieldsError(placeOrder?.errors);
      return;
    }

    if (placeOrder.error) {
      setPaymentFailedMessage(placeOrder.error);
      setPaymentFailedModalOpen(true);
      return;
    }

    const result = placeOrder.success;

    if (
      [
        "coinbase",
        "nowpayments_gateway",
        "fiatsystems",
        "unipayment",
        "egift-certificate",
        "oaktree",
        "placetopay",
      ].includes(result?.payment_method) &&
      result?.payment_result?.redirect_url
    ) {
      return router.push(result.payment_result.redirect_url);
    }

    // Handle peptide_card payment with server-side encryption
    if (result?.payment_method === "peptide_card") {
      const redirectResult = await createPeptenCardRedirect(
        email,
        result.order_id,
        +order.total * 100
      );

      if (redirectResult.redirectUrl) {
        return (window.location.href = redirectResult.redirectUrl);
      } else {
        setPaymentFailedMessage(
          redirectResult.error || "Failed to create payment redirect"
        );
        setPaymentFailedModalOpen(true);
        return;
      }
    }

    if (
      result?.payment_method === "dfinsell" &&
      result?.payment_result?.payment_details
    ) {
      const details = result.payment_result.payment_details;
      const redirectUrl = details?.find(
        (d: any) => d?.key === "payment_link"
      )?.value;
      return router.push(redirectUrl);
    }

    dispatch({
      type: UPDATE_PREVIEW_ORDER_ID,
      payload: result.order_id,
    });
    router.push(`/thank-you`);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex min-h-screen w-full justify-center">
          <div className="container-padding-inline w-full max-w-[677px] overflow-hidden bg-white py-[30px]">
            {/* Logo */}
            <div className="mb-10 flex w-full items-center justify-center">
              <Logo customClass="headerLogo" />
            </div>
            <form
              className="flex flex-col items-center justify-center gap-10"
              action={handlePlaceOrderAction}
              noValidate={true}
            >
              <CheckoutRecoveryOrderInfo order={order} />
              <CheckoutRecoveryOrderItems order={order} />
              <CheckoutRecoveryHiddenFields order={order} />
              <BillingAddress
                sameAsShippingAddress={sameAddresses}
                fieldsError={fieldsError}
                billing_address={billingAddress}
                setShippingAddress={setBillingAddress}
                setSameAsShippingAddress={setSameAddresses}
                isRecovery={true}
              />
              <CheckoutRecoveryPaymentMethods
                fieldsError={fieldsError}
                availablePayments={availablePayments}
                billingCountry={
                  billingAddress?.country ?? order.billing.country
                }
                isBannedEmail={bannedData?.is_banned_email}
                isPayPalUser={specificUser?.is_paypal_user}
                isAbakaUser={specificUser?.is_abaka_user}
                isStripeUser={specificUser?.is_stripe_user}
                selectedPaymentMethod={selectedPaymentMethod}
                updatePaymentMethod={setSelectedPaymentMethod}
              />
              <div>
                <CheckoutRecoveryCheckboxes
                  fieldsError={fieldsError}
                  acceptedTerms={isAcceptingTerms}
                  handleUpdateTerms={() =>
                    setIsAcceptingTerms(!isAcceptingTerms)
                  }
                  isPrivacyAccepted={isAcceptingPrivacy}
                  handleUpdatePrivacy={() =>
                    setIsAcceptingPrivacy(!isAcceptingPrivacy)
                  }
                />
                <SubmitButton
                  ref={buttonRef}
                  customClass="inline-flex h-[48px] w-[100%] cursor-pointer select-none items-center justify-center rounded-[5px] border border-[#E7461E] bg-[#E7461E] px-[32px] py-[12px] font-medium text-[#E7461E] text-textWhite transition-all duration-300 hover:bg-[#E7461E] hover:text-white sm:w-full"
                  showSpiner
                  reverseColors
                  highlighted
                  text="PLACE ORDER"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <CheckoutFailedPaymentModal
        paymentFailedMessage={paymentFailedMessage}
        paymentFailedModalOpen={paymentFailedModalOpen}
        handleClosePaymentFailed={async () => setPaymentFailedModalOpen(false)}
      />
    </>
  );
};

export default CheckoutRecovery;
