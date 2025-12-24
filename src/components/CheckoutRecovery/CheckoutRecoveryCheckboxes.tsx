import Link from "next/link";
import Checkbox from "../Checkbox/Checkbox";
import { FC } from "react";
import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";

interface CheckoutRecoveryCheckboxesProps {
  fieldsError?: PlaceOrderErrorProps;
  acceptedTerms: boolean;
  handleUpdateTerms: () => void;
  isPrivacyAccepted: boolean;
  handleUpdatePrivacy: () => void;
}

const CheckoutRecoveryCheckboxes: FC<CheckoutRecoveryCheckboxesProps> = ({
  fieldsError,
  acceptedTerms,
  handleUpdateTerms,
  isPrivacyAccepted,
  handleUpdatePrivacy,
}) => {
  return (
    <div>
      <span className="font-D16px-M13px">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our privacy policy.
      </span>
      <div className="my-[16px] flex items-center justify-between border-t border-borderColor"></div>
      <div className="mb-[32px]">
        <div className="flex items-start gap-[8px] ">
          <div className="mt-[3px] min-w-[16px] max-w-[16px]">
            <Checkbox
              name="terms"
              checked={acceptedTerms}
              onChange={() => handleUpdateTerms()}
              errorInput={!!fieldsError?.terms}
              customErrorText={fieldsError?.terms ? fieldsError?.terms[0] : ""}
            />
          </div>
          <span
            className="font-D16px-M13px cursor-pointer"
            onClick={() => handleUpdateTerms()}
          >
            I have read and agree to the website&nbsp;
            <Link href="/terms">
              <span className="cursor-pointer underline transition duration-300 hover:text-[#E7461E]">
                terms and conditions
              </span>
            </Link>
            <span className="text-red">&nbsp;*</span>
          </span>
        </div>
        {!!fieldsError?.terms && (
          <div className="font-12px-ALL my-[4px] text-red">
            {fieldsError?.terms
              ? fieldsError?.terms
              : "Field is required/invalid"}
          </div>
        )}
        <div className="mt-5 flex items-start gap-[8px] border-t border-borderColor pt-5">
          <div className="mt-[3px] min-w-[16px] max-w-[16px]">
            <Checkbox
              name="privacy"
              checked={isPrivacyAccepted}
              onChange={() => handleUpdatePrivacy()}
              errorInput={!!fieldsError?.privacy}
              customErrorText={
                fieldsError?.privacy ? fieldsError?.privacy[0] : ""
              }
            />
          </div>
          <span
            className="font-D16px-M13px cursor-pointer"
            onClick={() => handleUpdatePrivacy()}
          >
            I agree that the products purchased on this website will not be used
            for human or animal consumption and/or ingestion of any kind. I am a
            licensed and/or qualified professional. I am at least 21 years of
            age.&nbsp;
            <span className="text-red">&nbsp;*</span>
          </span>
        </div>
        {!!fieldsError?.privacy && (
          <div className="font-12px-ALL my-[4px] text-red">
            {fieldsError?.privacy
              ? fieldsError?.privacy
              : "Field is required/invalid"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutRecoveryCheckboxes;
