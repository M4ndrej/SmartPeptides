import React, { ChangeEvent, FC, useRef, useState } from "react";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useSWRConfig } from "swr";
import setNewPassword from "@/app/actions/auth/set_new_password/actions";
import MyInput from "../Input/MyInput";
import Button from "../Button/Button";

interface PassData {
  new_password: string;
  confirm_password: string;
}

interface ChangePasswordProps {
  onClose?: () => void;
}

const ChangePassword: FC<ChangePasswordProps> = ({ onClose }) => {
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
    const passChange = await setNewPassword(formData);

    showError("");
    if (passChange?.errors) {
      setFieldsError(passChange.errors);
    } else if (!passChange?.error) {
      await mutate("/api/cart/get_cart");
      await mutate("/api/user/");
      onClose?.();
    } else {
      showError(passChange.error);
    }
  };

  const closeModal = () => {
    onClose?.();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      passButton.current?.click();
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center gap-[16px] pt-[24px]">
        <div className="font-D24px-M18px text-center sm:font-medium">
          Change your temporary password
        </div>
      </div>
      <div className="font-D16px-M13px mx-[40px] mb-[24px] flex flex-col pt-[16px] sm:pt-[10px]">
        If you want to change your temporary password from your email, please
        fill the form below.
      </div>
      <form action={handlePasswordForm}>
        <div className="m-auto max-w-[448px] sm:max-w-none sm:px-4">
          <MyInput
            label="New Password"
            name="new_password"
            required={true}
            className="w-full"
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
              className="w-full"
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
              customClass="w-[100%] font-D16px-M15px"
              showSpiner
              disabled={!passData.new_password || !passData.confirm_password}
              reverseColors
              text="SAVE"
            />
            <Button
              text="CANCEL"
              showSpiner={true}
              highlighted={true}
              reverseColors={true}
              onPress={async () => closeModal()}
              customClass="w-[100%] bg-transparent !text-[#333333] border-none hover:bg-transparent hover:text-[#333333]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
