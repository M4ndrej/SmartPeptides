import enrollUser from "@/app/actions/affiliate/enroll/actions";
import updateAffiliate from "@/app/actions/affiliate/update/actions";
import DropdownIcon from "@/components/Icons/DropdownIcon";
import MyInput from "@/components/Input/MyInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { affiliatePaymentMethods } from "@/data/affiliate";
import { didFormChange } from "@/helpers/form_helpers";
import {
  AffiliateFormData,
  AffiliateFormErrors,
  AffiliatePaymentMethod,
} from "@/types/affiliates";
import classNames from "classnames";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AnimateHeight, { Height } from "react-animate-height";
import { mutate } from "swr";

interface AffiliateFormProps {
  containerHeight: Height;
  setContainerHeight: Dispatch<SetStateAction<Height>>;
  onSuccess: () => void;
  initialData?: AffiliateFormData;
}

const AffiliateForm: FC<AffiliateFormProps> = ({
  initialData,
  setContainerHeight,
  onSuccess,
}) => {
  const initialPaymentMethod = affiliatePaymentMethods.find(
    (method) => method.key == initialData?.payment_method
  );

  const [paymentMethod, setPaymentMethod] = useState<
    AffiliatePaymentMethod | undefined
  >(initialPaymentMethod);
  const [selectHeight, setSelectHeight] = useState<Height>(52);

  const submitButton = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState("");
  const [fieldsError, setFieldsError] = useState<AffiliateFormErrors>();
  const [formData, setFormData] = useState<AffiliateFormData>(
    initialData ?? {
      name: "",
      address: "",
      payment_method: "",
      account_holder_name: "",
      account_number: "",
      routing_number: "",
      cash_app_name: "",
      cash_app_tag: "",
      zelle_name: "",
      zelle_email: "",
      zelle_phone: "",
    }
  );
  const [isZelleEmail, setIsZelleEmail] = useState(!initialData?.zelle_phone);

  const formChanged = useMemo(
    () => (initialData ? didFormChange(formData, initialData) : true),
    [formData, initialData]
  );

  useEffect(() => {
    const height =
      500 + +selectHeight + (paymentMethod?.height ?? 0) + (error ? 120 : 0);
    setContainerHeight(height);
    return () => setContainerHeight(500);
  }, [selectHeight, paymentMethod, error, setContainerHeight]);

  const togglePaymentMethodDropdown = () => {
    setPaymentMethod(undefined);
    if (selectHeight === 52) {
      setSelectHeight(200);
      return;
    }
    setSelectHeight(52);
  };

  const changePaymentMethod = (method: AffiliatePaymentMethod) => {
    setPaymentMethod(method);
    setFormData((data) => ({
      ...data,
      payment_method: method.key,
    }));
    setSelectHeight(52);
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setError("");
    setFieldsError({
      ...fieldsError,
      [e.target.name]: false,
    });
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitButton.current?.click();
    }
  };

  const handleEnroll = async (formData: FormData) => {
    if (!formChanged) return;
    formData.append("payment_method", paymentMethod?.key || "");
    const mutation = initialData
      ? await updateAffiliate(formData)
      : await enrollUser(formData);

    setError("");

    if (mutation?.errors) {
      return setFieldsError(mutation.errors);
    }
    if (mutation?.error) {
      return setError(mutation.error);
    }
    await mutate("/api/user/");
    await mutate("/api/user/profile");
    await mutate("/api/affiliate");
    onSuccess();
  };

  return (
    <form action={handleEnroll} className="w-full">
      {/* Input fields */}
      <div className="flex w-full flex-col gap-[10px]">
        <MyInput
          label="Name"
          name="name"
          required={true}
          className="w-[100%]"
          value={formData.name}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          isError={!!fieldsError?.name}
          errorMessage={fieldsError?.name ? fieldsError?.name[0] : ""}
        />
        <MyInput
          label="Address"
          name="address"
          required={true}
          className="w-[100%]"
          value={formData.address}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          isError={!!fieldsError?.address}
          errorMessage={fieldsError?.address ? fieldsError?.address[0] : ""}
        />
        {/* Options dropdown */}
        <AnimateHeight
          height={selectHeight}
          duration={200}
          className={classNames(
            "rounded-[5px] border border-borderColor",
            !!paymentMethod?.title && "!bg-[#f0f0f0] dark:!bg-transparent"
          )}
        >
          {/* Selected option */}
          <div
            className={classNames(
              "flex cursor-pointer select-none items-center justify-between px-[16px] py-[12px] font-bold text-darkgray transition duration-200 hover:border-gray",
              !paymentMethod && "font-normal text-gray2"
            )}
            onClick={() => togglePaymentMethodDropdown()}
          >
            {paymentMethod?.title || "Choose payment method *"}
            <DropdownIcon
              className={classNames(
                "rotate-[180deg] transition duration-200",
                selectHeight === 200 && "!rotate-[0deg]"
              )}
            />
          </div>
          {/* Options to select */}
          <div className="font-16px-ALL flex flex-col gap-[16px] pb-[12px] pl-[16px]">
            {affiliatePaymentMethods.map((method) => (
              <div
                key={method.key}
                onClick={() => changePaymentMethod(method)}
                className="font-16px-ALL cursor-pointer transition duration-200 hover:text-gray"
              >
                {method.title}
              </div>
            ))}
          </div>
        </AnimateHeight>
        {paymentMethod?.key === "ach" && (
          <div className="grid grid-cols-2 gap-[16px] sm:grid-cols-1">
            <div className="col-span-2 sm:col-span-1">
              <MyInput
                label="Account holder name"
                name="account_holder_name"
                required={true}
                className="w-[100%]"
                value={formData.account_holder_name}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.account_holder_name}
                errorMessage={
                  fieldsError?.account_holder_name
                    ? fieldsError?.account_holder_name[0]
                    : ""
                }
              />
            </div>
            <div>
              <MyInput
                label="Account number"
                name="account_number"
                required={true}
                className="w-[100%]"
                value={formData.account_number}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.account_number}
                errorMessage={
                  fieldsError?.account_number
                    ? fieldsError?.account_number[0]
                    : ""
                }
              />
            </div>
            <div>
              <MyInput
                label="Routing number"
                name="routing_number"
                required={true}
                className="w-[100%]"
                value={formData.routing_number}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.routing_number}
                errorMessage={
                  fieldsError?.routing_number
                    ? fieldsError?.routing_number[0]
                    : ""
                }
              />
            </div>
          </div>
        )}
        {paymentMethod?.key === "cashapp" && (
          <div className="flex flex-col gap-[16px]">
            <MyInput
              label="Cash App name"
              name="cash_app_name"
              required={true}
              className="w-[100%]"
              value={formData.cash_app_name}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.cash_app_name}
              errorMessage={
                fieldsError?.cash_app_name ? fieldsError?.cash_app_name[0] : ""
              }
            />
            <MyInput
              label="$cashtag"
              name="cash_app_tag"
              required={true}
              className="w-[100%]"
              value={formData.cash_app_tag}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.cash_app_tag}
              errorMessage={
                fieldsError?.cash_app_tag ? fieldsError?.cash_app_tag[0] : ""
              }
            />
          </div>
        )}
        {paymentMethod?.key === "zelle" && (
          <div className="flex flex-col gap-[16px]">
            <MyInput
              label="Zelle name"
              name="zelle_name"
              required={true}
              className="w-[100%]"
              value={formData.zelle_name}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.zelle_name}
              errorMessage={
                fieldsError?.zelle_name ? fieldsError?.zelle_name[0] : ""
              }
            />
            {/* Checkboxes */}
            <div className="flex items-center gap-4">
              {/* Email checkbox */}
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="zelle_email_check"
                  id="zelle_email_check"
                  checked={isZelleEmail}
                  onChange={() => setIsZelleEmail(true)}
                  className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-[#E6E6E6] px-[16px] py-[12px] outline-0"
                />
                <label
                  htmlFor="zelle_email_check"
                  className="block cursor-pointer"
                >
                  Email
                </label>
              </div>
              {/* Phone number */}
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="zelle_phone_check"
                  id="zelle_phone_check"
                  checked={!isZelleEmail}
                  onChange={() => setIsZelleEmail(false)}
                  className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-[#E6E6E6] px-[16px] py-[12px] outline-0"
                />
                <label
                  htmlFor="zelle_phone_check"
                  className="block cursor-pointer"
                >
                  Phone number
                </label>
              </div>
            </div>
            {/* need to toggle these two inputs accordiong to checked button */}
            {isZelleEmail ? (
              <MyInput
                label="Zelle email"
                name="zelle_email"
                required={true}
                className="w-full"
                value={formData.zelle_email}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.zelle_email}
                errorMessage={
                  fieldsError?.zelle_email ? fieldsError?.zelle_email[0] : ""
                }
              />
            ) : (
              <MyInput
                label="Zelle phone number"
                name="zelle_phone"
                required={true}
                className="w-full"
                value={formData.zelle_phone}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.zelle_phone}
                errorMessage={
                  fieldsError?.zelle_phone ? fieldsError?.zelle_phone[0] : ""
                }
              />
            )}
          </div>
        )}
      </div>
      <div className="pt-[32px]">
        {error && (
          <div className="font-D16px-M13px mb-[32px] flex w-full items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
            {error}
          </div>
        )}
        <div className="justify-center-items-center flex w-full">
          <SubmitButton
            ref={submitButton}
            highlighted={true}
            customClass={classNames(
              `w-full font-D16px-M15px max-w-[448px] !mx-auto`,
              (!paymentMethod || !formChanged) &&
                "!bg-lightgray !text-gray2 !border-none"
            )}
            showSpiner
            disabled={!paymentMethod || !formChanged}
            reverseColors
            text={initialData ? "UPDATE" : "FINISH"}
          />
        </div>
      </div>
    </form>
  );
};

export default AffiliateForm;
