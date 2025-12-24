"use client";

import { SubscribeValidationErros } from "@/app/actions/mailpoet/subscribe/actions";
import registerSubscriber from "@/app/actions/subscriber/register/actions";
import MyInput from "@/components/Input/MyInput";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";

const SubscribeContent: FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const emailFromParams = params.get("resubscribe_email") ?? "";

  const [fields, setFields] = useState({
    email: "",
    username: "",
  });

  const [subscribeToMailpoet, setSubscribeToMailpoet] = useState(false);

  const [profileErrors, setProfileErrors] =
    useState<SubscribeValidationErros>();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value.replace(/\s/g, "");
    const fieldName = e.target.name;

    setProfileErrors({
      ...profileErrors,
      [fieldName]: undefined,
    });

    setFields({
      ...fields,
      [fieldName]: fieldValue,
    });
  };

  useEffect(() => {
    if (emailFromParams && typeof emailFromParams === "string") {
      const formData = new FormData();
      formData.append("email", emailFromParams);
      handleSubscribeAction(formData);
      router.replace("/");
    }
  }, [emailFromParams]);

  const handleSubscribeAction = async (formData: FormData) => {
    setProfileErrors({});

    const register = await registerSubscriber(formData);
    if (register?.errors) {
      setProfileErrors(register?.errors);
      return;
    }

    setSubscribeToMailpoet(true);
  };

  return (
    <div
      id="subscribe-content"
      className="h-[223px] w-full rounded-[10px] bg-white shadow-globalShadow sm:h-auto sm:w-full md:w-full lg:mx-auto lg:max-w-[800px] xl:max-w-[998px]"
    >
      <div className="flex flex-col items-center pb-[48px] pt-[40px] sm:w-full sm:px-[32px] sm:py-[32px]">
        <div className="font-D32px-M24px pb-[16px] font-bold">
          Subscribe to get updates and exclusive offers
        </div>
        <div className="mb-[30px] h-[2px] w-[48px] rounded-[2px] bg-[#E7461E]"></div>
        {subscribeToMailpoet ? (
          <div>
            Check your inbox or spam folder to confirm your subscription.
          </div>
        ) : (
          <form action={handleSubscribeAction} noValidate className="sm:w-full">
            <div className="flex items-start justify-center sm:w-full sm:flex-col">
              <div className="personal_inputs">
                <MyInput
                  label="Username"
                  name="username"
                  required={true}
                  value={fields.username}
                  type="text"
                  containerClassName="!w-[360px] !mr-[16px] sm:!w-[100%] sm:!mr-0 sm:!mb-[16px] !font-D16px-M14px !px-[16px] !py-[12px] select-none"
                  onChange={handleInput}
                />
              </div>
              <MyInput
                label="Email Address"
                name="email"
                pwIgnore={true}
                required={true}
                type="email"
                value={fields.email}
                containerClassName="md:min-w-[399px] lg:min-w-[464px] xl:min-w-[360px] !mr-[16px] sm:!w-full sm:!mr-0 sm:!mb-[4px] sm:min-w-none select-none"
                onChange={handleInput}
                isError={!!profileErrors?.email}
                errorMessage={
                  profileErrors?.email ? profileErrors?.email[0] : ""
                }
              />
              <SubmitButton
                text="SUBSCRIBE"
                showSpiner
                reverseColors
                highlighted={true}
                customClass="sm:w-full sm:max-w-full sm:mt-[6px] !bg-[#E7461E] border-[#E7461E]"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubscribeContent;
