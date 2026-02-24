import { PaymentMethods } from "@/types/payment";
import { AvailablePayments } from "@/types/payments";
import { FC } from "react";
import StripePayment from "../../PaymentOptions/StripePayment";

interface NonCreditCardPaymentsPropMethods {
  selectedPaymentMethod: PaymentMethods | null;
  handleUpdatePaymentMethod?: (method: PaymentMethods) => Promise<void>;
  checkPaymentMethod: (method: PaymentMethods) => boolean;
  paymentMethodUpdating: string;
  availablePayments?: AvailablePayments;
}

const NonCreditCardPaymentMethods: FC<NonCreditCardPaymentsPropMethods> = ({
  selectedPaymentMethod,
  handleUpdatePaymentMethod,
  checkPaymentMethod,
  paymentMethodUpdating,
}) => {
  return (
    <>
      {/* STRIPE / CREDIT CARD */}
      {checkPaymentMethod("petide_card") && (
        <StripePayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "petide_card"}
        />
      )}
      {/* VENMO */}
      {/* {checkPaymentMethod("venmo") && (
        <VenmoPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "venmo"}
        />
      )} */}
      {/* BACS */}
      {/* {checkPaymentMethod("bacs") && (
        <BacsPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "bacs"}
        />
      )} */}
      {/* CASH APP */}
      {/* {checkPaymentMethod("cashapp") && (
        <CashAppPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "cashapp"}
        />
      )} */}
      {/* ZELLE */}
      {/* {checkPaymentMethod("zelle") && (
        <ZellePayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "zelle"}
        />
      )} */}
      {/* CRYPTO */}
      {/* {checkPaymentMethod("nowpayments_gateway") && (
        <CryptoPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "nowpayments_gateway"}
        />
      )} */}
      {/* PAYPAL */}
      {/* {checkPaymentMethod("peptide-paypal") && (
        <PayPalPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "peptide-paypal"}
        />
      )} */}
      {/* REVOLUT */}
      {/* {checkPaymentMethod("peptide-revolut") && (
        <RevolutPayment
          updatePaymentMethod={handleUpdatePaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          isUpdating={paymentMethodUpdating === "peptide-revolut"}
        />
      )} */}
    </>
  );
};

export default NonCreditCardPaymentMethods;
