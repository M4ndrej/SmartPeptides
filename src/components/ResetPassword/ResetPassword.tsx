"use client";
import { ChangeEvent, FC, useRef, useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useSWRConfig } from "swr";
import resetPassword from "@/app/actions/auth/reset_password/actions";
import LockIcon from "../Icons/LockIcon";
import CheckIcon from "../Icons/CheckIcon";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import MyInput from "../Input/MyInput";

interface PassData {
  new_password: string;
  confirm_password: string;
}

interface ResetPasswordProps {
  email: string;
  code: string;
  isUserLogged?: boolean;
}

const ResetPassword: FC<ResetPasswordProps> = ({
  email,
  code,
  isUserLogged,
}) => {
  const [isSuccess, setSuccess] = useState(false);

  const router = useRouter();

  const [error, showError] = useState("");
  const [fieldsError, setFieldsError] = useState<{
    new_password?: string[];
    confirm_password?: string[];
  }>();
  const { mutate } = useSWRConfig();
  const passButton = useRef<HTMLButtonElement>(null);

  const [passData, setPassData] = useState<PassData>({
    new_password: "",
    confirm_password: "",
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    showError("");
    setFieldsError({
      ...fieldsError,
      [e.target.name]: false,
    });
    setPassData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordForm = async (formData: FormData) => {
    formData.append("email", email);
    formData.append("code", code);
    const passChange = await resetPassword(formData);

    showError("");
    if (passChange?.errors) {
      setFieldsError(passChange.errors);
    } else if (!passChange?.error) {
      setSuccess(true);
      mutate("/api/auth/user");
    } else {
      showError(passChange.error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      passButton.current?.click();
    }
  };

  return (
    <div className="relative">
      {!isSuccess && !isUserLogged ? (
        <>
          <div className="m-auto max-w-[390px] sm:max-w-full">
            <div className="flex flex-col items-center justify-center gap-4 pt-6">
              <LockIcon />
              <div className="font-D32px-T24px-M24px text-center font-bold sm:font-medium">
                Reset your password
              </div>
            </div>
            <div className="font-D16px-M13px mb-6 flex flex-col pt-2 text-center">
              Please enter your new password below.
            </div>
          </div>
          <form action={handlePasswordForm}>
            <div className="m-auto max-w-[390px] sm:max-w-full sm:px-0">
              <MyInput
                label="New Password"
                name="new_password"
                required={true}
                containerClassName="w-full"
                value={passData.new_password}
                type="password"
                onChange={handleInput}
                onKeyDown={handleKeyPress}
                isError={!!fieldsError?.new_password}
                errorMessage={
                  fieldsError?.new_password ? fieldsError?.new_password[0] : ""
                }
              />
              <div className="pb-[16px] pt-[16px] sm:pb-[10px]">
                <MyInput
                  label="Confirm Password"
                  name="confirm_password"
                  required={true}
                  value={passData.confirm_password}
                  type="password"
                  containerClassName="w-full"
                  onChange={handleInput}
                  onKeyDown={handleKeyPress}
                  isError={!!fieldsError?.confirm_password}
                  errorMessage={
                    fieldsError?.confirm_password
                      ? fieldsError?.confirm_password[0]
                      : ""
                  }
                />
              </div>
              <div className="pt-16px]">
                {error && (
                  <div className="font-D16px-M13px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
                    {error}
                  </div>
                )}
                <SubmitButton
                  ref={passButton}
                  highlighted={true}
                  customClass={classNames(
                    `w-full font-D16px-M15px`,
                    (!passData.new_password || !passData.confirm_password) &&
                      "!bg-lightgray !text-gray2 !border-none"
                  )}
                  showSpiner
                  disabled={
                    !passData.new_password || !passData.confirm_password
                  }
                  reverseColors
                  text="CHANGE PASSWORD"
                />
                <Link
                  href="/"
                  className="font-D16px-M15px mt-4 flex items-center justify-center text-gray2 transition duration-300 hover:text-gray"
                >
                  Back to home page
                </Link>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="m-auto max-w-[390px] sm:max-w-full">
            <div className="flex flex-col items-center justify-center gap-4 pt-6">
              <CheckIcon
                withCircle={true}
                width={60}
                height={60}
                strokeWidth={1.2}
                className="!stroke-[#9A9A9F]"
              />
              <div className="font-D32px-T24px-M24px text-center font-bold sm:font-medium">
                Password updated
              </div>
            </div>
            <div className="font-D16px-M13px mb-6 flex flex-col pt-2 text-center">
              Your password has been successfully reset, and you are now logged
              in.
            </div>
          </div>
          <div className="m-auto max-w-[390px] sm:max-w-full sm:px-0">
            <Button
              highlighted={true}
              customClass="w-full font-D16px-M15px"
              showSpiner
              reverseColors
              text="START SHOPPING"
              onPress={async () => router.push("/shop")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
