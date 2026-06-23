"use client";
import Link from "next/link";
import { ChangeEvent, FC, useMemo, useState } from "react";
import updateSubscriber from "@/app/actions/subscriber/update/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import classNames from "classnames";
import useSWR from "swr";
import { LoggedUserData } from "@/types/user";
import { fetcher } from "@/helpers/fetchers";
import MyInput from "../Input/MyInput";
import { didFormChange } from "@/helpers/form_helpers";

interface SubscripeManageProps {
  subscriber: {
    email: string;
    code: string;
    first_name?: string;
    last_name?: string;
  };
}

const SubscribeManage: FC<SubscripeManageProps> = ({ subscriber }) => {
  const { data: userData } = useSWR<LoggedUserData>("/api/user/", fetcher);
  const [isUpdated, setIsUpdated] = useState(false);

  const [error, setError] = useState("");
  const [subscriberErrors, setSubscriberErrors] = useState<{
    first_name?: string[] | undefined;
    last_name?: string[] | undefined;
  }>();

  const [subscriberFormData, setSubscriberFormData] = useState({
    first_name: subscriber?.first_name,
    last_name: subscriber?.last_name,
  });

  const formChanged = useMemo(
    () => didFormChange(subscriberFormData, subscriber),
    [subscriberFormData, subscriber]
  );

  const handleInputSubscriber = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setSubscriberFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));

    setIsUpdated(false);
  };

  const submitFormSubscriber = async (formData: FormData) => {
    if (!formChanged) return;
    formData.append("email", subscriber.email);
    formData.append("code", subscriber.code);
    const update = await updateSubscriber(formData);
    setSubscriberErrors({});
    setError("");
    if (update?.errors) {
      setSubscriberErrors(update.errors);
    } else if (!update?.error) {
      setIsUpdated(true);
    } else {
      setError(update.error);
    }
  };

  return (
    <div className="m-auto mb-[96px] mt-[48px] px-[60px] sm:px-[16px] md:px-[32px]">
      <div className="flex flex-col items-center justify-center">
        <div className="font-D32px-M24px text-center font-bold">
          Manage your subscription
        </div>
        <div className="mx-auto my-4 h-[2px] w-[48px] bg-[#333333] sm:mb-[24px]"></div>
        <form action={submitFormSubscriber}>
          <div className="mt-[16px] flex w-[592px] flex-col gap-y-[16px] sm:w-full">
            <div className="flex flex-col">
              <div className="font-D16px-M14px mb-[2px] font-bold">Email:</div>
              <p className="font-D16px-M14px">{subscriber.email}</p>
              <div className="font-13px-ALL mt-3 text-gray3">
                <Link
                  href={userData?.user ? "/profile" : "/sign-in"}
                  className="cursor-pointer underline transition duration-300 hover:text-[#333333]"
                >
                  {userData?.user
                    ? "Go to your account"
                    : "Login in to your account"}
                </Link>{" "}
                to update your email.
              </div>
            </div>
            <MyInput
              label="First Name"
              required={false}
              name="first_name"
              value={subscriberFormData.first_name}
              isError={!!subscriberErrors?.first_name}
              errorMessage={
                subscriberErrors?.first_name
                  ? subscriberErrors?.first_name[0]
                  : ""
              }
              onChange={handleInputSubscriber}
              containerClassName="w-full"
            />
            <MyInput
              label="Last Name"
              required={false}
              name="last_name"
              value={subscriberFormData.last_name}
              isError={!!subscriberErrors?.last_name}
              errorMessage={
                subscriberErrors?.last_name
                  ? subscriberErrors?.last_name[0]
                  : ""
              }
              onChange={handleInputSubscriber}
              containerClassName="w-full"
            />
            <MyInput
              label="Status"
              required={false}
              disabled={true}
              name="status"
              value="Subscribed"
              containerClassName="w-full"
            />
          </div>
          {error && (
            <div className="font-D16px-M14px my-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
              {error}
            </div>
          )}
          <div className="mt-[32px] flex items-center justify-start gap-4">
            {!isUpdated ? (
              <SubmitButton
                text="SAVE NOW"
                highlighted={true}
                reverseColors
                showSpiner
                customClass={classNames(
                  "w-[100%] font-16px-ALL ml-auto max-w-[192px] sm:max-w-[100%]",
                  !formChanged && "!bg-lightgray !text-gray2 !border-none"
                )}
                disabled={!formChanged}
              />
            ) : (
              <div className="font-D16px-M14px font-bold text-[#333333] sm:max-w-[236px] sm:text-center">
                Schedulled for update!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeManage;
