"use client";

import { formatCurrency } from "@/helpers/curency_format";
import { Order } from "@/types/orders";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import QRCode from "react-qr-code";

type VenmoNoticeProps = {
  orderDetails: Order | undefined;
};

const VenmoNotice: FC<VenmoNoticeProps> = ({ orderDetails }) => {
  const venmoLink = `https://venmo.com/?txn=pay&audience=public&recipients=@peptideshop&amount=${orderDetails?.total}`;
  return (
    <div className="font-D16px-M13px flex flex-col gap-4 rounded-[5px] border-2 border-dashed border-[#333333] bg-lightgray p-4 md:p-6 lg:p-6">
      <div className="font-D24px-M18px font-bold">Venmo Notice</div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4">
          <div>
            Send{" "}
            <span className="font-bold text-[#333333]">
              {formatCurrency(+orderDetails?.total!, true, false)} to
              @peptideshop
            </span>{" "}
            or click/scan the Venmo button below.
          </div>
          <div>
            Please use your{" "}
            <span className="font-bold">
              Order Number as the payment reference.
            </span>
          </div>
          <div>
            After paying, we will start{" "}
            <span className="font-bold">processing your order.</span>
          </div>
          <div>
            If you are having an issue, call. You can also email{" "}
            <span className="underline">support@smartpeptides.com</span>
          </div>
        </div>
      </div>

      <div className="flex text-center text-darkgray">
        <div>
          <div className="font-D16px-M13px mb-[8px]">Click</div>
          <Link target="_blank" href={venmoLink}>
            <Image
              src="/images/venmo.png"
              width={96}
              height={96}
              alt="Venmo"
              className="cursor-pointer select-none"
            />
          </Link>
        </div>
        <div className="font-D16px-M13px mb-[8px] ml-[16px] mr-[25px]">or</div>
        <div>
          <div className="font-D16px-M13px mb-[8px]">Scan</div>
          <Link target="_blank" href={venmoLink}>
            <QRCode
              width={96}
              height={96}
              value={venmoLink}
              className="h-24 w-24"
            />
          </Link>
        </div>
      </div>

      <div className="font-D16px-M13px">
        <span className="font-bold">Disclaimer:</span> Your order will not be
        processed until funds have cleared in our Venmo account.
      </div>
    </div>
  );
};

export default VenmoNotice;
