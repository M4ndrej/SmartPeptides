"use client";

import { ChangeEvent, FC, ReactNode, useState } from "react";
import {
  CreditCardDetails,
  CreditCardProcessor,
  PaymentMethods,
} from "@/types/payment";
import PaymentOption from "./PaymentOption";
import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";
import Image from "next/image";
import Input from "@/components/Input/Input";
import InputCardType from "@/components/Input/InputCardType/InputCardType";
import CreditCardIcons from "./CreditCardIcons";

type CreditCardPaymentProps = {
  fieldsError?: PlaceOrderErrorProps;
  description?: ReactNode;
  title?: string;
  paymentMethod: PaymentMethods;
  selectedPaymentMethod?: PaymentMethods | null;
  includedProcessors?: CreditCardProcessor[];
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const CreditCardPayment: FC<CreditCardPaymentProps> = ({
  fieldsError,
  description,
  title,
  paymentMethod,
  selectedPaymentMethod,
  includedProcessors,
  updatePaymentMethod,
  isUpdating,
}) => {
  const [cardDetails, setCardDetails] = useState<CreditCardDetails>({
    "credit-card-cvc": "",
    "credit-card-expiry": "",
    "credit-card-expiry-value": "",
    "credit-card-number": "",
    "credit-card-type": "",
  });

  const handleChangeCardDetails = (e: ChangeEvent<HTMLInputElement>) => {
    let fieldValue = e.target.value;
    let fieldName = e.target.name as keyof CreditCardDetails;

    if (fieldName === "credit-card-expiry") {
      fieldValue = fieldValue.replace(/\D/g, "");

      if (fieldValue.length > 2) {
        fieldValue = `${fieldValue.slice(0, 2)}/${fieldValue.slice(2)}`;
      }

      const numericValue = parseInt(fieldValue.replace(/\D/g, ""), 10);

      setCardDetails({
        ...cardDetails,
        "credit-card-expiry-value": numericValue.toString(),
        [fieldName]: fieldValue,
      });
    } else {
      setCardDetails({
        ...cardDetails,
        [fieldName]: fieldValue,
      });
    }
  };

  return (
    <PaymentOption
      paymentMethod={paymentMethod}
      title={title || "Credit Card"}
      image="/images/bxs_credit-card.svg"
      customBanner={<CreditCardIcons includedProcessors={includedProcessors} />}
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <div className="font-D16px-M14px mb-[16px]">
        {description || (
          <span>We accept both US and International payments</span>
        )}
      </div>
      {/* input fields for credit card */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex w-full flex-row gap-4 sm:flex-col">
          <div className="flex w-full flex-col gap-1">
            <Input
              label="Card number"
              required={true}
              name="credit-card-number"
              value={cardDetails["credit-card-number"]}
              onChange={handleChangeCardDetails}
              maxlength={16}
              customClass="w-full h-[44px]"
              parentCustomClass="font-D16px-M14px grow"
              errorInput={!!fieldsError?.["credit-card-number"]}
              customErrorText={
                fieldsError?.["credit-card-number"]
                  ? fieldsError?.["credit-card-number"][0]
                  : ""
              }
            />
          </div>
          {paymentMethod === "flexipay" && (
            <InputCardType
              cardType={cardDetails["credit-card-type"] ?? ""}
              name="credit-card-type"
              errorInput={!!fieldsError?.["credit-card-type"]}
              customErrorText={
                fieldsError?.["credit-card-type"]
                  ? fieldsError?.["credit-card-type"][0]
                  : ""
              }
              handleSelectType={(type) =>
                setCardDetails({
                  ...cardDetails,
                  "credit-card-type": type,
                })
              }
              containerClassName="w-[144px] sm:w-full"
            />
          )}
        </div>
        <div className="flex items-center gap-[16px] sm:flex-col sm:items-start md:flex-col md:items-start lg:flex-row">
          <div className="flex flex-row gap-[16px]">
            {/* Expiry date */}
            <div className="flex w-full min-w-[153px] flex-col gap-1">
              <Input
                label="Expiry MM/YY"
                required={true}
                name="credit-card-expiry"
                value={cardDetails["credit-card-expiry"]}
                type="text"
                onChange={handleChangeCardDetails}
                customClass="w-[100%] h-[44px] "
                parentCustomClass="font-D16px-M14px max-w-[153px] sm:max-w-[100%] w-[100%]"
                maxlength={5}
                errorInput={!!fieldsError?.["credit-card-expiry"]}
                customErrorText={
                  fieldsError?.["credit-card-expiry"]
                    ? fieldsError?.["credit-card-expiry"][0]
                    : ""
                }
              />
            </div>
            {/* CVC code */}
            <div className="flex w-full flex-col gap-1">
              <Input
                label="CVC"
                required={true}
                name="credit-card-cvc"
                value={cardDetails["credit-card-cvc"]}
                onChange={handleChangeCardDetails}
                customClass="w-[100%] h-[44px]"
                parentCustomClass="font-D16px-M14px max-w-[77px] sm:max-w-[40%] w-[100%]"
                errorInput={!!fieldsError?.["credit-card-cvc"]}
                customErrorText={
                  fieldsError?.["credit-card-cvc"]
                    ? fieldsError?.["credit-card-cvc"][0]
                    : ""
                }
              />
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/cvcIcon.svg"
              width={50}
              height={40}
              alt="American Express"
              className="h-[36px] w-[74px] select-none sm:h-[30px] sm:w-[60px]"
            />
            <p className="font-12px-ALL max-w-[183px] text-red">
              On your card you can find your CVC/CVV code here
            </p>
          </div>
        </div>
      </div>
    </PaymentOption>
  );
};

export default CreditCardPayment;
