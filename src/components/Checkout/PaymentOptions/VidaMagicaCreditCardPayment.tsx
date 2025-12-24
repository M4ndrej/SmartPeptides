import { PaymentMethods } from "@/types/payment";
import { FC } from "react";
import CreditCardIcons from "./CreditCardIcons";
import PaymentOption from "./PaymentOption";

type VidaMagicaCreditCardPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const VidaMagicaCreditCardPayment: FC<VidaMagicaCreditCardPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="vidamagica"
      title="Credit Card"
      image="/images/bxs_credit-card.svg"
      customBanner={<CreditCardIcons />}
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <span>
        After placing an order you will be instructed on how to complete the
        payment.
      </span>
    </PaymentOption>
  );
};

export default VidaMagicaCreditCardPayment;
