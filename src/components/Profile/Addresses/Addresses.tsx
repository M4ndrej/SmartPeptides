"use client";

import Checkbox from "@/components/Checkbox/Checkbox";
import { FC, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import AddressForm from "@/components/AddressForm/AddressForm";
import classNames from "classnames";
import { ErrorResponseProps } from "@/helpers/validation_helpers";
import updateUserAddress, {
  UpdateUserAddressErrors,
} from "@/app/actions/user/update-address/actions";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { CartResponse } from "@/types/cart_types";
import { useProfileContext } from "../ProfileContext";
import { fetcher } from "@/helpers/fetchers";
import { BillingAddress, ShippingAddress } from "@/types/payment";

function areAddressesDifferent(
  shipping: ShippingAddress,
  billing: BillingAddress
) {
  for (const key in shipping) {
    const shippingVal = shipping[key as keyof ShippingAddress];
    const billingVal = billing[key as keyof BillingAddress];
    if (shippingVal !== billingVal) {
      return true;
    }
  }
  return false;
}

const Addresses: FC = () => {
  const { userData } = useProfileContext();
  const { data: cartData, isLoading } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const [isFirstPaint, setIsFirstPaint] = useState(true);

  const [billingAddress, setBillingAddress] = useState<
    BillingAddress | undefined
  >(cartData?.cart?.billing_address);
  const [shippingAddress, setShippingAddress] = useState<
    ShippingAddress | undefined
  >(cartData?.cart?.shipping_address);

  const [billingFieldsErrors, setBillingFieldsErrors] =
    useState<UpdateUserAddressErrors>();
  const [shippingFieldsErrors, setShippingFieldsErrors] =
    useState<UpdateUserAddressErrors>();

  const [isDifferentAddress, setIsDifferentAddress] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdateAddressAction = async (formData: FormData) => {
    const updateAddress = await updateUserAddress(
      formData,
      isDifferentAddress && shippingAddress?.country === "US",
      userData?.id
    );

    if (updateAddress?.errors) {
      if (updateAddress.type === "ship" || !updateAddress.type) {
        setShippingFieldsErrors(updateAddress?.errors as ErrorResponseProps);
      } else {
        setBillingFieldsErrors(updateAddress?.errors as ErrorResponseProps);
      }
      return;
    }

    setBillingFieldsErrors(undefined);
    setShippingFieldsErrors(undefined);

    setIsUpdated(true);
    await Promise.all([mutate("/api/cart/get_cart"), mutate("/api/checkout")]);
  };

  // Sync with cart data on first paint
  useEffect(() => {
    if (isFirstPaint && cartData?.cart) {
      setShippingAddress(cartData.cart.shipping_address);
      setBillingAddress(cartData.cart.billing_address);

      const areDifferent = areAddressesDifferent(
        cartData.cart.shipping_address,
        cartData.cart.billing_address
      );
      if (areDifferent) {
        setIsDifferentAddress(true);
      }

      setIsFirstPaint(false);
    }
  }, [cartData?.cart, isFirstPaint]);

  return (
    <div className="sm:w-[100%] md:w-[100%]">
      <form action={handleUpdateAddressAction} noValidate>
        <div
          className={classNames({
            "flex flex-col gap-[40px] from834:flex-row": true,
            "!flex-row-reverse": shippingAddress?.country !== "US",
          })}
        >
          <div className="flex-1">
            <>
              <div className="font-D24px-M18px font-bold md:text-[24px] md:leading-[29px] ">
                {!isDifferentAddress
                  ? "Shipping/Billing address"
                  : "Shipping address"}
              </div>
              <div className="mt-[16px] flex flex-1 flex-col gap-y-[16px] md:max-w-[100%] lg:md:max-w-[100%] xl:max-w-[592px]">
                <AddressForm
                  data={shippingAddress}
                  setData={setShippingAddress}
                  fieldsErrors={shippingFieldsErrors}
                  setFieldsErrors={setShippingFieldsErrors}
                  isLoading={isLoading}
                  formName="ship"
                />
              </div>
            </>
          </div>

          {isDifferentAddress && shippingAddress?.country === "US" && (
            <div className="flex-1">
              <div className="font-D24px-M18px font-bold md:text-[24px] md:leading-[29px]">
                Billing address
              </div>
              <div className=" mt-[16px] flex flex-1 flex-col gap-y-[16px]">
                <AddressForm
                  data={billingAddress}
                  setData={setBillingAddress}
                  fieldsErrors={billingFieldsErrors}
                  setFieldsErrors={setBillingFieldsErrors}
                  isLoading={isLoading}
                  formName="billing"
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-[13px] sm:mt-[16px]">
          {shippingAddress?.country === "US" && (
            <>
              <div className="mb-[32px] flex items-center">
                <div>
                  <Checkbox
                    checked={isDifferentAddress}
                    onChange={setIsDifferentAddress}
                  />
                </div>
                <div className="font-D16px-M13px">
                  Use different billing address
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={classNames({
            "text-right md:max-w-[100%] lg:md:max-w-[100%] xl:max-w-[592px]":
              true,
            "!max-w-[100%] !text-center": isDifferentAddress,
          })}
        >
          {!isUpdated ? (
            <div className="inline-flex w-full max-w-[176px] sm:max-w-[100%]">
              <SubmitButton
                text="SAVE"
                highlighted={true}
                showSpiner
                reverseColors
                customClass="w-[100%]"
              />
            </div>
          ) : (
            <div className="font-D16px-M14px font-bold text-[#333333] sm:max-w-[236px]">
              Address updated successfully!!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Addresses;
