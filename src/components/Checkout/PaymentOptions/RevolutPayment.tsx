import { PaymentMethods } from "@/types/payment";
import { FC } from "react";
import PaymentOption from "./PaymentOption";

type RevolutPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const RevolutPayment: FC<RevolutPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="peptide-revolut"
      title="Revolut"
      image="/images/revolutLogo.png"
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

export default RevolutPayment;
