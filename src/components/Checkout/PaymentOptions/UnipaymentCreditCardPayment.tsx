import { FC } from "react";
import CreditCardIcons from "./CreditCardIcons";
import PaymentOption from "./PaymentOption";
import { PaymentMethods } from "@/types/payment";

type UnipaymentCreditCardPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const UnipaymentCreditCardPayment: FC<UnipaymentCreditCardPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="unipayment"
      title="Card (UniPayment)"
      image="/images/bxs_credit-card.svg"
      customBanner={<CreditCardIcons />}
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <span className="mb-2 font-bold text-red">ONLY DEBIT CARDS</span>
      <span>
        After placing an order you will be instructed on how to complete the
        payment.
      </span>
    </PaymentOption>
  );
};

export default UnipaymentCreditCardPayment;
