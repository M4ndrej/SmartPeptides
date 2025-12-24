"use client";
import { ChangeEvent, FC, useRef, useState } from "react";
import Button from "../Button/Button";
import classNames from "classnames";
import requestResetPassword from "@/app/actions/auth/request_reset_password/actions";
import MyInput from "../Input/MyInput";
import { ModalType } from "@/types/modal_types";

interface lostPasswordProps {
  hideCreateAcc?: boolean;
  setModalType: (value: ModalType) => void;
}

const LostPassword: FC<lostPasswordProps> = ({
  hideCreateAcc,
  setModalType,
}) => {
  const resetBtn = useRef<HTMLButtonElement>(null);
  const [error, showError] = useState("");
  const [message, showMessage] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
  });

  const [fieldsError, setFieldsError] = useState<{
    username?: string[];
  }>();

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    showError("");
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    setShowScroll(false);
  };

  const handleResetPassword = async () => {
    const data = new FormData();
    data.append("username", formData.username);

    showError("");
    const reset = await requestResetPassword(data);

    if (reset.error) {
      showError(reset.error);
      setShowScroll(true);
      return;
    }
    if (reset.errors) {
      setFieldsError(reset.errors);
      return;
    }
    if (reset.success) {
      // goToResetSuccess?.();
      setModalType?.("ResetSuccess");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      resetBtn?.current?.click();
    }
  };

  return (
    <div
      className={classNames(
        "relative",
        hideCreateAcc ? "!h-[270px]" : !error ? "!h-[306px]" : "!h-[406px]"
      )}
    >
      <div className="flex justify-center">
        <div className="font-D24px-M18px py-[24px] pb-0 sm:font-medium">
          Lost Password?
        </div>
      </div>
      <div className="m-auto max-w-[448px] sm:max-w-[100%] sm:px-0">
        {message ? (
          <div className="font-D16px-M13px pb-[16px] pt-[24px]">{message}</div>
        ) : (
          <>
            <div className="font-D16px-M13px pb-[16px] pt-[24px] sm:pb-[10px]">
              Please enter your email. You will receive a link to create a new
              password.
            </div>
            <MyInput
              label="Email address"
              name="username"
              required={true}
              value={formData.username}
              containerClassName="w-full"
              onChange={handleInput}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.username}
              errorMessage={
                fieldsError?.username ? fieldsError?.username[0] : ""
              }
            />
            <div className="pt-6">
              {error && (
                <div className="font-D16px-M13px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
                  {error}
                </div>
              )}
              <Button
                ref={resetBtn}
                id="reset"
                text="RESET PASSWORD"
                highlighted={true}
                customClass="w-[100%] font-16px-ALL"
                onPress={handleResetPassword}
                showSpiner
                disabled={!formData.username}
                reverseColors
              />
            </div>
          </>
        )}

        {!hideCreateAcc && (
          <div className="font-D16px-M13px flex w-[100%] justify-center pt-[16px] sm:leading-[16px]">
            <div>
              Not a member?{" "}
              <span
                className="cursor-pointer select-none text-[#E7461E] transition duration-300 hover:text-[#E7461E]"
                onClick={() => setModalType?.("Initial")}
              >
                Create an account
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPassword;
