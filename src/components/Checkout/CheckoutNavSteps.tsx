"use client";

import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Dispatch, FC, Fragment, SetStateAction, useMemo } from "react";

interface CheckoutNavStepsProps {
  paymentStep: number;
  setPaymentStep: Dispatch<SetStateAction<number>>;
  cartData?: CartResponse;
  isValidateEmail?: boolean;
}

const CheckoutNavSteps: FC<CheckoutNavStepsProps> = ({
  paymentStep,
  cartData,
  setPaymentStep,
  isValidateEmail,
}) => {
  const steps = ["Cart", "Information", "Shipping", "Payment"];
  const router = useRouter();

  const isSecondStepBlocked = useMemo(() => {
    return (
      !isValidateEmail ||
      !cartData?.cart?.billing_address?.email ||
      !cartData?.cart?.billing_address?.state ||
      !cartData?.cart?.billing_address?.postcode ||
      !cartData?.cart?.billing_address?.address_1
    );
  }, [cartData, isValidateEmail]);

  const isThirdStepBlocked = useMemo(
    () => isSecondStepBlocked || !cartData?.cart?.shipping_rates?.length,
    [isSecondStepBlocked, cartData]
  );

  const onStepClick = (step: number) => {
    if (
      step < 0 ||
      step > 3 ||
      step === paymentStep ||
      (step === 2 && isSecondStepBlocked) ||
      (step === 3 && isThirdStepBlocked)
    ) {
      return;
    }

    if (step === 0) {
      router.push("/cart");
      return;
    }

    setPaymentStep(step);
  };

  return (
    <div className="font-D16px-M14px mb-[32px] mt-[48px] uppercase text-gray2 xs:text-[13px] xs:leading-[21px] md:my-[32px]">
      {steps.map((step, i) => (
        <Fragment key={step}>
          <span
            className={classNames(
              "cursor-pointer transition-colors duration-300 hover:text-gray dark:hover:text-gray",
              paymentStep === i && "font-bold text-darkgray dark:text-darkgray"
            )}
            onClick={() => onStepClick(i)}
          >
            {step}
          </span>
          {i !== steps.length - 1 && <span> {`>`} </span>}
        </Fragment>
      ))}
    </div>
  );
};

export default CheckoutNavSteps;
