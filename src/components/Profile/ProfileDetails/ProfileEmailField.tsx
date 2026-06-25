import resendTempEmailCode from "@/app/actions/user/resend_temporary_email_code/actions";
import setTempEmail from "@/app/actions/user/set_temp_email/actions";
import verifyTempEmail from "@/app/actions/user/verify_temporary_email/actions";
import ErrorMessage from "@/components/ErrorSuccessMessages/ErrorMessage";
import SuccessMessage from "@/components/ErrorSuccessMessages/SuccessMessage";
import ArrowRightIcon from "@/components/Icons/ArrowRightIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import XMarkIcon from "@/components/Icons/XMarkIcon";
import MyInput from "@/components/Input/MyInput";
import ResendEmail from "@/components/ResendEmail/ResendEmail";
import Spinner from "@/components/SvgComponents/Spinner";
import classNames from "classnames";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";

interface ProfileEmailFieldProps {
  initialEmail?: string;
  handleInputEmail: (email: string) => void;
}

type ChangeEmailState =
  | "initial"
  | "editing"
  | "registered"
  | "error"
  | "validated";

const ProfileEmailField: FC<ProfileEmailFieldProps> = ({
  initialEmail,
  handleInputEmail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  const [state, setState] = useState<ChangeEmailState>("initial");
  const [tempCode, setTempCode] = useState("");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [emailErrors, setEmailErrors] = useState<{
    email?: string[] | undefined;
    code?: string[] | undefined;
  }>();
  const [error, showError] = useState("");

  useEffect(() => {
    if (state === "validated") {
      setTimeout(() => setState("initial"), 10000);
    }
  }, [state]);

  const handleSetTempEmail = async () => {
    if (!email || isLoading || isCodeLoading) {
      return;
    }
    setIsLoading(true);
    showError("");
    setEmailErrors({});

    const formData = new FormData();
    formData.append("email", email);
    const setTemp = await setTempEmail(formData);

    setIsLoading(false);
    if (setTemp?.error) {
      return showError(setTemp.error);
    }
    if (setTemp?.errors) {
      return setEmailErrors(setTemp.errors);
    }
    setState("registered");
  };

  const handleTempCode = async () => {
    if (!email || !tempCode || isCodeLoading || state == "validated") {
      return;
    }
    setIsCodeLoading(true);
    showError("");
    setEmailErrors({});

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", tempCode);

    const verify = await verifyTempEmail(formData);
    setIsCodeLoading(false);

    if (verify?.errors) {
      return setEmailErrors(verify.errors);
    }
    if (verify?.error) {
      showError(verify.error);
      return setState("error");
    }
    setState("validated");
    handleInputEmail(email);
  };

  const handleBlur = () => {
    if (state != "editing") {
      setTempCode("");
      setState("editing");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && state == "editing") {
      handleSetTempEmail();
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErrors({});
    setEmail(e.target.value.replace(/\s/g, ""));
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex min-h-12 w-full flex-row gap-[10px] sm:flex-col">
        <div className="relative h-12 grow">
          <MyInput
            label="Email"
            required={true}
            name="email"
            onChange={handleChangeEmail}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            value={email}
            disabled={state == "initial"}
            type="email"
            containerClassName="w-full"
            isError={!!emailErrors?.email}
            errorMessage={emailErrors?.email ? emailErrors?.email[0] : ""}
            iconContainerClassName={classNames(
              isLoading && state == "editing" && "!right-[150px]"
            )}
            icon={
              isLoading && state == "editing" ? (
                <Spinner customClass="!m-0" />
              ) : state == "validated" ? (
                <CheckIcon width={26} height={26} className="!stroke-green" />
              ) : state == "error" || state == "registered" ? (
                <XMarkIcon width={26} height={26} className="!stroke-red" />
              ) : null
            }
          />
          {state == "editing" && (
            <button
              type="button"
              className={classNames(
                `absolute right-1 top-1 inline-flex h-10 w-[132px] select-none items-center justify-center overflow-hidden text-ellipsis 
                whitespace-nowrap rounded-[5px] border border-[#9A9A9F] bg-[#9A9A9F] 
                font-medium text-textWhite !transition-all !duration-300 
              hover:bg-[#9A9A9F] hover:text-textWhite`,
                (!email || !!emailErrors?.email) &&
                  "!border-none !bg-lightgray !text-gray2"
              )}
              disabled={isLoading || !email || !!emailErrors?.email}
              onClick={handleSetTempEmail}
            >
              UPDATE
            </button>
          )}
        </div>
        {state == "registered" && (
          <MyInput
            label="Enter your code"
            name="password"
            required={true}
            value={tempCode}
            type="password"
            containerClassName="w-56 sm:w-full"
            onChange={(e) => setTempCode(e.target.value)}
            isError={!!emailErrors?.code}
            errorMessage={emailErrors?.code ? emailErrors?.code[0] : ""}
            iconContainerClassName="!right-1 !top-1 !translate-y-0"
            icon={
              <button
                type="button"
                className={classNames(
                  `inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden text-ellipsis 
                    whitespace-nowrap rounded-[5px] border   
                    font-medium text-white !transition-all !duration-300 
                  hover:text-white`
                )}
                disabled={isCodeLoading}
                onClick={() => (!isCodeLoading ? handleTempCode() : null)}
              >
                {isCodeLoading ? (
                  <Spinner reverseColors={false} customClass="!m-0" />
                ) : (
                  <ArrowRightIcon type="email-code" />
                )}
              </button>
            }
          />
        )}
        {state == "error" && (
          <ErrorMessage
            message={"Try Again!"}
            customClass="!w-56 sm:!w-full"
            hideErrorMessage={() => setState("registered")}
          />
        )}
        {state == "validated" && (
          <SuccessMessage
            message={"Email Verified"}
            customClass="!w-56 sm:!w-full"
            hideSuccessMessage={() => setState("initial")}
          />
        )}
      </div>
      {state == "initial" && (
        <button
          onClick={() => setState("editing")}
          type="button"
          className="font-D16px-M13px mt-2 text-gray2 transition duration-300 hover:text-gray"
        >
          Edit email
        </button>
      )}
      {(state == "registered" || state == "error") && (
        <div
          className={classNames(
            "mt-2 flex items-start justify-between gap-2",
            (emailErrors?.code || emailErrors?.email) && "mt-8"
          )}
        >
          <p className="font-D12px-M11px text-red">
            Your email has not been verified. Please check your email, the
            verification link has been sent.
          </p>
          <ResendEmail
            showError={showError}
            className="!font-D12px-M11px shrink-0"
            resendAction={resendTempEmailCode}
          />
        </div>
      )}
      {error && (
        <div className="font-D16px-M13px mt-[14px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfileEmailField;
