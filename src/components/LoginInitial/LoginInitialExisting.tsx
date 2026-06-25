import setGuestCode from "@/app/actions/auth/send_code/actions";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import CheckIcon from "../Icons/CheckIcon";
import MyInput from "../Input/MyInput";
import InsideScroll from "../Scroll/InsideScroll";

interface LoginInitialExistingProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  goToInitial: () => void;
  goToLogin: () => void;
  goToLoginCode: () => void;
  tabIndex?: number;
}

const LoginInitialExisting: FC<LoginInitialExistingProps> = ({
  email,
  setEmail,
  goToInitial,
  goToLogin,
  goToLoginCode,
  tabIndex = 0,
}) => {
  const [fieldsError, setFieldsError] = useState<{
    email?: string[] | undefined;
  }>();
  const [error, showError] = useState("");

  const handleSendCode = async () => {
    if (!email) {
      return;
    }
    showError("");
    setFieldsError({});

    const formData = new FormData();
    formData.append("email", email);

    const setCode = await setGuestCode(formData);
    if (setCode?.errors) {
      return setFieldsError(setCode.errors);
    }
    if (setCode.error) {
      return showError(setCode.error);
    }
    return goToLoginCode();
  };

  const handleEditEmail = () => {
    showError("");
    setFieldsError({});
    goToInitial();
  };

  return (
    <InsideScroll className="h-[381px]">
      <div className="my-6 flex justify-center">
        <div className="font-D24px-M18px sm:font-medium">
          Welcome to our shop
        </div>
      </div>
      <form>
        <div className="m-auto max-w-[448px] sm:max-w-[100%]">
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
            tabIndex={tabIndex}
            icon={
              <CheckIcon width={26} height={26} className="!stroke-green" />
            }
          />
          <div className="mb-2 mt-2 flex w-full items-start justify-between">
            <button
              onClick={handleEditEmail}
              type="button"
              className="font-D16px-M13px text-gray2 transition duration-300 hover:text-gray"
              tabIndex={tabIndex}
            >
              Edit email
            </button>
          </div>
          {error && (
            <div className="font-D16px-M13px mb-4 flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
              {error}
            </div>
          )}
          <p className="font-D14px-M13px mb-4 font-bold text-green">
            *We have detected a user account with that email. Please login using
            your password or using a one time code.
          </p>
          <div className="flex w-full flex-col-reverse justify-end gap-4">
            <Button
              text="ONE TIME CODE"
              showSpiner={true}
              onPress={handleSendCode}
              customClass="!border-none !p-0 !h-auto !bg-transparent hover:!text-darkgray"
            />
            <Button
              text="LOGIN WITH PASSWORD"
              showSpiner={false}
              highlighted={true}
              reverseColors={true}
              onPress={async () => goToLogin()}
            />
          </div>
          <div className="font-12px-ALL mt-4 flex flex-col gap-1">
            <span className="font-bold">NOTE:</span>
            <p>LOGIN WITH PASSWORD - you can login with your own password</p>
            <p>ONE TIME CODE - log in without password.</p>
          </div>
        </div>
      </form>
    </InsideScroll>
  );
};

export default LoginInitialExisting;
