"use client";
import checkGuestEmail from "@/app/actions/auth/check_email/actions";
import { ModalType } from "@/types/modal_types";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import MyInput from "../Input/MyInput";
import SubmitButton from "../SubmitButton/SubmitButton";

interface LoginInitialProps {
  modalType?: ModalType;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setModalType: (value: ModalType) => void;
  tabIndex?: number;
  isNewUser?: boolean;
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
}

const LoginInitial: FC<LoginInitialProps> = ({
  email,
  setEmail,
  setModalType,
  isNewUser,
  setIsNewUser,
}) => {
  const [fieldsError, setFieldsError] = useState<{
    email?: string[] | undefined;
  }>();
  const [error, showError] = useState("");
  const [isCheckLoading, setIsCheckLoading] = useState(false);

  const handleCheckEmail = async () => {
    if (!email || isCheckLoading) {
      return;
    }

    setIsCheckLoading(true);
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", email);

    const checkEmail = await checkGuestEmail(formData);
    setIsCheckLoading(false);
    if (checkEmail?.error) {
      return showError(checkEmail.error);
    }
    if (checkEmail?.errors) {
      return setFieldsError(checkEmail.errors);
    }
    if (checkEmail?.additional?.existing_email) {
      setIsNewUser(false);
      return setModalType("Login");
    }
    setIsNewUser(true);
    return setModalType("LoginNonExisting");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.replace(/\s/g, ""));
  };

  return (
    <div className="relative">
      <div className="my-6 flex justify-center">
        <div className="font-D24px-M18px sm:font-medium">
          Welcome to our shop
        </div>
      </div>
      <form action={handleCheckEmail}>
        <div className="m-auto max-w-[448px] sm:max-w-none sm:px-4">
          <MyInput
            label="Email Address"
            name="email"
            required={true}
            className="w-full"
            value={email}
            onChange={handleInput}
            isError={!!fieldsError?.email}
            errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
          />
          <div className="mt-4">
            {error && (
              <div className="font-D16px-M13px mb-4 flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
                {error}
              </div>
            )}
            <div className="flex w-full flex-col-reverse justify-end gap-4">
              <SubmitButton
                text="CONTINUE"
                showSpiner={true}
                highlighted={true}
                reverseColors={true}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginInitial;
