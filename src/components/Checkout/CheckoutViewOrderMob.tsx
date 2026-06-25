import { Height } from "react-animate-height";
import AnimateHeight from "react-animate-height";
import { useState, FC, ReactElement } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";

type CheckoutRightSideProps = {
  cartData?: CartResponse;
  children: ReactElement;
};

const CheckoutViewOrderMob: FC<CheckoutRightSideProps> = ({
  cartData,
  children,
}) => {
  const [orderHeight, setOrderHeight] = useState<Height>(0);

  const viewOrderHandler = () => {
    setOrderHeight(orderHeight === 0 ? "auto" : 0);
  };

  return (
    <>
      <div
        className="flex h-[48px] w-full items-center justify-between sm:px-[16px]"
        onClick={viewOrderHandler}
        aria-expanded={orderHeight !== 0}
      >
        <div className="flex items-center gap-[8px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_493_160356)">
              <path
                d="M28.4603 24.77L26.0703 11.39C25.8403 10.08 24.7003 9.12 23.3603 9.12H22.0003V6.75C22.0003 4.13 19.8703 2 17.2503 2H15.2503C12.6303 2 10.5003 4.13 10.5003 6.75V9.12H9.14029C7.81029 9.12 6.67029 10.08 6.43029 11.39L4.04029 24.77C3.74029 26.46 5.04029 28 6.75029 28H25.7503C27.4603 28 28.7603 26.45 28.4603 24.77ZM25.7503 26.5H6.75029C5.97029 26.5 5.38029 25.8 5.52029 25.03L7.91029 11.65C8.02029 11.05 8.53029 10.62 9.14029 10.62H10.3503C10.1703 10.84 10.0603 11.12 10.0603 11.43C10.0603 12.13 10.6103 12.7 11.3003 12.7C11.9903 12.7 12.5403 12.12 12.5403 11.43C12.5403 11.12 12.4203 10.85 12.2503 10.62H20.2703C20.0903 10.84 19.9803 11.12 19.9803 11.43C19.9803 12.13 20.5303 12.7 21.2203 12.7C21.9103 12.7 22.4603 12.12 22.4603 11.43C22.4603 11.12 22.3503 10.85 22.1703 10.62H23.3703C23.9803 10.62 24.4903 11.05 24.6003 11.65L26.9903 25.03C27.1303 25.8 26.5403 26.5 25.7603 26.5H25.7503ZM15.2503 3.5H17.2503C19.0503 3.5 20.5003 4.96 20.5003 6.75V9.12H12.0003V6.75C12.0003 4.96 13.4603 3.5 15.2503 3.5Z"
                // fill="#9A9A9F"
                className="fill-black"
              />
            </g>
            <defs>
              <clipPath id="clip0_493_160356">
                <rect
                  width="24.5"
                  height="26"
                  fill="white"
                  transform="translate(4 2)"
                />
              </clipPath>
            </defs>
          </svg>
          {/* SVG and title */}
          <div className="flex cursor-pointer items-center gap-[8px]">
            <span className="font-D14px-M13px font-medium sm:leading-[16px]">
              Your order
            </span>
            <svg
              width="13"
              height="7"
              viewBox="0 0 13 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition duration-200 ${
                orderHeight !== 0 ? "rotate-[-180deg]" : ""
              }`}
            >
              <path
                d="M1 1L6.5 6L12 1"
                // stroke="#9A9A9F"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-black"
              />
            </svg>
          </div>
        </div>
        <p className="font-D14px-M13px text-darkgray">
          {cartData ? formatCurrency(cartData?.cart?.totals?.price!) : "$0.00"}
        </p>
      </div>
      <AnimateHeight
        height={orderHeight}
        duration={300}
        className="ease-[cubic-bezier(0.11,  0, 0.5, 0)] bg-lightgray sm:absolute sm:left-0 sm:z-[999] sm:w-full"
      >
        <div
          className={classNames(
            "relative min-h-[300px] p-4 opacity-0 transition-opacity duration-300 ease-in-out",
            orderHeight === "auto" && "opacity-100"
          )}
        >
          {children}
        </div>
      </AnimateHeight>
    </>
  );
};

export default CheckoutViewOrderMob;
