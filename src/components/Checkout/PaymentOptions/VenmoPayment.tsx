import { FC } from "react";
import { PaymentMethods } from "@/types/payment";
import PaymentOption from "./PaymentOption";
import DiscountBanner from "./DiscountBanner";

type VenmoPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const VenmoPayment: FC<VenmoPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="venmo"
      title="Venmo"
      image="/images/venmo.png"
      customBanner={<DiscountBanner percentage={3} />}
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

export default VenmoPayment;
