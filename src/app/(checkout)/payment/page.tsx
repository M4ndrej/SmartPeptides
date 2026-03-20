"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";

// actions
import placeOrderAction, {
  PlaceOrderErrorProps,
} from "@/app/actions/checkout/place-order/actions";

// classname
import classNames from "classnames";

// fetchers
import { fetcher } from "@/helpers/fetchers";

// types
import { CartResponse } from "@/types/cart_types";
import { AvailablePayments } from "@/types/payments";

// components
import CheckoutNavSteps from "@/components/Checkout/CheckoutNavSteps";
import CheckoutRightSide from "@/components/Checkout/CheckoutRightSide/CheckoutRightSide";
import CheckoutViewOrderMob from "@/components/Checkout/CheckoutViewOrderMob";
import { CheckoutFinishOrder } from "@/components/Checkout/Steps/CheckoutFinishOrder";
import { CheckoutShippingAddress } from "@/components/Checkout/Steps/CheckoutShippingAddress";
import { CheckoutShippingMethods } from "@/components/Checkout/Steps/CheckoutShippingMethods";
import Logo from "@/components/Logo/Logo";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { CheckoutFailedPaymentModal } from "@/modals/CheckoutFailedPaymentModal";

// hooks
import CheckoutCouponInput from "@/components/Checkout/CheckoutRightSide/CheckoutCouponInput";
import CheckoutStoreCredit from "@/components/Checkout/CheckoutRightSide/CheckoutStoreCredit";
import DiscountInfo from "@/components/Checkout/CheckoutRightSide/DiscountInfo";
import { UPDATE_PREVIEW_ORDER_ID } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import { redirectMethods } from "@/data/payment_methods";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { SpecificUser } from "@/types/user";
import { createPeptenCardRedirect } from "@/helpers/checkout_helpers";
import SelectPaymentMethod from "@/components/SelectPaymentMethod/SelectPaymentMethod";

const Checkout: FC = ({}) => {
  const { isUpdateShipping, selectedPaymentMethod } = useCheckoutContext();
  const [selectPaymentMethodModalOpen, setSelectPaymentMethodModalOpen] =
    useState(false);

  const { dispatch } = useThemeContext();

  // hooks
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // GET CART DATA INFO
  const {
    data: cartData,
    isLoading: isCartLoading,
    isValidating: isCartValidating,
  } = useSWR<CartResponse>("/api/cart/get_cart", fetcher);

  const { data: bannedData } = useSWR(
    `/api/cart/check_email?email=${cartData?.cart?.billing_address?.email ?? ""}`,
    fetcher
  );

  // GET AVAILABLE PAYMENTS
  const { data: availablePayments } = useSWR<AvailablePayments>(
    `/api/payment_methods`,
    fetcher
  );

  // FOR PAYPAL AND STRIPE
  const { data: specificUser } = useSWR<SpecificUser>(
    "/api/user/specific_user",
    fetcher
  );

  useEffect(() => {
    const nOfItems = cartData?.cart?.items_count;
    if (!isCartLoading && !isCartValidating && !nOfItems) {
      router.push("/shop");
    }
  }, [isCartLoading, isCartValidating, cartData]);

  // hook states
  const [isValidatedEmail, setIsValidatedEmail] = useState(false);
  const [fieldsError, setFieldsError] = useState<PlaceOrderErrorProps>();
  const [paymentFailedModalOpen, setPaymentFailedModalOpen] = useState(false);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState("");
  const [cartUpdate, setCartUpdate] = useState(false);

  const hasCoupon = useMemo(
    () => cartData?.cart?.coupons?.some((c) => c.code !== "store credit"),
    [cartData]
  );
  const hasStoreCredit = useMemo(
    () => cartData?.cart?.coupons?.some((c) => c.code === "store credit"),
    [cartData]
  );

  const [paymentStep, setPaymentStep] = useState(1);

  const handleClosePaymentFailed = async () => {
    setPaymentFailedModalOpen(false);
  };

  const handlePlaceOrderAction = async (formData: FormData) => {
    if (!selectedPaymentMethod) {
      setSelectPaymentMethodModalOpen(true);
      return;
    }
    const placeOrder = await placeOrderAction(formData);

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
      redirectMethods.includes(result?.payment_method) &&
      result?.payment_result?.redirect_url
    ) {
      return router.push(result.payment_result.redirect_url);
    }

    // Handle ppsliving_card payment with server-side encryption
    if (result?.payment_method === "ppsliving_card") {
      const redirectResult = await createPeptenCardRedirect(
        cartData?.cart?.billing_address?.email || "",
        result.order_id,
        cartData?.cart?.totals?.price || 0
      );
      if (redirectResult.redirectUrl) {
        return (window.location.href = redirectResult.redirectUrl);
      } else {
        setPaymentFailedMessage(
          redirectResult?.error || "Failed to create payment redirect"
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
        <div className="flex min-h-screen w-full justify-between">
          <div className="container-padding-inline ml-auto w-full max-w-[774px] overflow-hidden bg-white pb-[112px] pt-[30px] sm:px-0 sm:pb-[16px] sm:pt-[20px] xl:px-[48px] ">
            {/* Logo */}
            <Logo customClass="headerLogo" />

            {/* Steps */}
            <CheckoutNavSteps
              paymentStep={paymentStep}
              cartData={cartData}
              setPaymentStep={setPaymentStep}
              isValidateEmail={isValidatedEmail}
            />

            {/* Mobile view order page */}
            <div className="relative mt-[24px] hidden rounded-[5px] bg-lightgray sm:block">
              {/* Toogler for order view on mobile */}
              <CheckoutViewOrderMob cartData={cartData}>
                <CheckoutRightSide
                  paymentStep={paymentStep}
                  recalculation={isUpdateShipping}
                  cartData={cartData}
                  isCartLoading={isCartLoading || isCartValidating}
                  cartUpdate={cartUpdate}
                  setCartUpdate={setCartUpdate}
                />
              </CheckoutViewOrderMob>
            </div>

            <div className="md:hidden lg:hidden xl:hidden">
              {cartData && !hasCoupon && !hasStoreCredit && (
                <CheckoutCouponInput cartData={cartData} />
              )}
            </div>

            <div className="md:hidden lg:hidden xl:hidden">
              {!hasCoupon && !hasStoreCredit && (
                <CheckoutStoreCredit
                  setCartUpdate={setCartUpdate}
                  isMobile={true}
                />
              )}
            </div>

            {/* <div className="md:hidden lg:hidden xl:hidden">
              <DiscountInfo />
            </div> */}

            {/* First Step */}
            {paymentStep === 1 && (
              <div
                className={classNames({
                  "pointer-events-none opacity-20":
                    isUpdateShipping || isCartLoading,
                })}
              >
                <CheckoutShippingAddress
                  changeStep={setPaymentStep}
                  isValidatedEmail={isValidatedEmail}
                  setIsValidatedEmail={setIsValidatedEmail}
                />
              </div>
            )}
            {paymentStep === 2 && (
              <CheckoutShippingMethods
                cartData={cartData}
                changeStep={setPaymentStep}
              />
            )}
            {paymentStep === 3 && (
              <div
                className={classNames({
                  "pointer-events-none opacity-20": isUpdateShipping,
                })}
              >
                <form action={handlePlaceOrderAction} noValidate={true}>
                  <CheckoutFinishOrder
                    availablePayments={availablePayments}
                    cartData={cartData}
                    fieldsError={fieldsError}
                    changeStep={setPaymentStep}
                    isBannedEmail={bannedData?.is_banned_email}
                    isPayPalUser={specificUser?.is_paypal_user}
                    isAbakaUser={specificUser?.is_abaka_user}
                    isStripeUser={specificUser?.is_stripe_user}
                  />
                  <SubmitButton
                    ref={orderButtonRef}
                    customClass="inline-flex h-[48px] w-[100%] cursor-pointer select-none items-center justify-center rounded-[5px] border border-[#E7461E] bg-[#E7461E] px-[32px] py-[12px] font-medium text-[#E7461E] text-textWhite transition-all duration-300 hover:bg-[#E7461E] hover:text-white sm:w-full"
                    showSpiner
                    reverseColors
                    highlighted
                    text="PLACE ORDER"
                  />
                </form>
              </div>
            )}
          </div>
          {/* Right side */}
          <div className="w-full max-w-[43.4%] bg-lightgray px-[16px] py-[80px] sm:hidden xl:px-[48px]">
            <div className="relative h-full w-full max-w-full xl:max-w-[427px]">
              <CheckoutRightSide
                paymentStep={paymentStep}
                recalculation={isUpdateShipping}
                cartData={cartData}
                isCartLoading={isCartLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <CheckoutFailedPaymentModal
        paymentFailedModalOpen={paymentFailedModalOpen}
        handleClosePaymentFailed={handleClosePaymentFailed}
        paymentFailedMessage={paymentFailedMessage}
      />
      <SelectPaymentMethod
        isOpen={selectPaymentMethodModalOpen}
        setIsOpen={setSelectPaymentMethodModalOpen}
      />
    </>
  );
};

export default Checkout;
