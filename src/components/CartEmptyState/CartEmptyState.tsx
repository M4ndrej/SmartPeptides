import Image from "next/image";
import { FC } from "react";
import Button from "../Button/Button";
import classNames from "classnames";
interface CartEmptyStatetProps {
  navigate?: any;
  close?: any;
  page?: string;
}

const CartEmptyState: FC<CartEmptyStatetProps> = ({ navigate, page }) => {
  return (
    <div>
      <div
        className={classNames({
          "mx-auto mb-[286px] flex w-full flex-col items-center gap-[32px] px-[32px] pt-[40px] text-center sm:mb-[64px] sm:max-w-[410px] sm:px-0  sm:pt-0":
            true,
          "sm:mt-[40px]": page === "cart-page",
        })}
      >
        <Image
          src="/images/cartIconBig.svg"
          width={80}
          height={80}
          alt="Cart Bag"
          className="h-[105px] w-[99px] select-none sm:h-[81px] sm:w-[77px]"
        />
        <div>
          <div className="font-D24px-M18px sm:mx-auto sm:max-w-[320px] ">
            You have no items in your shopping bag.
          </div>
          <p className="font-D16px-M13px mt-[16px] max-w-[650px] text-gray2 sm:mt-[8px] sm:max-w-[367px]">
            Before you proceed to checkout you must add some products to
            shopping cart. You will find a lot of interesting products on our
            “Shop” page
          </p>
        </div>
        <div
          className="flex w-full justify-center sm:w-[228px]"
          onClick={navigate}
        >
          <Button text={"RETURN TO SHOP"} highlighted />
        </div>
      </div>
    </div>
  );
};

export default CartEmptyState;
