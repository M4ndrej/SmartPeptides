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
      className="flex flex-col items-start gap-3"
    >
        <div className="font-D32px-M24px font-bold text-textWhite">
          Subscribe to our newsletter
        </div>        {subscribeToMailpoet ? (
          <div>
            Check your inbox or spam folder to confirm your subscription.
          </div>
        ) : (
          <form action={handleSubscribeAction} noValidate className="sm:w-full">
            <div className="flex items-start justify-center sm:w-full sm:flex-col">
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
                text="SUBMIT"
                showSpiner
                reverseColors
                highlighted={true}
                customClass="sm:w-full sm:max-w-full sm:mt-[6px] !bg-[#9A9A9F] border-[#9A9A9F]"
              />
            </div>
          </form>
        )}
        <p>Lorem ipsum dolor sit amet consectetur.llam lacus nec facilisi bibendum amet. Velit urna scelerisque enim eu nunc viverra.</p>
    </div>
  );
};

export default SubscribeContent;
