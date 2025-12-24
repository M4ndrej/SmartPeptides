import { formatCurrency } from "@/helpers/curency_format";
import CashOutButton from "./CashOutButton";
import { useMemo } from "react";
import { useAffiliateContext } from "../AffiliateContext";
import { affiliatePaymentMethods } from "@/data/affiliate";
import { AffiliatePaymentMethod } from "@/types/affiliates";
import Link from "next/link";
import { determinePaymentMethod } from "@/helpers/affiliate_helpers";

const PayoutsCashOut = () => {
  const { affiliateInfo } = useAffiliateContext();
  const totalAmount = affiliateInfo?.affiliate?.standing ?? 0;

  const chosenPaymentMethod: AffiliatePaymentMethod = useMemo(() => {
    const key = determinePaymentMethod(affiliateInfo?.affiliate);
    return affiliatePaymentMethods.find((m) => m.key === key)!;
  }, [affiliateInfo]);

  const isAvailable = useMemo(
    () =>
      chosenPaymentMethod.key === "store_credit"
        ? totalAmount > 0
        : totalAmount >= 500,
    [totalAmount, chosenPaymentMethod]
  );

  return (
    <div className="mb-2">
      <div className="font-D16px-M16px flex justify-between border-b border-borderColor pb-2 font-bold">
        <span>Cash out</span>
      </div>
      <div className="font-D16px-M13px mb-2 flex flex-col gap-[16px] rounded-b-[5px] py-4 pb-2">
        <p>Balance</p>
        <p className="font-D32px-M24px font-bold text-[#E7461E]">
          {formatCurrency(totalAmount, true, false)}
        </p>
        <p>
          {isAvailable
            ? "Great! You have reached the minimum limit for your cash out. Please select your payment by clicking on the button below."
            : `To access your cash out, you need ${chosenPaymentMethod.key === "store_credit" ? "a positive balance" : "at least $500 USD"} on your account.`}
        </p>
        <div className="flex items-center justify-start gap-4">
          <CashOutButton
            isAvailable={isAvailable}
            paymentMethod={chosenPaymentMethod}
          />
          <Link
            href="/profile/affiliate/edit"
            className="font-semibold text-[#E7461E] transition-colors duration-200 hover:text-[#E7461E]"
          >
            CHANGE PAYMENT
          </Link>
        </div>
        <p>NOTE: Your chosen payment type is {chosenPaymentMethod?.title}</p>
      </div>
      <div className="h-1 w-full border-t border-borderColor pb-2" />
    </div>
  );
};

export default PayoutsCashOut;
