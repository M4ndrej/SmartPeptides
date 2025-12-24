"use client";
import registerUser from "@/app/actions/auth/register/actions";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import MyInput from "../Input/MyInput";
import { ModalType } from "@/types/modal_types";
import ChangeEmailIcon from "../Icons/ChangeEmailIcon";

interface LoginInitialNonExistingProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setModalType: (value: ModalType) => void;
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
  isNewUser?: boolean;
}

const LoginInitialNonExisting: FC<LoginInitialNonExistingProps> = ({
  email,
  setEmail,
  setModalType,
  isNewUser,
  setIsNewUser,
}) => {
  const [error, showError] = useState("");
  const [fieldsError, setFieldsError] = useState<{
    email?: string[] | undefined;
  }>();

  const handleRegister = async () => {
    setIsNewUser(true);
    if (!email) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", email);
    formData.append("subscribe", "yes");

    const register = await registerUser(formData);
    if (register?.errors) {
      return setFieldsError(register.errors);
    }
    if (register?.error) {
      return showError(register.error);
    }
    return setModalType("LoginNewUser");
  };

  const handleEmailIconClick = () => {
    setModalType("Initial");
  };

  return (
    <div className="relative ">
      <div className="my-6 flex justify-center">
        <div className="text-[22px] sm:text-[18px] sm:font-medium">
          Account not found. Please register now
        </div>
      </div>
      <form>
        <div className="m-auto max-w-[448px] sm:max-w-none sm:px-4">
          <div className="mb-[16px] mt-[24px]">
            <MyInput
              label="Email Address"
              name="email"
              disabled={true}
              required={true}
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isError={!!fieldsError?.email}
              errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
              icon={
                <ChangeEmailIcon
                  emailEditState="view"
                  handleEmailIconClick={handleEmailIconClick}
                />
              }
            />
          </div>
          {error && (
            <div className="font-D16px-M13px mb-4 flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
              {error}
            </div>
          )}
          <>
            <div className="flex w-full flex-col-reverse justify-end gap-4">
              <Button
                text="REGISTER"
                showSpiner={true}
                highlighted={true}
                reverseColors={true}
                disabled={!email}
                onPress={handleRegister}
              />
            </div>
          </>
        </div>
      </form>
    </div>
  );
};

export default LoginInitialNonExisting;
