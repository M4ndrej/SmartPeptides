import { FC } from "react";
import { PaymentMethods } from "@/types/payment";
import PaymentOption from "./PaymentOption";

type StripePaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const StripePayment: FC<StripePaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="pepten_card"
      title="Credit Card"
      image="/images/bxs_credit-card.svg"
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <span>
        Pay securely with your credit card. You will be redirected to complete
        the payment.
      </span>
    </PaymentOption>
  );
};

export default StripePayment;
