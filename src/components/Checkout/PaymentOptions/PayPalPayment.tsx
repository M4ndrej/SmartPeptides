import { PaymentMethods } from "@/types/payment";
import { FC } from "react";
import PaymentOption from "./PaymentOption";

type PayPalPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const PayPalPayment: FC<PayPalPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="peptide-paypal"
      title="PayPal"
      image="/images/paypalLogo.png"
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

export default PayPalPayment;
