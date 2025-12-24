import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";
import InputDropdown from "@/components/Input/InputDropdown";
import MyInput from "@/components/Input/MyInput";
import { fetcher } from "@/helpers/fetchers";
import { CountriesData, CountriesDataList, State } from "@/types/addresses";
import { ShippingAddress } from "@/types/cart_types";
import classNames from "classnames";
import { ChangeEvent, FC, useMemo, useState } from "react";
import AnimateHeight from "react-animate-height";
import useSWR from "swr";

type BillingAddressProps = {
  sameAsShippingAddress: boolean;
  fieldsError?: PlaceOrderErrorProps;
  billing_address: Partial<ShippingAddress> & { email?: string };
  setShippingAddress: (
    address: Partial<ShippingAddress> & { email?: string }
  ) => void;
  setSameAsShippingAddress: (isShippingAddress: boolean) => void;
  isRecovery?: boolean;
};

const BillingAddress: FC<BillingAddressProps> = ({
  sameAsShippingAddress,
  fieldsError,
  billing_address,
  setShippingAddress,
  setSameAsShippingAddress,
  isRecovery,
}) => {
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isStatesOpen, setIsStatesOpen] = useState(false);

  const { data: countriesList } = useSWR<CountriesDataList>(
    "/api/countries",
    fetcher
  );

  const selectedCountry = useMemo(() => {
    return countriesList?.find((c) => c.code === billing_address?.country);
  }, [countriesList, billing_address]);

  const filteredStates = useMemo(
    () => selectedCountry?.states ?? [],
    [selectedCountry]
  );

  const selectedState = useMemo(() => {
    return filteredStates?.find((c) => c.code === billing_address?.state);
  }, [filteredStates, billing_address]);

  const handleInputAddress = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setShippingAddress({
      ...billing_address,
      [fieldName]: fieldValue,
    });
  };

  const selectCountry = (country: CountriesData) => {
    setShippingAddress({
      ...billing_address,
      country: country.code,
    });
    setIsCountriesOpen(false);
  };

  const selectState = (state: State) => {
    setShippingAddress({
      ...billing_address,
      state: state.code,
    });
    setIsStatesOpen(false);
  };

  return (
    <div
      className={classNames(
        !isRecovery ? "mb-[32px]" : "w-full rounded-[5px] bg-lightgray p-6"
      )}
    >
      <div className="mb-[8px] grid">
        <span
          className={classNames(
            "font-D18px-M16px mb-[12px]",
            !isRecovery ? "font-medium" : "font-bold"
          )}
        >
          Billing address
        </span>
        <span className="font-D16px-M13px">
          Select the address that matches your card or payment method.
        </span>
      </div>
      <div
        className={classNames(
          !isRecovery
            ? "rounded-[5px] border border-borderColor p-6 sm:p-4"
            : "pt-3"
        )}
      >
        <div
          className="flex cursor-pointer items-center gap-[8px]"
          onClick={() => setSameAsShippingAddress(true)}
        >
          <input
            type="radio"
            name="same-billing"
            checked={sameAsShippingAddress}
            readOnly={true}
            value={0}
            className="h-[14px] cursor-pointer rounded-[5px] border border-borderColor px-[16px] py-[12px] outline-0"
          />
          <span className="font-D16px-M13px">Same as shipping address</span>
        </div>
        <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
        <div
          className="flex cursor-pointer items-center gap-[8px]"
          onClick={() => setSameAsShippingAddress(false)}
        >
          <input
            type="radio"
            name="same-billing"
            checked={!sameAsShippingAddress}
            readOnly={true}
            value={1}
            className="h-[14px] cursor-pointer rounded-[5px] border border-borderColor px-[16px] py-[12px] outline-0"
          />
          <span className="font-D16px-M13px">
            Use a different billing address
          </span>
        </div>
        {/* Different shipping address */}
        <AnimateHeight
          duration={300}
          height={!sameAsShippingAddress ? "auto" : 0}
        >
          <div className="flex w-full flex-col gap-[16px]">
            <div className="flex w-full flex-col gap-[16px]">
              {/* first and last name */}
              <div className="mt-[16px] flex w-full gap-[16px] sm:flex-col md:flex-col">
                <MyInput
                  label="First Name"
                  required={true}
                  name="first_name"
                  value={billing_address?.first_name}
                  onChange={(e) => handleInputAddress(e, "billing_address")}
                  className="w-full"
                  containerClassName="w-full"
                  isError={!!fieldsError?.first_name}
                  errorMessage={
                    fieldsError?.first_name ? fieldsError?.first_name[0] : ""
                  }
                />
                <MyInput
                  label="Last Name"
                  required={true}
                  name="last_name"
                  value={billing_address?.last_name}
                  onChange={(e) => handleInputAddress(e, "billing_address")}
                  className="w-full"
                  containerClassName="w-full"
                  isError={!!fieldsError?.last_name}
                  errorMessage={
                    fieldsError?.last_name ? fieldsError?.last_name[0] : ""
                  }
                />
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
                  required={false}
                  name="address_1"
                  value={billing_address?.address_1}
                  onChange={(e) => handleInputAddress(e, "billing_address")}
                  className="w-full"
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
                  value={billing_address?.address_2!}
                  onChange={(e) => handleInputAddress(e, "billing_address")}
                  className="w-full"
                />
              </div>

              {/* Town/State/Country */}
              <div className="flex gap-[16px] sm:grid md:grid">
                <div className="flex-1">
                  <MyInput
                    label="Town / City"
                    required={true}
                    name="city"
                    value={billing_address?.city}
                    onChange={(e) => handleInputAddress(e, "billing_address")}
                    isError={!!fieldsError?.city}
                    errorMessage={fieldsError?.city ? fieldsError?.city[0] : ""}
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
                    value={billing_address?.postcode}
                    onChange={(e) => handleInputAddress(e, "billing_address")}
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
                  value={billing_address?.phone}
                  onChange={(e) => handleInputAddress(e, "billing_address")}
                  className="w-full"
                  isError={!!fieldsError?.phone}
                  errorMessage={fieldsError?.phone ? fieldsError?.phone[0] : ""}
                />
              </div>
            </div>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default BillingAddress;
