"use client";

import { formatCurrency } from "@/helpers/curency_format";
import { Order } from "@/types/orders";
import Image from "next/image";
import { FC } from "react";

type PayPalNoticeProps = {
  orderDetails?: Order;
};

const PayPalNotice: FC<PayPalNoticeProps> = ({ orderDetails }) => {
  return (
    <div className="font-D16px-M13px flex flex-col gap-4 rounded-[5px] border-2 border-dashed border-[#9A9A9F] bg-lightgray p-4 md:p-6 lg:p-6">
      <div className="font-D24px-M18px font-bold">To complete your order</div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4">
          <Image
            src="/images/paypal.svg"
            width={52}
            height={52}
            alt="paypal"
            className="select-none"
          />

          {orderDetails && (
            <div className="grid gap-4">
              <div>
                Send{" "}
                <strong className="text-[#0070E0]">
                  {formatCurrency(+orderDetails.total, true, false)}
                </strong>{" "}
                from your PayPal account.
              </div>
              <div>Please send the payment to our email address.</div>
              <div className="text-[20px] font-bold">
                Name: <span>IS RESEARCH INC</span>
              </div>
              <div className="text-[20px] font-bold">
                Email: <span>support@pshopproducts.com</span>
              </div>

              <div>
                Please use your <span className="font-bold">Order Number</span>{" "}
                as the payment reference.
              </div>

              <div>
                <span className="font-medium">After paying,</span> we will start
                processing your order.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayPalNotice;
