import { Order } from "@/types/orders";
import { FC } from "react";

interface CheckoutRecoveryHiddenFieldsProps {
  order: Order;
}

const CheckoutRecoveryHiddenFields: FC<CheckoutRecoveryHiddenFieldsProps> = ({
  order,
}) => {
  return (
    <>
      <input
        type="hidden"
        name="shipping_first_naem"
        value={order.shipping.first_name}
      />
      <input
        type="hidden"
        name="shipping_last_name"
        value={order.shipping.last_name}
      />
      <input
        type="hidden"
        name="shipping_address_1"
        value={order.shipping.address_1}
      />
      <input
        type="hidden"
        name="shipping_address_2"
        value={order.shipping?.address_2 ?? undefined}
      />
      <input type="hidden" name="shipping_city" value={order.shipping?.city} />
      <input
        type="hidden"
        name="shipping_country"
        value={order.shipping?.country}
      />
      <input
        type="hidden"
        name="shipping_phone"
        value={order.shipping?.phone}
      />
      <input
        type="hidden"
        name="shipping_postcode"
        value={order.shipping?.postcode}
      />
      <input
        type="hidden"
        name="shipping_state"
        value={order.shipping?.state}
      />
      <input type="hidden" name="shipping_email" value={order.billing?.email} />
      <input type="hidden" name="customer_note" value={order.customer_note} />
    </>
  );
};

export default CheckoutRecoveryHiddenFields;
