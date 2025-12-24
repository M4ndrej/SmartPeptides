import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { CountriesData, CountriesDataList, State } from "@/types/addresses";
import Spinner from "../SvgComponents/Spinner";
import { UpdateUserAddressErrors } from "@/app/actions/user/update-address/actions";
import { BillingAddress } from "@/types/cart_types";
import MyInput from "../Input/MyInput";
import InputDropdown from "../Input/InputDropdown";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { ShippingAddress } from "@/types/payment";

interface AddressFormProps<T extends ShippingAddress | BillingAddress> {
  formName: string;
  data?: T;
  setData: Dispatch<SetStateAction<T | undefined>>;
  fieldsErrors?: UpdateUserAddressErrors;
  setFieldsErrors: Dispatch<
    SetStateAction<UpdateUserAddressErrors | undefined>
  >;
  isLoading?: boolean;
}

function AddressForm<T extends ShippingAddress | BillingAddress>({
  formName,
  data,
  setData,
  fieldsErrors,
  setFieldsErrors,
  isLoading,
}: AddressFormProps<T>) {
  const { data: countriesList } = useSWR<CountriesDataList>(
    "/api/countries",
    fetcher
  );

  const selectedCountry = useMemo(() => {
    return countriesList?.find((c) => c.code === data?.country);
  }, [countriesList, data]);

  const filteredStates = useMemo(
    () => selectedCountry?.states ?? [],
    [selectedCountry]
  );

  const selectedState = useMemo(() => {
    return filteredStates?.find((c) => c.code === data?.state);
  }, [filteredStates, data]);

  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isStatesOpen, setIsStatesOpen] = useState(false);

  const selectCountry = (country: CountriesData) => {
    setFieldsErrors({
      ...fieldsErrors,
      country: undefined,
      state: undefined,
    });
    if (data) {
      setData({
        ...data,
        country: country.code,
        state: "",
      });
    }
    setIsCountriesOpen(false);
  };

  const selectState = (state: State) => {
    setFieldsErrors({
      ...fieldsErrors,
      state: undefined,
    });
    if (data) {
      setData({
        ...data,
        state: state.code,
      });
    }
    setIsStatesOpen(false);
  };

  const handleInputField = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name.replace(`${formName}_`, "");
    const fieldValue = e.target.value;

    setFieldsErrors({
      ...fieldsErrors,
      [fieldName]: null,
    });

    if (data) {
      setData({
        ...data,
        [fieldName]: fieldValue,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-[520px] w-full">
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Spinner widthHeight="h-8 w-8" />
        </div>
      </div>
    );
  }

  return (
    <>
      <input
        type="string"
        hidden
        value={filteredStates?.length}
        name={`${formName}_has_states`}
      />
      <MyInput
        label="First Name"
        required={true}
        name={`${formName}_first_name`}
        value={data?.first_name}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["first_name"]}
        errorMessage={
          fieldsErrors?.["first_name"]
            ? fieldsErrors?.["first_name"][0]
            : undefined
        }
      />
      <MyInput
        label="Last Name"
        required={true}
        name={`${formName}_last_name`}
        value={data?.last_name}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["last_name"]}
        errorMessage={
          fieldsErrors?.["last_name"]
            ? fieldsErrors?.["last_name"][0]
            : undefined
        }
      />
      {/* Country/region */}
      <InputDropdown
        isOpen={isCountriesOpen}
        setIsOpen={setIsCountriesOpen}
        label="Country / Region"
        name={`${formName}_country`}
        inputKey="code"
        maxHeight={264}
        errorInput={!!fieldsErrors?.country}
        errorMessage={fieldsErrors?.country ? fieldsErrors?.country[0] : ""}
        items={countriesList ?? []}
        selectedItem={selectedCountry}
        changeSelectedItem={selectCountry}
        isLabelShown={true}
        className="!z-[99]"
      />
      <MyInput
        label="House number and street name"
        required={true}
        name={`${formName}_address_1`}
        value={data?.address_1}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["address_1"]}
        errorMessage={
          fieldsErrors?.["address_1"]
            ? fieldsErrors?.["address_1"][0]
            : undefined
        }
      />
      <MyInput
        label="Apartment, suite, unit, etc. (optional)"
        required={false}
        name={`${formName}_address_2`}
        value={data?.address_2 ?? undefined}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
      />
      <MyInput
        label="Town / City"
        required={true}
        name={`${formName}_city`}
        value={data?.city}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["city"]}
        errorMessage={
          fieldsErrors?.["city"] ? fieldsErrors?.["city"][0] : undefined
        }
      />
      {filteredStates.length > 0 && (
        <InputDropdown
          isOpen={isStatesOpen}
          setIsOpen={setIsStatesOpen}
          label="State / Country"
          name={`${formName}_state`}
          inputKey="code"
          maxHeight={200}
          errorInput={!!fieldsErrors?.state}
          errorMessage={fieldsErrors?.state ? fieldsErrors?.state[0] : ""}
          items={filteredStates}
          selectedItem={selectedState}
          changeSelectedItem={selectState}
          withElipsisText={true}
        />
      )}
      <MyInput
        label="Postcode / ZIP"
        required={true}
        name={`${formName}_postcode`}
        value={data?.postcode}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["postcode"]}
        errorMessage={
          fieldsErrors?.["postcode"] ? fieldsErrors?.["postcode"][0] : undefined
        }
      />
      <MyInput
        label="Phone"
        required={true}
        name={`${formName}_phone`}
        value={data?.phone}
        onChange={handleInputField}
        className="w-full"
        prefix={formName}
        isError={!!fieldsErrors?.["phone"]}
        errorMessage={
          fieldsErrors?.["phone"] ? fieldsErrors?.["phone"][0] : undefined
        }
      />
    </>
  );
}

export default AddressForm;
