"use client";
import requestCashout from "@/app/actions/affiliate/cashout/actions";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { AffiliatePaymentMethod } from "@/types/affiliates";
import classNames from "classnames";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAffiliateContext } from "../AffiliateContext";
import MyInput from "@/components/Input/MyInput";
import CustomModal from "@/components/CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";

interface CashOutModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  paymentMethod: AffiliatePaymentMethod | undefined;
}

const CashOutModal: FC<CashOutModalProps> = ({
  isOpen,
  setIsOpen,
  paymentMethod,
}) => {
  const { affiliateInfo } = useAffiliateContext();
  const totalAmount = affiliateInfo?.affiliate?.standing ?? 0;

  const [error, setError] = useState<string | undefined>();
  const [cashErrors, setCashErrors] = useState<string[]>();
  const [amount, setAmount] = useState<string>("");
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleRequestCashout = async () => {
    setError(undefined);
    setCashErrors([]);

    const formData = new FormData();
    formData.append("amount", amount);
    const request = await requestCashout(formData);

    if (request.errors) {
      return setCashErrors(request.errors?.amount);
    }
    if (request.error) {
      return setError(request.error);
    }

    setError("");
    setCashErrors([]);
    setAmount("");
    setIsOpen(false);
  };

  const inputAmount = (val: string) => {
    setCashErrors(undefined);
    setAmount(val);
  };

  const disabled =
    !paymentMethod ||
    !amount ||
    +amount > totalAmount ||
    (paymentMethod?.key !== "store_credit" && +amount < 500);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="CashOutModal"
    >
      <div className="relative max-h-[calc(100vh-195px)] w-[496px] overflow-hidden sm:w-[calc(100vw-20px)]">
        <div className="flex w-full items-center justify-center border-b border-borderColor p-6">
          <span className="font-D24px-M18px text-center">
            Choose your amount
          </span>
        </div>
        <form
          className="mx-auto max-w-[448px] py-6 sm:max-w-[100%]"
          action={handleRequestCashout}
        >
          <MyInput
            label="Insert amount"
            type="number"
            min={paymentMethod?.key === "store_credit" ? "0" : "500"}
            max={`${Math.floor(totalAmount)}`}
            required={false}
            name="amount"
            value={amount}
            onChange={(e) => inputAmount(e.target.value)}
            containerClassName="w-full"
            isError={!!cashErrors}
            errorMessage={cashErrors?.[0] || ""}
          />
          <div className="pt-6">
            {error && (
              <div className="font-D16px-M13px mb-[32px] flex w-full items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px] sm:leading-[16px]">
                {error}
              </div>
            )}
            <div className="justify-center-items-center flex w-full">
              <SubmitButton
                highlighted={true}
                customClass={classNames(
                  `w-full font-D16px-M15px max-w-[448px] !mx-auto`,
                  disabled && "!bg-lightgray !text-gray2 !border-none"
                )}
                showSpiner
                disabled={disabled}
                reverseColors
                text="CASH OUT"
              />
            </div>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default CashOutModal;
