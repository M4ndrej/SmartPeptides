import { FC } from "react";
import { Order } from "@/types/orders";
import AuthorizedImage from "../Image/Image";
import { formatCurrency } from "@/helpers/curency_format";

interface CheckoutRecoveryOrderItemsProps {
  order: Order;
}

const CheckoutRecoveryOrderItems: FC<CheckoutRecoveryOrderItemsProps> = ({
  order,
}) => {
  return (
    <div className="font-D16px-M13px w-full overflow-hidden rounded-[5px] bg-lightgray p-6">
      <table className="w-full">
        <thead className="w-full">
          <tr className="border-b-[1px] border-borderColor">
            <th className="p-2 text-center font-bold">ITEMS</th>
            <th className="p-2 text-center font-bold">QTY</th>
            <th className="p-2 text-center font-bold">RATE</th>
            <th className="p-2 text-right font-bold">PRICE</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {order.line_items.map((item) => (
            <tr key={item.id}>
              <td className="p-2 text-center">
                <div className="flex items-center justify-start gap-2">
                  {!!item?.image && (
                    <AuthorizedImage
                      src={item.image.src}
                      alt={item.image.alt}
                      width={75}
                      height={75}
                      className="h-[75px] w-[75px] object-cover"
                    />
                  )}
                  <div className="flex flex-col items-start">
                    <p>{item.name}</p>
                    <p>SKU: {item.sku}</p>
                  </div>
                </div>
              </td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-center">
                {formatCurrency(+item.price, true, false)}
              </td>
              <td className="p-2 text-right">
                {formatCurrency(+item.total, true, false)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutRecoveryOrderItems;
