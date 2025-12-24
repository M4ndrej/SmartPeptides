import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import { Order } from "@/types/orders";
import AuthorizedImage from "../Image/Image";

type TrackingOrderProps = {
  order: Order;
};

const TrackingOrder: FC<TrackingOrderProps> = ({ order }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-18px-ALL font-medium">PRODUCT</div>
        <div className="font-18px-ALL font-medium">TOTAL</div>
      </div>

      <div className="my-[16px] h-[1px] w-full bg-borderColor" />

      <div>
        <div className="opacity-1 flex h-[auto] flex-col gap-y-[16px] pb-[24px] sm:pb-[16px] md:pb-[16px]">
          {order.line_items.map((item: any, a: any) => (
            <div key={a}>
              <div className="mb-[16px]">
                <div className="flex items-center">
                  <div className="mr-[16px] flex h-[60px] items-center justify-center bg-lightgray sm:h-[79px] sm:w-[66px]">
                    <AuthorizedImage
                      src={item.image.src}
                      width={50}
                      height={60}
                      alt="Item"
                      className="select-none sm:w-[66px]"
                    />
                  </div>
                  <div className="flex flex-1 justify-between sm:flex-col sm:text-[14px]">
                    <div className="sm:mb-[4px]">
                      <div className="font-D16px-M14px mb-[4px]">
                        {item.name}{" "}
                        <span className="font-bold">x {item.quantity}</span>
                      </div>
                      {item.meta_data?.length ? (
                        <div className="font-16px-ALL">
                          <span className="font-bold">{`${item.meta_data?.[0]?.display_key}:`}</span>{" "}
                          {item.meta_data?.[0]?.display_value}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <div className="font-D16px-M14px font-bold">
                        {formatCurrency(item.price, true)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="font-D16px-M14px opacity-1 flex h-[auto]  flex-col gap-y-[16px]">
          <div className="flex items-center justify-between">
            <div className="font-bold">Subtotal:</div>
            <div className="font-bold">${order.total}</div>
          </div>
          <div className="flex items-center justify-between sm:items-start">
            <div className="font-bold">Shipping:</div>
            {order.shipping_lines?.[0] && (
              <div className="font-bold sm:w-[50%] sm:text-right">
                {formatCurrency(+order.shipping_lines?.[0].total, true)} via{" "}
                {order.shipping_lines[0].method_title}
              </div>
            )}
          </div>
          {/* {order?.fee_lines?.map((feeLine, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="font-bold">{feeLine.name}:</div>
              <div className="font-bold">
                {formatCurrency(+feeLine.total, true)}
              </div>
            </div>
          ))} */}
          {order.payment_method_title && (
            <div className="flex items-center justify-between">
              <div className="font-bold">Payment Method:</div>
              <div>{order.payment_method_title}</div>
            </div>
          )}

          <div className="font-16px-ALL flex items-center justify-between ">
            <div className="font-bold">TOTAL:</div>
            <div className="font-bold text-[#E7461E]">
              {formatCurrency(
                +order.total - +order.discount_total,
                true,
                false
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-[16px] h-[1px] w-full bg-borderColor" />
    </div>
  );
};

export default TrackingOrder;
