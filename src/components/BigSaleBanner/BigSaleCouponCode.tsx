import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import couponSrc from "../../../public/images/bigSaleCouponCode.png";

interface BigSaleCouponProps {
  className?: string;
}

export const BigSaleCouponCode: FC<BigSaleCouponProps> = ({ className }) => {
  return (
    <Image
      src={couponSrc}
      alt="Big Sale Coupon"
      width={427}
      height={99}
      priority={true}
      draggable={false}
      className={classNames(className)}
    />
  );
};
