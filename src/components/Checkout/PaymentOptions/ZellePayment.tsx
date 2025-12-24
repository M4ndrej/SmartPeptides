import { FC } from "react";
import { PaymentMethods } from "@/types/payment";
import PaymentOption from "./PaymentOption";
import DiscountBanner from "./DiscountBanner";

type ZellePaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (payment_method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const ZellePayment: FC<ZellePaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="zelle"
      title="Zelle"
      image="/images/zelle.svg"
      // customBanner={
      //   <DiscountBanner
      //     percentage={5}
      //     isRecommended={true}
      //     image={"/images/zelleRecommend.svg"}
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

export default ZellePayment;
