"use client";

import { FC, useMemo } from "react";
import Input from "../Input/Input";
import { Order } from "@/types/orders";

type CryptoCurrencyProps = {
  orderDetails: Order | undefined;
};

const Cryptocurrency: FC<CryptoCurrencyProps> = ({ orderDetails }) => {
  const amount = useMemo(() => {
    return orderDetails?.meta_data?.find((item) => item.key === "_mcc_amount");
  }, [orderDetails]);

  const currencyType = useMemo(() => {
    return orderDetails?.meta_data?.find(
      (item) => item.key === "_mcc_currency_id"
    );
  }, [orderDetails]);

  const currencyTo = useMemo(() => {
    return orderDetails?.meta_data?.find((item) => item.key === "_mcc_to");
  }, [orderDetails]);

  return (
    <div className="font-16px-ALL">
      <div className="font-24px-ALL font-bold">To complete your order</div>
      <div className="my-[16px] flex items-center">
        <div className="w-[60px]">Send</div>
        <Input
          required={false}
          disabled={true}
          customClass={"w-[421px] sm:w-full"}
          parentCustomClass="w-full "
          value={`${amount?.value} ${currencyType?.value}`}
          onChange={() => {}}
        />
      </div>
      <div className="flex items-center">
        <div className="w-[60px]">To</div>
        <Input
          required={false}
          disabled={true}
          value={`${currencyTo?.value}`}
          customClass={"w-[421px] sm:w-full"}
          parentCustomClass="w-full"
          onChange={() => {}}
        />
      </div>

      {/* <div className="mt-[24px] flex items-center">
        <Image
          src="/images/qrCode.svg"
          width={96}
          height={96}
          alt="Cash App"
          className="h-[214px] w-[214px] cursor-pointer"
        />

        <div className="py-[19px] pl-[24px]">
          <div className="max-w-[161px]">
            Awaiting payment
            <span className="font-14px-ALL block">(checked every 15 secs)</span>
          </div>

          <div className="mb-[38px] mt-[20px] flex h-[24px] w-[85px] items-center justify-center rounded-[5px] bg-darkgray text-white">
            01:52:50
          </div>

          <Button
            text="OPEN IN WALLET"
            highlighted={true}
            customClass="py-[12px] px-[40px] bg-[#00CD2C] border-[#00CD2C]"
            customHighlightedHover="hover:bg-[#009821]"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Cryptocurrency;
