"use client";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useSWRConfig } from "swr";

import resendTempCode from "@/app/actions/auth/resend_temp_code/actions";
import verifyCode from "@/app/actions/auth/verify_code/actions";
import MyInput from "../Input/MyInput";
import ResendEmail from "../ResendEmail/ResendEmail";
import InsideScroll from "../Scroll/InsideScroll";
import SubmitButton from "../SubmitButton/SubmitButton";

interface LoginCodeProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  goToInitial: () => void;
  goToSuccess?: () => void;
  tabIndex?: number;
}

const LoginCode: FC<LoginCodeProps> = ({
  email,
  setEmail,
  goToInitial,
  goToSuccess,
  tabIndex = 0,
}) => {
  const [error, showError] = useState("");
  const { mutate } = useSWRConfig();
  const [fieldsError, setFieldsError] = useState<{
    code?: string[] | undefined;
    email?: string[] | undefined;
  }>();

  const [tempCode, setTempCode] = useState("");

  const loginButton = useRef<HTMLButtonElement>(null);

  const handleVerify = async () => {
    if (!email || !tempCode) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", tempCode);

    const verify = await verifyCode(formData);
    if (verify?.errors) {
      return setFieldsError(verify.errors);
    }
    if (verify?.error) {
      return showError(verify.error);
    }
    if (verify?.additional?.was_logged) {
      await mutate("/api/user/");
      await mutate("/api/cart/get_cart");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
      setEmail("");
      goToSuccess?.();
      return;
    }
  };

  const handleInputCode = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldsError({});
    setTempCode(e.target.value.replace(/\s/g, ""));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginButton.current?.click();
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      return;
    }
    const formData = new FormData();
    formData.append("email", email);
    const res = await resendTempCode(formData);
    if (res?.error) {
      showError(res.error);
    }
  };

  const handleEditEmail = () => {
    showError("");
    setFieldsError({});
    setTempCode("");
    goToInitial();
  };

  return (
    <InsideScroll className="h-[320px] sm:!h-[330px]">
      <div className="flex justify-center">
        <div className="font-D24px-M18px py-[24px] sm:font-medium">
          Welcome to our shop
        </div>
      </div>
      <form action={handleVerify}>
        <div className="m-auto max-w-[448px] sm:max-w-[100%]">
          <MyInput
            label="Email Address"
            name="email"
            disabled={true}
            required={true}
            className="w-full"
            value={email}
            onKeyDown={handleKeyPress}
            isError={!!fieldsError?.email}
            errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
            tabIndex={tabIndex}
          />
          <div className="mb-4 mt-2 flex w-full items-start justify-between">
            <button
              onClick={handleEditEmail}
              type="button"
              className="font-D16px-M13px text-gray2 transition duration-300 hover:text-[#333333]"
              tabIndex={tabIndex}
            >
              Edit email
            </button>
            <ResendEmail
              showError={showError}
              className="!font-D16px-M14px shrink-0"
              resendAction={handleResendCode}
              tabIndex={tabIndex}
            />
          </div>
          <div className="mt-4">
            <MyInput
              label="One time code"
              name="code"
              required={true}
              value={tempCode}
              type="password"
              containerClassName="w-full"
              onChange={handleInputCode}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.code}
              errorMessage={fieldsError?.code ? fieldsError?.code[0] : ""}
              tabIndex={tabIndex}
            />
          </div>
          <p className="font-D14px-M13px mt-2 font-bold text-green">
            Your one time code has been sent to your email.
          </p>
          <div className="mt-4">
            {error && (
              <div className="font-D16px-M13px mb-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
                {error}
              </div>
            )}
            <SubmitButton
              ref={loginButton}
              highlighted={true}
              customClass="w-[100%] font-D16px-M15px"
              showSpiner
              disabled={!tempCode || !email}
              reverseColors
              text={"LOGIN"}
              tabIndex={tabIndex}
            />
          </div>
        </div>
      </form>
    </InsideScroll>
  );
};

export default LoginCode;
