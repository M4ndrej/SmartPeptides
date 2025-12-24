import { FC } from "react";
import { PaymentMethods } from "@/types/payment";
import PaymentOption from "./PaymentOption";
import DiscountBanner from "./DiscountBanner";

type CryptoPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const CryptoPayment: FC<CryptoPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="nowpayments_gateway"
      title="Cryptocurrency"
      image={"/images/cryptoIcon.png"}
      // customBanner={
      //   <DiscountBanner
      //     percentage={5}
      //     isRecommended={true}
      //     image={"/images/cryptoRecommend.svg"}
      //   />
      // }
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

export default CryptoPayment;
