import React, { ChangeEvent } from "react";
import Input from "@/components/Input/Input";

interface OrderInputFieldsProps {
  orderInput: { email: string; orderId: string };
  fieldErrors: Record<string, string | null>;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const OrderInputFields: React.FC<OrderInputFieldsProps> = ({
  orderInput,
  fieldErrors,
  handleInput,
}) => {
  return (
    <>
      <Input
        name="email"
        label="Email address"
        value={orderInput.email}
        required={true}
        errorInput={!!fieldErrors.email}
        customErrorText={fieldErrors.email || undefined}
        customLabelClass="!pt-[15px] text-sm"
        customClass="h-[41px] border border-borderColor rounded-[5px] focus:outline-none focus:bg-transparent"
        onChange={handleInput}
      />
      <Input
        name="orderId"
        label="Order ID"
        value={orderInput.orderId}
        required={true}
        errorInput={!!fieldErrors.orderId}
        customErrorText={fieldErrors.orderId || undefined}
        customLabelClass="!pt-[30px] text-sm"
        customClass="mt-4 h-[41px] border border-borderColor rounded-[5px] focus:outline-none focus:bg-transparent"
        onChange={handleInput}
      />
    </>
  );
};

export default OrderInputFields;
