"use client";

import { formatCurrency } from "@/helpers/curency_format";
import { fetcher } from "@/helpers/fetchers";
import { Order } from "@/types/orders";
import { AvailablePayments } from "@/types/payments";
import Image from "next/image";
import Link from "next/link";
import { FC, useMemo } from "react";
import useSWR from "swr";

type ZelleOrderPreviewProps = {
  orderDetails: Order | undefined;
};

const ZelleOrderPreview: FC<ZelleOrderPreviewProps> = ({ orderDetails }) => {
  const { data: availablePayments } = useSWR<AvailablePayments>(
    `/api/payment_methods`,
    fetcher
  );

  const zelleEmail = useMemo(() => {
    if (availablePayments) return availablePayments.zelle.email;
  }, [availablePayments]);

  return (
    <div className="font-D16px-M13px flex flex-col gap-4 rounded-[5px] border-2 border-dashed border-[#E7461E] bg-lightgray p-4 md:p-6 lg:p-6">
      <div className="font-D24px-M18px font-bold">To complete your order</div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4">
          <Image
            src="/images/zelle.svg"
            width={52}
            height={52}
            alt="zelle"
            className="select-none"
          />

          {orderDetails && (
            <div className="grid gap-4">
              <div>
                Send{" "}
                <strong className="text-[#6D1ED4]">
                  {formatCurrency(+orderDetails.total, true, false)} via{" "}
                  <Link
                    className="transition duration-300 hover:text-[#E7461E]"
                    href={"https://www.zellepay.com/"}
                  >
                    Zelle
                  </Link>{" "}
                </strong>{" "}
                or from your bank.
              </div>
              <div>
                Please send the payment to our email address or simply scan the
                code from the app.
              </div>
              <div className="text-[20px] font-bold">
                Zelle Name: <span>IS RESEARCH</span>
              </div>
              <div className="text-[20px] font-bold">
                Zelle Email: <span>payments@valupeptide.com</span>
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

        {/*  <Link
          target="_blank"
          href={"https://www.zellepay.com/"}
          className="inline-block w-fit"
        >
          {" "}
          <Image
            src="/images/zelleQRcode.png"
            width={147}
            height={150}
            alt="zelle"
            className="select-none"
          />
        </Link> */}
      </div>
    </div>
  );
};

export default ZelleOrderPreview;
