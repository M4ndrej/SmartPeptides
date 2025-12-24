import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import { formatDate } from "@/helpers/date_format";
import { parseMethodTitle } from "@/helpers/parseMethodTitle";
import { Order } from "@/types/orders";

interface CheckoutRecoveryOrderInfo {
  order: Order;
}

const CheckoutRecoveryOrderInfo: FC<CheckoutRecoveryOrderInfo> = ({
  order,
}) => {
  const subtotal = order.subtotal
    ? +order.subtotal
    : order.line_items.reduce((acc, item) => acc + +item.total, 0);

  const methodTitle = order?.shipping_lines?.[0]?.method_title || "";
  const { shippingMethod, freeShippingNote } = parseMethodTitle(methodTitle);

  return (
    <div className="font-D16px-M13px w-full overflow-hidden rounded-[5px] bg-lightgray p-6">
      {/* Top Info */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="font-bold">ORDER DATE:</p>
          <p>{formatDate(order.date_created)}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">SHIP TO:</p>
          <p>{`${order.shipping.first_name} ${order.shipping.last_name}`}</p>
          <p>{`${order.shipping.address_1} ${order.shipping?.address_2 ?? ""}`}</p>
          <p>{`${order.shipping.postcode} ${order.shipping.city}, ${order.shipping.state}`}</p>
          <p>{`${order.shipping.country}`}</p>
        </div>
      </div>
      {/* Separator */}
      <div className="my-4 h-[1px] w-full bg-borderColor" />
      {/* Bottom Info */}
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <span>Subtotal</span>
          <span className="text-[#E7461E]">
            {formatCurrency(subtotal, true, false)}
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <span>Shipping</span>
          <div className="flex gap-[2px] sm:flex-col sm:text-right">
            <span>{shippingMethod}</span>
            <span>{freeShippingNote && freeShippingNote}</span>
          </div>
        </div>
        {/*  {!!order.fee_lines.length &&
          order.fee_lines.map((fee) => (
            <div
              key={fee.id}
              className="flex w-full items-center justify-between gap-2"
            >
              <span>{fee.name}</span>
              <span>{formatCurrency(+fee.total, true, false)}</span>
            </div>
          ))} */}
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-bold text-[#E7461E]">TOTAL</span>
          <span className="font-bold text-[#E7461E]">
            {formatCurrency(+order.total, true, false)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutRecoveryOrderInfo;
