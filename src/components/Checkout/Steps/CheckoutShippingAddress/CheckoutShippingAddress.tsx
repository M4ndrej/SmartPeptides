"use client";
import {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import Link from "next/link";
import classNames from "classnames";

// actions
import updateAddressAction, {
  UpdateUserAddressProps,
} from "@/app/actions/checkout/update-address/actions";

// models
import { ShippingAddress } from "@/types/payment";
import { CountriesData, CountriesDataList, State } from "@/types/addresses";

// swr
import useSWR, { mutate } from "swr";

import SubmitButton from "@/components/SubmitButton/SubmitButton";
import CheckoutEmailField from "../../CheckoutEmailField";
import { useCheckoutData } from "@/hooks/useCheckoutData";
import MyInput from "@/components/Input/MyInput";
import InputDropdown from "@/components/Input/InputDropdown";
import { fetcher } from "@/helpers/fetchers";

interface CheckoutShippingAddressProps {
  isValidatedEmail: boolean;
  setIsValidatedEmail: Dispatch<SetStateAction<boolean>>;
  changeStep: (step: number) => void;
}

export const CheckoutShippingAddress: FC<CheckoutShippingAddressProps> = ({
  isValidatedEmail,
  setIsValidatedEmail,
  changeStep,
}) => {
  // hooks
  //const [isValidatedEmail, setIsValidatedEmail] = useState(false);
  const [showInput, setShowInput] = useState(false);
  // Checkout hook data
  const { checkoutData, isLoading: checkoutDataLoading } = useCheckoutData();
  const { billing_address } = checkoutData || {};

  const [shippingAddress, setShippingAddress] = useState<
    ShippingAddress & { email?: string }
  >();

  const [fieldsError, setFieldsError] = useState<UpdateUserAddressProps>();

  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isStatesOpen, setIsStatesOpen] = useState(false);

  const { data: countriesList } = useSWR<CountriesDataList>(
    "/api/countries",
    fetcher
  );

  const selectedCountry = useMemo(() => {
    return countriesList?.find((c) => c.code === shippingAddress?.country);
  }, [countriesList, shippingAddress]);

  const filteredStates = useMemo(
    () => selectedCountry?.states ?? [],
    [selectedCountry]
  );

  const selectedState = useMemo(() => {
    return filteredStates?.find((c) => c.code === shippingAddress?.state);
  }, [filteredStates, shippingAddress]);

  // methods
  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleInputAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFieldsError({
      ...fieldsError,
      [fieldName]: null,
    });
    setShippingAddress({
      ...shippingAddress,
      [fieldName]: fieldValue,
    });
  };

  const selectCountry = (country: CountriesData) => {
    setFieldsError({
      ...fieldsError,
      country: undefined,
    });
    setShippingAddress({
      ...shippingAddress,
      country: country.code,
    });
    setIsCountriesOpen(false);
  };

  const selectState = (state: State) => {
    setFieldsError({
      ...fieldsError,
      state: undefined,
    });
    setShippingAddress({
      ...shippingAddress,
      state: state.code,
    });
    setIsStatesOpen(false);
  };

  const handleSetEmail = (email: string) => {
    setFieldsError({
      ...fieldsError,
      email: undefined,
    });

    setShippingAddress({
      ...shippingAddress,
      email: email,
    });
  };

  const handleChangeUserAddressAction = async (formData: FormData) => {
    formData.append("email", billing_address?.email ?? "");
    const updateUserAddress = await updateAddressAction(
      formData,
      // checkoutData,
      filteredStates
    );

    if (updateUserAddress?.errors) {
      setFieldsError(updateUserAddress.errors);
      return;
    }

    await mutate("/api/cart/get_cart");
    await mutate("/api/checkout", {
      ...checkoutData,
      shipping_address: updateUserAddress.success.shipping_address,
    });

    changeStep(2);
  };

  // effects
  useEffect(() => {
    if (checkoutData) {
      setShippingAddress({
        ...checkoutData.shipping_address,
        email: checkoutData.billing_address?.email,
      });
    }
  }, [checkoutData]);

  return (
    <div className="flex w-full justify-between sm:mt-6">
      {/* left side */}
      <div className="ml-auto w-full bg-white ">
        {/* Left side content */}
        <div className=" ml-auto w-full">
          <form action={handleChangeUserAddressAction}>
            {/* Forms */}
            <div className="flex w-full flex-col gap-[32px]">
              {/* Contact information */}
              <div className="flex w-full flex-col gap-[16px]">
                <p className="font-D18px-M16px font-medium">
                  Contact Infromation
                </p>

                <CheckoutEmailField
                  checkoutDataLoading={checkoutDataLoading}
                  checkoutData={checkoutData}
                  billing_email={shippingAddress?.email!}
                  handleSetEmail={handleSetEmail}
                  setIsValidatedEmail={setIsValidatedEmail}
                  // checkoutData={checkoutData}
                />
              </div>

              {/* Shipping address */}
              <div className="flex w-full flex-col gap-[16px]">
                {/* First and last name with label */}
                <div className="flex w-full flex-col gap-[16px]">
                  <p className="font-D18px-M16px font-medium">
                    Shipping address
                  </p>
                  <div className="flex w-full gap-[16px] sm:flex-col md:flex-col">
                    <MyInput
                      label="First Name"
                      required={true}
                      name="first_name"
                      value={shippingAddress?.first_name}
                      onChange={(e) => handleInputAddress(e)}
                      containerClassName="w-full"
                      isError={!!fieldsError?.first_name}
                      errorMessage={
                        fieldsError?.first_name
                          ? fieldsError?.first_name[0]
                          : ""
                      }
                    />
                    <MyInput
                      label="Last Name"
                      required={true}
                      name="last_name"
                      value={shippingAddress?.last_name}
                      onChange={(e) => handleInputAddress(e)}
                      containerClassName="w-full"
                      isError={!!fieldsError?.last_name}
                      errorMessage={
                        fieldsError?.last_name ? fieldsError?.last_name[0] : ""
                      }
                    />
                  </div>
                  {/* Add compnany name optional */}
                  {!showInput && !shippingAddress?.company && (
                    <div className="flex flex-1 items-center gap-[8px]">
                      <button onClick={handleShowInput}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="15"
                            height="15"
                            rx="1.5"
                            stroke="#C7C7C7"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.58398 4.75C8.58398 4.47386 8.36013 4.25 8.08398 4.25C7.80784 4.25 7.58398 4.47386 7.58398 4.75V7.58345H4.75C4.47386 7.58345 4.25 7.80731 4.25 8.08345C4.25 8.35959 4.47386 8.58345 4.75 8.58345H7.58398V11.4169C7.58398 11.693 7.80784 11.9169 8.08398 11.9169C8.36013 11.9169 8.58398 11.693 8.58398 11.4169V8.58345H11.4169C11.693 8.58345 11.9169 8.35959 11.9169 8.08345C11.9169 7.80731 11.693 7.58345 11.4169 7.58345H8.58398V4.75Z"
                            fill="#C7C7C7"
                          />
                        </svg>
                      </button>
                      <div className="font-D16px-M14px">
                        Company name (optional)
                      </div>
                    </div>
                  )}
                  {(showInput || shippingAddress?.company) && (
                    <MyInput
                      label="Company name"
                      required={false}
                      name="company"
                      value={shippingAddress?.company}
                      onChange={(e) => handleInputAddress(e)}
                    />
                  )}
                </div>
                {/* Country/region */}
                <InputDropdown
                  isOpen={isCountriesOpen}
                  setIsOpen={setIsCountriesOpen}
                  label="Country / Region"
                  name={`country`}
                  inputKey="code"
                  maxHeight={264}
                  errorInput={!!fieldsError?.country}
                  errorMessage={
                    fieldsError?.country ? fieldsError?.country[0] : ""
                  }
                  items={countriesList ?? []}
                  selectedItem={selectedCountry}
                  changeSelectedItem={selectCountry}
                  isLabelShown={true}
                />
                {/* House number and street name */}
                <div className="flex w-full flex-col gap-[16px]">
                  <MyInput
                    label="House number and street name"
                    required={true}
                    name="address_1"
                    value={shippingAddress?.address_1}
                    onChange={(e) => handleInputAddress(e)}
                    className="h-[44px] w-full"
                    isError={!!fieldsError?.address_1}
                    errorMessage={
                      fieldsError?.address_1 ? fieldsError?.address_1[0] : ""
                    }
                  />
                </div>
                {/* Apartment */}
                <div className="flex w-full flex-col gap-[16px]">
                  <MyInput
                    label="Apartment, suite, unit, etc. (optional)"
                    required={false}
                    name="address_2"
                    value={shippingAddress?.address_2 ?? undefined}
                    onChange={(e) => handleInputAddress(e)}
                    className="h-[44px] w-full"
                    isError={!!fieldsError?.address_2}
                    errorMessage={
                      fieldsError?.address_2 ? fieldsError?.address_2[0] : ""
                    }
                  />
                </div>
                {/* Town/State/Country */}
                <div className="flex gap-[16px] sm:grid md:grid">
                  <div className="flex-1">
                    <MyInput
                      label="Town / City"
                      required={true}
                      name="city"
                      value={shippingAddress?.city}
                      onChange={(e) => handleInputAddress(e)}
                      isError={!!fieldsError?.city}
                      errorMessage={
                        fieldsError?.city ? fieldsError?.city[0] : ""
                      }
                    />
                  </div>

                  {!!filteredStates.length && (
                    <InputDropdown
                      isOpen={isStatesOpen}
                      setIsOpen={setIsStatesOpen}
                      label="State / Country"
                      name={`state`}
                      inputKey="code"
                      maxHeight={200}
                      errorInput={!!fieldsError?.state}
                      errorMessage={
                        fieldsError?.state ? fieldsError?.state[0] : ""
                      }
                      items={filteredStates}
                      selectedItem={selectedState}
                      changeSelectedItem={selectState}
                      withElipsisText={true}
                      className="relative w-full flex-1"
                    />
                  )}
                  <div className="flex-1">
                    <MyInput
                      label="Postcode / ZIP"
                      required={true}
                      name="postcode"
                      value={shippingAddress?.postcode}
                      onChange={(e) => handleInputAddress(e)}
                      isError={!!fieldsError?.postcode}
                      errorMessage={
                        fieldsError?.postcode ? fieldsError?.postcode[0] : ""
                      }
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <MyInput
                    label="Phone"
                    required={true}
                    name="phone"
                    value={shippingAddress?.phone}
                    onChange={(e) => handleInputAddress(e)}
                    className="w-full"
                    isError={!!fieldsError?.phone}
                    errorMessage={
                      fieldsError?.phone ? fieldsError?.phone[0] : ""
                    }
                  />
                  <div className="my-[8px]">
                    <div className="font-13px-ALL mb-[5px]">
                      Please enter a phone number using only numbers eg.
                      1234567890
                    </div>
                    {/* <div className="text-[10px] font-bold">
                      If paying by credit card a valid mobile number is required
                      for one time passcode validation!
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Navigation buttons */}
              <div className="flex flex-col-reverse items-center justify-between gap-[16px] lg:flex-row">
                <Link
                  href="/cart"
                  className="font-D16px-M14px group/link flex items-center justify-start gap-[16px] uppercase transition duration-200 ease-linear hover:text-[#E7461E] lg:w-full"
                >
                  <svg
                    width="7"
                    height="13"
                    viewBox="0 0 7 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-[1px] "
                  >
                    <path
                      d="M6 1L1 6.5L6 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-black transition duration-200 group-hover/link:stroke-[#E7461E]"
                    />
                  </svg>
                  <span>Return to cart</span>
                </Link>
                <SubmitButton
                  text="CONTINUE TO SHIPPING"
                  highlighted={true}
                  showSpiner
                  reverseColors
                  customClass={classNames(
                    `font-16px-ALL w-full  lg:w-full lg:px-[32px] lg:!text-[16px] `,
                    !isValidatedEmail &&
                      "!bg-lightgray !text-gray2 !border-none"
                  )}
                  disabled={!isValidatedEmail}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
