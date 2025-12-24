"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import MyInput from "../Input/MyInput";
import checkGuestEmail from "@/app/actions/auth/check_email/actions";
import { ModalType } from "@/types/modal_types";

interface DiscountProps {
  modalType?: ModalType;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setModalType: (value: ModalType) => void;
}

const Discount: FC<DiscountProps> = ({ email, setEmail, setModalType }) => {
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
    } else if (checkEmail?.errors) {
      return setFieldsError(checkEmail.errors);
    } else if (checkEmail?.additional?.existing_email) {
      setModalType("Login");
    } else {
      setModalType("LoginNonExisting");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckEmail();
    }
  };

  return (
    <>
      <div className="relative z-10 mx-auto flex w-full max-w-[480px] flex-col items-center justify-center rounded-[5px] p-[32px] text-center sm:px-[16px] sm:py-[24px]">
        <form>
          {/* <div className="text-[48px] font-medium leading-[58px] text-[#E7461E]">
            15% OFF
          </div>
          <div className="mt-[16px]">
            Save <span className="text-red">15%</span> on your{" "}
            <span className="font-medium">first order.</span>
          </div>
          <div className="my-[8px] text-center">
            Once registered system will apply the discount automatically.
          </div> */}
          <div>We run regular promotions and sales.</div>
          <div className="mt-6 w-full">
            <input type="text" hidden name="subscribe" value="yes" />
            <MyInput
              label="Email Address"
              required={true}
              name="email"
              value={email}
              onKeyDown={handleKeyPress}
              onChange={(e) => setEmail(e.target.value)}
              isError={!!fieldsError?.email}
              errorMessage={fieldsError?.email ? fieldsError?.email[0] : ""}
            />
          </div>
          {error && (
            <div className="font-D16px-M13px mt-5 flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
              {error}
            </div>
          )}
          <div className="mt-4 w-full">
            <Button
              showSpiner
              text="CONTINUE"
              highlighted
              reverseColors
              customClass="w-full"
              onPress={async () => handleCheckEmail()}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Discount;
