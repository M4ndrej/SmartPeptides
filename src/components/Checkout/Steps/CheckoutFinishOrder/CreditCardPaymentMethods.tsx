import { PlaceOrderErrorProps } from "@/app/actions/checkout/place-order/actions";
import { PaymentMethods } from "@/types/payment";
import { AvailablePayments } from "@/types/payments";
import { FC } from "react";
import CreditCardPayment from "../../PaymentOptions/CreditCardPayment";
import DfinCreditCardPayment from "../../PaymentOptions/DfinCreditCardPayment";
import FiatCreditCardPayment from "../../PaymentOptions/FiatCreditCardPayment";
import MaxRedCreditCardPayment from "../../PaymentOptions/MaxRedCreditCardPayment";
import OaktreeCreditCardPayment from "../../PaymentOptions/OaktreeCreditCardPayment";
import UnipaymentCreditCardPayment from "../../PaymentOptions/UnipaymentCreditCardPayment";
import VidaMagicaCreditCardPayment from "../../PaymentOptions/VidaMagicaCreditCardPayment";

interface CreditCardPaymentMethodsProps {
  selectedPaymentMethod: PaymentMethods | null;
  handleUpdatePaymentMethod?: (method: PaymentMethods) => Promise<void>;
  checkPaymentMethod: (method: PaymentMethods) => boolean;
  paymentMethodUpdating: string;
  fieldsError?: PlaceOrderErrorProps;
  availablePayments?: AvailablePayments;
}

const CreditCardPaymentMethods: FC<CreditCardPaymentMethodsProps> = ({
  selectedPaymentMethod,
  handleUpdatePaymentMethod,
  checkPaymentMethod,
  paymentMethodUpdating,
  fieldsError,
  availablePayments,
}) => {
  return (
    <>
      {/* CREDIT CARD FLEXI */}
      {/* {checkPaymentMethod("flexipay") && (
        <CreditCardPayment
          paymentMethod="flexipay"
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          fieldsError={fieldsError}
          includedProcessors={["mastercard", "visa"]}
          description={availablePayments?.["flexipay"]?.description || ""}
          title="Card (FlexiPay)"
          isUpdating={paymentMethodUpdating === "flexipay"}
        />
      )} */}
      {/* CREDIT CARD VIDA MAGICA */}
      {checkPaymentMethod("vidamagica") && (
        <VidaMagicaCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          isUpdating={paymentMethodUpdating === "vidamagica"}
        />
      )}
      {/* CREDIT CARD DFIN */}
      {checkPaymentMethod("dfinsell") && (
        <DfinCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          isUpdating={paymentMethodUpdating === "dfinsell"}
        />
      )}
      {/* CREDIT CARD CANADA ABAKA */}
      {checkPaymentMethod("gwpaymentplugin") && (
        <CreditCardPayment
          paymentMethod="gwpaymentplugin"
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          fieldsError={fieldsError}
          description={
            <>
              <span className="mb-1 block font-bold text-red">
                TRANSACTION LIMIT IS $1000 US.
              </span>
              <span>
                {availablePayments?.["gwpaymentplugin"]?.description ||
                  "We accept both US and International payments"}
              </span>
            </>
          }
          title="Credit Card"
          isUpdating={paymentMethodUpdating === "gwpaymentplugin"}
        />
      )}
      {/* CREDIT CARD FIAT */}
      {checkPaymentMethod("fiatsystems") && (
        <FiatCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          isUpdating={paymentMethodUpdating === "fiatsystems"}
        />
      )}
      {/* CREDIT CARD OAKTREE */}
      {checkPaymentMethod("placetopay") && (
        <OaktreeCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          isUpdating={paymentMethodUpdating === "placetopay"}
        />
      )}
      {/* CREDIT CARD UNIPAYMENT */}
      {checkPaymentMethod("unipayment") && (
        <UnipaymentCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          isUpdating={paymentMethodUpdating === "unipayment"}
        />
      )}
      {/* CREDIT CARD PAYMEN TECH */}
      {/* {checkPaymentMethod("paymentechnologies") && (
        <CreditCardPayment
          paymentMethod="paymentechnologies"
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          fieldsError={fieldsError}
          includedProcessors={["mastercard", "visa"]}
          description={
            availablePayments?.["paymentechnologies"]?.description || ""
          }
          title="Card (Paymen)"
          isUpdating={paymentMethodUpdating === "paymentechnologies"}
        />
      )} */}
      {/* CREDIT CARD MAX RED */}
      {checkPaymentMethod("egift-certificate") && (
        <MaxRedCreditCardPayment
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          description={
            availablePayments?.["egift-certificate"]?.description || ""
          }
          isUpdating={paymentMethodUpdating === "egift-certificate"}
        />
      )}
      {/* CREDIT CARD AUTHNET */}
      {/* {activePaymentOption === "authnet" && (
        <CreditCardPayment
          paymentMethod="authnet"
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          fieldsError={fieldsError}
          description={availablePayments?.["authnet"]?.description || ""}
        />
      )} */}
      {/* CREDIT CARD QUANTUMEPAY */}
      {/* {activePaymentOption === "quantumepay" && (
        <CreditCardPayment
          paymentMethod="quantumepay"
          selectedPaymentMethod={selectedPaymentMethod}
          updatePaymentMethod={handleUpdatePaymentMethod}
          fieldsError={fieldsError}
          description={
            availablePayments?.["quantumepay"]?.description || ""
          }
        />
      )} */}
    </>
  );
};

export default CreditCardPaymentMethods;
