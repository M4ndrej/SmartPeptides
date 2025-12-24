"use client";
import { FC, Fragment, useEffect, useState } from "react";
import { mutate } from "swr";

// types
import { CartResponse } from "@/types/cart_types";

// helpers
import { formatCurrency } from "@/helpers/curency_format";

// actions
import updateCheckoutShippingRates from "@/app/actions/checkout/update-shipping-rates/actions";

// hooks
import { useCheckoutData } from "@/hooks/useCheckoutData";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";

// components
import Button from "@/components/Button/Button";

interface CheckoutShippingMethodsProps {
  changeStep: (step: number) => void;
  cartData?: CartResponse;
}

export const CheckoutShippingMethods: FC<CheckoutShippingMethodsProps> = ({
  cartData,
  changeStep,
}) => {
  // hooks
  const { updateCartUpdateStatus, customer_note, updateCustomerNote } =
    useCheckoutContext();
  const [selectedShippment, setSelectedShippment] = useState<string>();
  // Checkout hook data
  const { checkoutData } = useCheckoutData();

  const handleupdateCartRate = async (rate_id: string) => {
    updateCartUpdateStatus(true);
    setSelectedShippment(rate_id);
    const updateRate = await updateCheckoutShippingRates(rate_id);

    if (updateRate.success) {
      await mutate("/api/cart/get_cart");
    }

    updateCartUpdateStatus(false);
  };

  const { billing_address, shipping_address } = checkoutData || {};

  useEffect(() => {
    if (cartData) {
      const selected_rate = cartData?.cart.shipping_rates.find(
        (rate) => rate.selected
      );
      setSelectedShippment(selected_rate?.id || "");
    }
  }, [cartData]);

  return (
    <>
      {/* Warning */}
      {cartData!?.cart.shipping_rates?.length === 0 && (
        <div className="font-D16px-M13px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:min-w-[24px]"
          >
            <path
              d="M30.2482 24.5452L18.797 4.29609C18.5108 3.8 18.1023 3.38866 17.6119 3.10285C17.1216 2.81704 16.5663 2.66669 16.0013 2.66669C15.4363 2.66669 14.881 2.81704 14.3907 3.10285C13.9003 3.38866 13.4918 3.8 13.2056 4.29609L1.75442 24.5452C1.47908 25.0251 1.33398 25.5708 1.33398 26.1265C1.33398 26.6823 1.47908 27.228 1.75442 27.7079C2.0369 28.207 2.44472 28.6205 2.93602 28.9062C3.42731 29.1918 3.9844 29.3392 4.55011 29.3332H27.4525C28.0178 29.3387 28.5743 29.1911 29.0651 28.9055C29.5559 28.6199 29.9633 28.2066 30.2456 27.7079C30.5213 27.2283 30.6669 26.6826 30.6673 26.1269C30.6678 25.5712 30.5231 25.0253 30.2482 24.5452ZM28.432 26.6399C28.3321 26.8133 28.1888 26.9565 28.0167 27.0549C27.8446 27.1533 27.6499 27.2033 27.4525 27.1999H4.55011C4.35274 27.2033 4.15802 27.1533 3.9859 27.0549C3.81378 26.9565 3.67046 26.8133 3.57063 26.6399C3.48021 26.484 3.43251 26.3063 3.43251 26.1252C3.43251 25.9442 3.48021 25.7664 3.57063 25.6105L15.0218 5.36141C15.1237 5.18885 15.2676 5.04605 15.4397 4.94692C15.6118 4.84778 15.8062 4.79568 16.0039 4.79568C16.2017 4.79568 16.396 4.84778 16.5681 4.94692C16.7402 5.04605 16.8842 5.18885 16.986 5.36141L28.4372 25.6105C28.5269 25.7669 28.5736 25.9449 28.5727 26.1259C28.5718 26.307 28.5232 26.4845 28.432 26.6399ZM14.9537 18.6666V13.3333C14.9537 13.0504 15.0641 12.7791 15.2606 12.5791C15.457 12.3791 15.7235 12.2667 16.0013 12.2667C16.2791 12.2667 16.5456 12.3791 16.742 12.5791C16.9385 12.7791 17.0489 13.0504 17.0489 13.3333V18.6666C17.0489 18.9495 16.9385 19.2208 16.742 19.4209C16.5456 19.6209 16.2791 19.7333 16.0013 19.7333C15.7235 19.7333 15.457 19.6209 15.2606 19.4209C15.0641 19.2208 14.9537 18.9495 14.9537 18.6666ZM17.5727 23.4666C17.5727 23.783 17.4805 24.0924 17.3078 24.3555C17.1352 24.6186 16.8898 24.8237 16.6026 24.9448C16.3155 25.0659 15.9996 25.0975 15.6947 25.0358C15.3899 24.9741 15.11 24.8217 14.8902 24.5979C14.6704 24.3742 14.5208 24.0891 14.4601 23.7787C14.3995 23.4683 14.4306 23.1466 14.5496 22.8543C14.6685 22.5619 14.8699 22.312 15.1283 22.1362C15.3867 21.9604 15.6905 21.8666 16.0013 21.8666C16.4181 21.8666 16.8177 22.0352 17.1124 22.3352C17.4071 22.6353 17.5727 23.0422 17.5727 23.4666Z"
              fill="#333333"
            />
          </svg>
          <p className="max-w-[605px]">
            No shipping selected. <br />
            Please double check your address (wrong zip code), or contact us for
            help.
          </p>
        </div>
      )}
      <div className="mb-[32px] grid content-between rounded-[5px] border border-borderColor p-[16px] sm:text-[14px] ">
        <div className="flex items-center  justify-between sm:items-start md:items-start">
          <div className="flex gap-[32px] sm:grid sm:gap-[8px] md:grid md:gap-[8px]">
            <span className="font-D16px-M13px text-nowrap">Contact</span>
            <span className="font-D16px-M13px font-bold">
              {billing_address?.email}
            </span>
          </div>
          <button
            onClick={async () => changeStep(1)}
            className="font-D16px-M13px flex cursor-pointer self-start text-gray2 transition duration-300 hover:text-[#E7461E]"
          >
            Change
          </button>
        </div>
        <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
        <div className="flex items-center justify-between sm:items-start md:items-start">
          <div className="flex gap-[39px] sm:grid sm:gap-[8px] md:grid md:gap-[8px]">
            <span className="font-D16px-M13px text-nowrap">Ship to</span>
            <span className="font-D16px-M13px font-bold">
              {`${shipping_address?.address_1}, ${shipping_address?.city}, ${shipping_address?.state} ${shipping_address?.postcode}`}
            </span>
          </div>
          <button
            onClick={async () => changeStep(1)}
            className="font-D16px-M13px flex cursor-pointer self-start text-gray2 transition duration-300 hover:text-[#E7461E]"
          >
            Change
          </button>
        </div>
      </div>
      <div className="mb-[32px] grid sm:text-[14px]">
        <span className="font-D18px-M16px mb-[20px] font-medium sm:mb-[16px]">
          Shipping methods
        </span>
        {cartData!?.cart.shipping_rates?.length > 0 ? (
          <div className="grid content-between rounded-[5px] border border-borderColor px-[24px] sm:px-[16px]">
            {cartData?.cart?.shipping_rates.map((shipping, index) => (
              <Fragment key={index}>
                <div className="my-4 flex items-center gap-[8px]">
                  <input
                    type="radio"
                    name="shippingOption"
                    checked={selectedShippment === shipping.id}
                    onChange={() => handleupdateCartRate?.(shipping.id)}
                    className="h-[14px] cursor-pointer rounded-[5px] border border-borderColor px-[16px] py-[12px] outline-0"
                  />
                  <span
                    className="font-D16px-M13px cursor-pointer"
                    onClick={() => handleupdateCartRate?.(shipping.id)}
                  >
                    {shipping.label.replace("working", "")}:{" "}
                    {formatCurrency(
                      +shipping.cost,
                      true,
                      shipping.label.includes("[Free Shipping]")
                    )}
                  </span>
                </div>
                {index !== cartData?.cart.shipping_rates.length - 1 && (
                  <div className="flex items-center justify-between border-t border-borderColor"></div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <p className="font-D16px-M13px">
            There are no shipping options available. Please ensure that your
            address has been entered correctly, or contact us if you need any
            help.
          </p>
        )}
      </div>
      <div className="mb-[32px] grid sm:text-[14px]">
        <span className="font-D18px-M16px mb-[20px] font-medium sm:mb-[16px]">
          Order notes (optional)
        </span>
        <textarea
          className="font-D16px-M13px scrollbar h-[128px] w-full rounded-md border-[1px] border-borderColor bg-inputColor p-[16px] shadow-none outline-none transition-all ease-linear hover:border-gray hover:bg-lightgray focus:border-[1px]  focus:border-[#E7461E] focus:bg-[#FFE9E3] sm:!text-[13px] sm:!leading-[21px] dark:border-none dark:text-[#E7461E] dark:focus:bg-transparent"
          placeholder="Notes about your order, e.g. special notes for delivery."
          value={customer_note}
          onChange={(e) => updateCustomerNote?.(e.target.value)}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="shipping-custom-breakpoint flex justify-between gap-[16px] sm:flex-col-reverse sm:items-center md:flex-col-reverse md:items-center lg:flex-row">
        <button
          className="group/link flex items-center gap-[16px] transition duration-200 hover:text-[#E7461E]"
          onClick={() => changeStep(1)}
        >
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1L1 6.5L6 12"
              // stroke="#333333"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-black transition duration-200 group-hover/link:stroke-[#E7461E]"
            />
          </svg>
          <p className="font-16px-ALL text-center transition duration-200 group-hover/link:text-[#E7461E]">
            RETURN TO INFORMATION
          </p>
        </button>
        <Button
          text="CONTINUE TO PAYMENT"
          disabled={cartData!?.cart.shipping_rates.length === 0}
          highlighted={true}
          customClass="font-16px-ALL lg:w-fit w-full"
          onPress={async () => changeStep(3)}
        />
      </div>
    </>
  );
};
