import { FC } from "react";
import CreditCardIcons from "./CreditCardIcons";
import PaymentOption from "./PaymentOption";
import { PaymentMethods } from "@/types/payment";

type MaxRedCreditCardPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  description?: string;
  isUpdating?: boolean;
};

const MaxRedCreditCardPayment: FC<MaxRedCreditCardPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  description,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="egift-certificate"
      title="Card (Max Redemption)"
      image="/images/bxs_credit-card.svg"
      customBanner={
        <CreditCardIcons
          includedProcessors={["mastercard", "visa", "discover"]}
        />
      }
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            description ||
            "After placing an order you will be instructed on how to complete the payment.",
        }}
      />
    </PaymentOption>
  );
};

export default MaxRedCreditCardPayment;
