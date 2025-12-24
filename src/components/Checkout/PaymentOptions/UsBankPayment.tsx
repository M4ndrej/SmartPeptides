import Input from "@/components/Input/Input";
import { PaymentMethods } from "@/types/payment";
import Image from "next/image";
import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";

type UsBankPaymentProps = {
  isOpened: boolean;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
};

const UsBankPayment: FC<UsBankPaymentProps> = ({
  isOpened,
  updatePaymentMethod,
}) => {
  const [selectedBankAccountMethod, setSelectedBankAccountMethod] =
    useState<string>("echeck");

  return (
    <div className="py-[16px]">
      <div
        className="mx-[8px] mb-[1px] flex cursor-pointer items-center gap-[8px]"
        onClick={() => updatePaymentMethod?.("bacs")}
      >
        <input
          type="radio"
          value="bacs"
          checked={isOpened}
          name="paymentOption"
          className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-[#E6E6E6] px-[16px] py-[12px] outline-0"
        />
        <span className="font-D16px-M14px">Pay with US Bank Accout</span>
      </div>
      <AnimateHeight height={isOpened ? "auto" : 0} duration={300}>
        <div className="font-D16px-M14px flex flex-col">
          <p className="mb-[16px]">
            With payment pre-validation and optimized processes, payment
            processing time takes 1 days. You will receive an automated email
            confirmation and your order will be shipped.
          </p>
          <div className="pl-[16px]">
            {/* eCheck */}
            <div className="mb-[16px] border-b-[1px] border-gray">
              <div
                className=" mb-[16px] flex cursor-pointer items-center gap-[8px]"
                onClick={() => setSelectedBankAccountMethod("echeck")}
              >
                <input
                  type="radio"
                  value="echeck"
                  checked={isOpened}
                  name="paymentOption"
                  className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-[#E6E6E6] px-[16px] py-[12px] outline-0"
                />
                <span>Pay By eCheck</span>
              </div>
              <AnimateHeight height={isOpened ? "auto" : 0}>
                <div className="flex gap-[16px] pb-[16px] sm:flex-col">
                  {/*Routing number */}
                  <Input
                    label="Routing number"
                    required={true}
                    name="routeNum"
                    value=""
                    onChange={() => {}}
                    customClass="w-[100%] h-[44px] "
                    parentCustomClass="font-D16px-M14px"
                  />
                  {/*Account number*/}
                  <Input
                    label="Account number"
                    required={true}
                    name="accNum"
                    value=""
                    onChange={() => {}}
                    customClass="w-[100%] h-[44px]"
                    parentCustomClass="font-D16px-M14px"
                  />
                </div>
              </AnimateHeight>
            </div>
            {/* us banck accout inside accoridon */}
            <div>
              <div
                className=" mb-[16px] flex cursor-pointer items-center gap-[8px]"
                onClick={() => setSelectedBankAccountMethod("usbankacc")}
              >
                <input
                  type="radio"
                  value="usbankacc"
                  checked={selectedBankAccountMethod === "usbankacc"}
                  name="paymentOption2"
                  className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-[#E6E6E6] px-[16px] py-[12px] outline-0"
                />
                <span>Pay with US Bank account</span>
              </div>
              <AnimateHeight
                height={selectedBankAccountMethod === "usbankacc" ? "auto" : 0}
              >
                <div className="font-D16px-M14px flex flex-col items-center justify-center gap-[16px] bg-lightgray p-[16px] text-center">
                  <Image
                    src="/images/bankIcon.svg"
                    width={40}
                    height={40}
                    alt="bank"
                  />

                  <p>
                    Click “Pay now” and you will be redirected to your bank to
                    complete your purchase securely.
                  </p>
                </div>
              </AnimateHeight>
            </div>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default UsBankPayment;
