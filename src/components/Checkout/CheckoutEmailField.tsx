"use client";

import checkGuestEmail from "@/app/actions/auth/check_email/actions";
import loginUser from "@/app/actions/auth/login/actions";
import logoutUser from "@/app/actions/auth/logout/actions";
import registerUser from "@/app/actions/auth/register/actions";
import resendTempCode from "@/app/actions/auth/resend_temp_code/actions";
import resendTempPassword from "@/app/actions/auth/resend_temp_password/actions";
import setGuestCode from "@/app/actions/auth/send_code/actions";
import verifyCode from "@/app/actions/auth/verify_code/actions";
import { useModalContext } from "@/context/ModalContext";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { ICheckout } from "@/types/payment";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { mutate } from "swr";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import ErrorMessage from "../ErrorSuccessMessages/ErrorMessage";
import CheckIcon from "../Icons/CheckIcon";
import LogOutIcon from "../Icons/LogOutIcon";
import XMarkIcon from "../Icons/XMarkIcon";
import MyInput from "../Input/MyInput";
import ResendEmail from "../ResendEmail/ResendEmail";
import Spinner from "../SvgComponents/Spinner";

interface CheckoutEmailFieldProps {
  checkoutData?: ICheckout;
  billing_email: string;
  checkoutDataLoading: boolean;
  handleSetEmail: (email: string) => void;
  setIsValidatedEmail: Dispatch<SetStateAction<boolean>>;
}

type CheckoutEmailState =
  | "initial"
  | "existing"
  | "existing-login"
  | "existing-verify"
  | "non-existing"
  | "non-existing-register"
  | "non-existing-verify"
  | "verified-logged"
  | "verified";

const CheckoutEmailField: FC<CheckoutEmailFieldProps> = ({
  checkoutData,
  billing_email = "",
  checkoutDataLoading,
  handleSetEmail,
  setIsValidatedEmail,
}) => {
  const { handleUpdateShippingUpdate } = useCheckoutContext();

  const [error, showError] = useState("");
  const [fieldsError, setFieldsError] = useState<{
    email?: string[] | undefined;
    code?: string[] | undefined;
    password?: string[] | undefined;
  }>();
  const emailRef = useRef<HTMLInputElement>(null);
  const [isCheckLoading, setIsCheckLoading] = useState(false);
  const [state, setState] = useState<CheckoutEmailState>("initial");
  const [tempCode, setTempCode] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { openModal } = useModalContext();

  useEffect(() => {
    if (checkoutData) {
      handleSetEmail(checkoutData.billing_address.email);

      if (checkoutData.isUserLoggedIn) {
        setState("verified-logged");
        setIsValidatedEmail(true);
      } else if (checkoutData.isVerifiedEmail) {
        setState("verified");
        setIsValidatedEmail(true);
      } else {
        emailRef.current?.focus();
        setState("initial");
        setIsValidatedEmail(false);
      }
    }
  }, [checkoutData]);

  useEffect(() => {
    if (state == "initial") {
      emailRef.current?.focus();
    }
  }, [state]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetEmail(e.target.value.replace(/\s/g, ""));
  };

  const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.replace(/\s/g, ""));
  };

  const handleInputCode = (e: ChangeEvent<HTMLInputElement>) => {
    setTempCode(e.target.value.replace(/\s/g, ""));
  };

  const handleEditEmail = () => {
    showError("");
    setFieldsError({});
    setPassword("");
    setTempCode("");
    setState("initial");
    setIsValidatedEmail(false);
  };

  const handleCheckEmail = async () => {
    if (!billing_email || isCheckLoading) {
      return;
    }

    setIsCheckLoading(true);
    showError("");
    setFieldsError({});
    setState("initial");

    const formData = new FormData();
    formData.append("email", billing_email);

    const checkEmail = await checkGuestEmail(formData);
    setIsCheckLoading(false);
    if (checkEmail?.error) {
      return showError(checkEmail.error);
    }
    if (checkEmail?.errors) {
      return setFieldsError(checkEmail.errors);
    }
    if (checkEmail?.additional?.existing_email) {
      return setState("existing");
    }
    return setState("non-existing");
  };

  const handleSendCode = async () => {
    if (!billing_email || isCheckLoading) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", billing_email);

    const setCode = await setGuestCode(formData);
    if (setCode?.errors) {
      setFieldsError(setCode.errors);
    } else if (!setCode?.error) {
      setState((prev) =>
        prev == "existing" ? "existing-verify" : "non-existing-verify"
      );
    } else {
      showError(setCode.error);
    }
  };

  const handleRegister = async () => {
    if (!billing_email || isCheckLoading) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", billing_email);
    formData.append("remember", remember ? "yes" : "no");
    formData.append("subscribe", "yes");

    const register = await registerUser(formData);
    if (register?.errors) {
      setFieldsError(register.errors);
    } else if (!register?.error) {
      setState("non-existing-register");
    } else {
      showError(register.error);
    }
  };

  const handleVerify = async () => {
    if (!billing_email || !tempCode) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", billing_email);
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
      await mutate("/api/user/specific_user");
      await mutate("/api/checkout");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
      setState("verified-logged");
      setIsValidatedEmail(true);
      return;
    }
    setState("verified");
    setIsValidatedEmail(true);
    return;
  };

  const handleLogin = async () => {
    if (!billing_email || !password) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("username", billing_email);
    formData.append("password", password);
    formData.append("remember", remember ? "yes" : "no");

    const login = await loginUser(formData);
    if (login?.errors) {
      setFieldsError(login.errors);
    } else if (!login?.error) {
      await mutate("/api/user/");
      await mutate("/api/cart/get_cart");
      await mutate("/api/user/specific_user");
      await mutate("/api/checkout");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
      setState("verified-logged");
      setIsValidatedEmail(true);
    } else {
      showError(login.error);
    }
  };

  const handleResendCode = async () => {
    if (!billing_email) {
      return;
    }
    const formData = new FormData();
    formData.append("email", billing_email);
    const res = await resendTempCode(formData);
    if (res?.error) {
      showError(res.error);
    }
  };

  const handleResendPassword = async () => {
    if (!billing_email) {
      return;
    }
    const res = await resendTempPassword();
    if (res?.error) {
      showError(res.error);
    }
  };

  const handleLogout = async () => {
    handleUpdateShippingUpdate(true);
    await logoutUser();
    await mutate("/api/user/");
    await mutate("/api/cart/get_cart");
    await mutate("/api/checkout");
    await mutate(
      (key) => typeof key === "string" && key.startsWith("/api/products")
    );
    handleEditEmail();
    handleUpdateShippingUpdate(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckEmail();
    }
  };

  const editEmailStates: CheckoutEmailState[] = [
    "existing-login",
    "existing-verify",
    "non-existing-register",
    "non-existing-verify",
    "verified",
  ];

  return (
    <>
      <div>
        <div className="w-full">
          <input type="hidden" name="email" value={billing_email} />
          <MyInput
            inputRef={emailRef}
            label="Email Address"
            tabIndex={-1}
            required={true}
            name="email"
            value={billing_email}
            onChange={handleInput}
            onBlur={() => handleCheckEmail()}
            onKeyDown={handleKeyPress}
            disabled={
              !["initial", "existing", "non-existing"].includes(state) ||
              isCheckLoading ||
              checkoutDataLoading
            }
            containerClassName="w-full"
            isError={!!fieldsError?.email}
            errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
            icon={
              isCheckLoading && state == "initial" ? (
                <Spinner customClass="!m-0" />
              ) : state == "existing" ? (
                <CheckIcon width={26} height={26} className="!stroke-green" />
              ) : state == "non-existing" ? (
                <XMarkIcon width={26} height={26} className="!stroke-red" />
              ) : state == "verified-logged" ? (
                <button
                  onClick={handleLogout}
                  type="button"
                  className="group/logout font-D16px-M13px flex items-center gap-2 text-gray2 transition duration-300 hover:text-red"
                >
                  <LogOutIcon className="transition duration-300 group-hover/logout:fill-red" />
                  <span className="xs:hidden">Log Out</span>
                </button>
              ) : null
            }
          />
        </div>
        {state == "existing" && (
          <>
            <p className="font-D14px-M13px mb-8 mt-2 font-bold text-green">
              * Account detected. Please login using your password or using a
              one time code.
            </p>
            <div className="flex w-full justify-end gap-4 sm:flex-col">
              <Button
                text="LOGIN WITH PASSWORD"
                showSpiner={false}
                highlighted={true}
                reverseColors={true}
                onPress={async () => setState("existing-login")}
              />
              <Button
                text="ONE TIME CODE"
                showSpiner={true}
                onPress={handleSendCode}
                customClass="!border-none !p-0 !bg-transparent hover:!text-[#333333]"
              />
            </div>
            <div className="font-12px-ALL mt-4 flex flex-col gap-1">
              <span className="font-bold">NOTE:</span>
              <p>LOGIN WITH PASSWORD - you can login with your own password</p>
              <p>ONE TIME CODE - log in without password.</p>
            </div>
          </>
        )}
        {state == "non-existing" && (
          <>
            <p className="font-D14px-M13px mb-8 mt-2 font-bold text-red">
              * There is no account. Please register now or verify your email.
            </p>
            <div className="flex w-full justify-end gap-4 sm:flex-col">
              <Button
                text="REGISTER NOW"
                showSpiner={true}
                highlighted={true}
                reverseColors={true}
                onPress={handleRegister}
              />
              <Button
                text="VERIFY EMAIL"
                showSpiner={true}
                onPress={handleSendCode}
                customClass="!border-none !p-0 !bg-transparent hover:!text-[#333333]"
              />
            </div>
            <div className="font-12px-ALL mt-4 flex flex-col gap-1">
              <span className="font-bold">NOTE:</span>
              <p>REGISTER NOW - continue checkout being registered.</p>
              <p>VERIFY EMAIL - continue checkout as a guest.</p>
            </div>
          </>
        )}
        {editEmailStates.includes(state) && (
          <div className="mb-4 mt-2 flex w-full items-start justify-between">
            <button
              onClick={handleEditEmail}
              type="button"
              className="font-D16px-M13px text-gray2 transition duration-300 hover:text-[#333333]"
            >
              Edit email
            </button>
            {["existing-verify", "non-existing-verify"].includes(state) && (
              <ResendEmail
                showError={showError}
                className="!font-D16px-M14px shrink-0"
                resendAction={handleResendCode}
              />
            )}
            {state == "non-existing-register" && (
              <ResendEmail
                showError={showError}
                className="!font-D16px-M14px shrink-0"
                resendAction={handleResendPassword}
              />
            )}
          </div>
        )}
        {/* {state == "verified-logged" && (
          <button
            onClick={handleLogout}
            type="button"
            className="group/logout font-D16px-M13px mb-4 mt-2 flex items-center gap-2 text-gray2 transition duration-300 hover:text-red"
          >
            <LogOutIcon className="transition duration-300 group-hover/logout:fill-red" />
            Log Out
          </button>
        )} */}
        {state == "existing-login" && (
          <>
            <MyInput
              label="Password"
              name="password"
              required={true}
              value={password}
              type="password"
              containerClassName="w-full"
              onChange={handleInputPassword}
              isError={!!fieldsError?.password}
              errorMessage={
                fieldsError?.password ? fieldsError?.password[0] : ""
              }
            />
            <p className="font-D14px-M13px mt-2 font-bold text-green">
              * Please login using your password.
            </p>
            <div className="mt-3 flex justify-end gap-4">
              {/* <div className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={remember}
                  onChange={setRemember}
                />
                <label
                  htmlFor="remember"
                  className="font-D14px-M13px sm:leading-4"
                >
                  Remember me
                </label>
              </div> */}
              <div
                className="font-D14px-M13px cursor-pointer transition duration-300 hover:text-[#333333] sm:leading-4"
                onClick={() => {
                  openModal("LostPassword");
                }}
              >
                Reset your password / Forgot your password?
              </div>
            </div>
            <div className="mt-8 flex w-full justify-end gap-4 sm:flex-col-reverse">
              {error && (
                <ErrorMessage
                  message={error}
                  customClass="w-full"
                  hideErrorMessage={() => showError("")}
                />
              )}
              <Button
                text="LOGIN"
                customClass="shrink-0"
                highlighted={true}
                showSpiner={true}
                reverseColors={true}
                onPress={handleLogin}
              />
            </div>
          </>
        )}
        {state == "existing-verify" && (
          <>
            <MyInput
              label="Enter your code"
              name="code"
              required={true}
              value={tempCode}
              type="password"
              className="w-full"
              onChange={handleInputCode}
              isError={!!fieldsError?.code}
              errorMessage={fieldsError?.code ? fieldsError?.code[0] : ""}
            />
            <p className="font-D14px-M13px mt-2 font-bold text-green">
              * Your one time code has been sent to your email.
            </p>
            <div className="mt-8 flex w-full justify-end gap-4 sm:flex-col-reverse">
              {error && (
                <ErrorMessage
                  message={error}
                  customClass="w-full"
                  hideErrorMessage={() => showError("")}
                />
              )}
              <Button
                text="LOGIN"
                customClass="shrink-0"
                highlighted={true}
                showSpiner={true}
                reverseColors={true}
                onPress={handleVerify}
              />
            </div>
          </>
        )}
        {state == "non-existing-register" && (
          <>
            <MyInput
              label="Temporary Password"
              name="password"
              required={true}
              value={password}
              type="password"
              containerClassName="w-full"
              onChange={handleInputPassword}
              isError={!!fieldsError?.password}
              errorMessage={
                fieldsError?.password ? fieldsError?.password[0] : ""
              }
            />
            <p className="font-D14px-M13px mt-2 font-bold text-red">
              * Your temporary password to log in has been sent to your email.
            </p>
            <div className="mt-3 flex items-center">
              <Checkbox
                name="remember"
                checked={remember}
                onChange={setRemember}
              />
              <label
                htmlFor="remember"
                className="font-D14px-M13px sm:leading-4"
              >
                Remember me
              </label>
            </div>
            <div className="mt-8 flex w-full justify-end gap-4 sm:flex-col-reverse">
              {error && (
                <ErrorMessage
                  message={error}
                  customClass="w-full"
                  hideErrorMessage={() => showError("")}
                />
              )}
              <Button
                text="REGISTER"
                customClass="shrink-0"
                highlighted={true}
                showSpiner={true}
                reverseColors={true}
                onPress={handleLogin}
              />
            </div>
          </>
        )}
        {state == "non-existing-verify" && (
          <>
            <MyInput
              label="Enter your code"
              name="code"
              required={true}
              value={tempCode}
              type="password"
              containerClassName="w-full"
              onChange={handleInputCode}
              isError={!!fieldsError?.code}
              errorMessage={fieldsError?.code ? fieldsError?.code[0] : ""}
            />
            <p className="font-D14px-M13px mt-2 font-bold text-red">
              *Your verification code has been sent to your email.
            </p>
            <div className="mt-8 flex w-full justify-end gap-4 sm:flex-col-reverse">
              {error && (
                <ErrorMessage
                  message={error}
                  customClass="w-full"
                  hideErrorMessage={() => showError("")}
                />
              )}
              <Button
                text="VERIFY"
                customClass="shrink-0"
                highlighted={true}
                showSpiner={true}
                reverseColors={true}
                onPress={handleVerify}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutEmailField;
