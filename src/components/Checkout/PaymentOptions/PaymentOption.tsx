import { FC, ReactNode } from "react";
import Image from "next/image";
import { PaymentMethods } from "@/types/payment";
import AnimateHeight from "react-animate-height";
import classNames from "classnames";

type PaymentOptionProps = {
  paymentMethod: PaymentMethods;
  title: string;
  image: string | string[];
  customBanner?: ReactNode;
  selectedPaymentMethod?: PaymentMethods | null;
  updatePaymentMethod?: (mathod: PaymentMethods) => void;
  children?: ReactNode;
  includeBorder?: boolean;
  isUpdating?: boolean;
};

const PaymentOption: FC<PaymentOptionProps> = ({
  paymentMethod,
  title,
  image,
  children,
  customBanner,
  selectedPaymentMethod,
  updatePaymentMethod,
  includeBorder = true,
  isUpdating = false,
}) => {
  const images = Array.isArray(image) ? image : [image];
  return (
    <div
      className={classNames(
        includeBorder &&
          "mb-4 border-b-[1px] border-borderColor pb-4 last:mb-0 last:border-none last:pb-0",
        isUpdating && "pointer-events-none opacity-50"
      )}
    >
      <div
        className="relative flex cursor-pointer items-center gap-[8px]"
        onClick={() => updatePaymentMethod?.(paymentMethod)}
      >
        <input
          type="radio"
          value={paymentMethod}
          checked={paymentMethod === selectedPaymentMethod}
          readOnly
          name="paymentOption"
          className="mb-[3px] h-[14px] cursor-pointer rounded-[5px] border border-borderColor px-[16px] py-[12px] outline-0"
        />
        <div className="flex w-full items-center gap-2">
          <div className="flex min-w-max shrink-0 flex-grow items-center justify-start gap-4 sm:gap-2">
            {images.map((imgSrc, index) => (
              <Image
                key={index}
                src={imgSrc}
                width={24}
                height={24}
                alt={title}
                className="h-[24px] w-[24px] select-none object-contain sm:h-[18px] sm:w-[18px]"
              />
            ))}
            <span className="font-D16px-M13px min-w-max shrink-0 sm:leading-[16px]">
              {title}
            </span>
          </div>
          {customBanner}
        </div>
      </div>
      {children && (
        <AnimateHeight
          height={paymentMethod === selectedPaymentMethod ? "auto" : 0}
        >
          <div className="font-D16px-M13px mt-4 grid">{children}</div>
        </AnimateHeight>
      )}
    </div>
  );
};

export default PaymentOption;
