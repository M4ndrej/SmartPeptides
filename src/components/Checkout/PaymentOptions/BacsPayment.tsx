import { PaymentMethods } from "@/types/payment";
import { FC } from "react";
import PaymentOption from "./PaymentOption";
import DiscountBanner from "./DiscountBanner";
import { BacsInfo } from "@/components/BacsInfo/BacsInfo";

type BacsPaymentProps = {
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (method: PaymentMethods) => void;
  isUpdating?: boolean;
};

const BacsPayment: FC<BacsPaymentProps> = ({
  selectedPaymentMethod,
  updatePaymentMethod,
  isUpdating,
}) => {
  return (
    <PaymentOption
      paymentMethod="bacs"
      title="Bank transfer"
      image="/images/bacsIcon.svg"
      customBanner={
        <DiscountBanner
          percentage={5}
          isRecommended={true}
          image={"/images/bacsRecommend.svg"}
        />
      }
      updatePaymentMethod={updatePaymentMethod}
      selectedPaymentMethod={selectedPaymentMethod}
      isUpdating={isUpdating}
    >
      <BacsInfo />
    </PaymentOption>
  );
};

export default BacsPayment;
