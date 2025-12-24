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

import loginUser from "@/app/actions/auth/login/actions";
import resendTempPassword from "@/app/actions/auth/resend_temp_password/actions";
import { ModalType } from "@/types/modal_types";
import { useRouter } from "next/navigation";
import ChangeEmailIcon from "../Icons/ChangeEmailIcon";
import MyInput from "../Input/MyInput";
import ResendEmail from "../ResendEmail/ResendEmail";
import SubmitButton from "../SubmitButton/SubmitButton";

interface LoginProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setModalType: (value: ModalType) => void;
  onClose?: () => void;
  isNewUser?: boolean;
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: FC<LoginProps> = ({
  email,
  setEmail,
  setModalType,
  onClose,
  isNewUser,
  setIsNewUser,
}) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const loginButton = useRef<HTMLButtonElement>(null);

  const [password, setPassword] = useState("");

  const [error, showError] = useState("");
  const [fieldsError, setFieldsError] = useState<{
    password?: string[] | undefined;
    email?: string[] | undefined;
  }>();

  const handleLogin = async () => {
    setIsNewUser(false);
    if (!email || !password) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("remember", "yes");

    const login = await loginUser(formData);
    if (login?.errors) {
      return setFieldsError(login.errors);
    }
    if (login?.error) {
      return showError(login.error);
    }
    await mutate("/api/user/");
    await mutate("/api/cart/get_cart");
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/products")
    );
    setEmail("");
    if (login?.isDefaultPassword) {
      router.push("/");
    } else {
      router.push("/");
      onClose?.();
    }
  };

  const handleResendPassword = async () => {
    if (!email) return;
    const res = await resendTempPassword();
    if (res?.error) {
      showError(res.error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginButton.current?.click();
    }
  };

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldsError({});
    setPassword(e.target.value.replace(/\s/g, ""));
  };

  const handleEmailIconClick = () => {
    setModalType("Initial");
  };

  return (
    <div className="relative">
      <div className="flex justify-center">
        <div className="font-D24px-M18px py-[24px] sm:font-medium">
          {!isNewUser ? "Welcome to our shop" : "User Registration"}
        </div>
      </div>
      <form action={handleLogin}>
        <div className="m-auto max-w-[448px] sm:max-w-none sm:px-4">
          <MyInput
            label="Email Address"
            name="email"
            disabled={true}
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pwIgnore={false}
            isError={!!fieldsError?.email}
            errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
            icon={
              <ChangeEmailIcon
                emailEditState="view"
                handleEmailIconClick={handleEmailIconClick}
              />
            }
          />
          <div className="my-[16px] ">
            <MyInput
              label="Password"
              name="password"
              required={true}
              value={password}
              type="password"
              pwIgnore={false}
              className="w-full"
              onChange={handleInputPassword}
              onKeyDown={handleKeyPress}
              isError={!!fieldsError?.password}
              errorMessage={
                fieldsError?.password ? fieldsError?.password[0] : ""
              }
              icon={
                isNewUser && (
                  <ResendEmail
                    resendAction={handleResendPassword}
                    showError={showError}
                    name="Password"
                  />
                )
              }
            />
          </div>

          <p className="font-D14px-M13px mt-2 font-bold text-red">
            {isNewUser
              ? "Temporary password has been sent to your email."
              : " "}
          </p>
          <div className="flex items-center">
            {!isNewUser && (
              <div
                className="font-D16px-M13px ml-auto cursor-pointer select-none transition duration-300 hover:text-[#E7461E] sm:leading-[16px]"
                onClick={() => setModalType("LostPassword")}
              >
                Forgot your password?
              </div>
            )}
          </div>
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
              disabled={!password || !email}
              reverseColors
              text={isNewUser ? "REGISTER" : "LOGIN"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
