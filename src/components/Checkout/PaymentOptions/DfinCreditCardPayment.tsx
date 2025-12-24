import { FC } from "react";
import CreditCardIcons from "./CreditCardIcons";
import PaymentOption from "./PaymentOption";
import { PaymentMethods } from "@/types/payment";

type DfinCreditCardPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const DfinCreditCardPayment: FC<DfinCreditCardPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="dfinsell"
      title="Credit Card"
      image="/images/bxs_credit-card.svg"
      customBanner={<CreditCardIcons />}
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <span className="mb-2 font-bold text-red">
        TRANSACTIONS WILL BE POSTED AS IS RESEARCH INC
      </span>
      <span>
        After placing an order you will be instructed on how to complete the
        payment.
      </span>
    </PaymentOption>
  );
};

export default DfinCreditCardPayment;
