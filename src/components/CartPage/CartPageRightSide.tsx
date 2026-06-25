import Link from "next/link";
import Button from "../Button/Button";
import { FC } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import classNames from "classnames";
import Spinner from "../SvgComponents/Spinner";
import { CartTotals, Coupon, ShippingRate } from "@/types/cart_types";
import { parseFreeShippingMethodTitle } from "@/helpers/parse_shipping_method_title";

type CartPageRightSideProps = {
  prices: CartTotals;
  coupons: Coupon[];
  removeCouponLoading: string;
  shippingRates: ShippingRate[];
  handleRemoveCouponCode: (code: string) => void;
};

const CartPageRightSide: FC<CartPageRightSideProps> = ({
  prices,
  coupons,
  removeCouponLoading,
  shippingRates,
  handleRemoveCouponCode,
}) => {
  const totalPrice = prices.price;
  const subtotalPrice = prices.subtotal;
  const totalShipping = prices.shipping;
  const selectedShipping = shippingRates?.find((rate) => rate.selected);

  return (
    <div className="w-full rounded-[6px] border-[1px] border-[#9A9A9F] p-[24px] sm:p-[16px]">
      <h3 className="font-D18px-M16px font-medium uppercase">Cart total</h3>
      <div className="font-D16px-M13px mt-[24px] flex items-center justify-between">
        <p>Subtotal</p>
        <p>
          {formatCurrency(
            subtotalPrice,
            false,
            (formatCurrency(subtotalPrice!, false, false)
              .toString()
              .split(".")[1] || "") == "00"
          )}
        </p>
      </div>

      {coupons?.map((coupon, index) => (
        <div
          key={index}
          className="font-D16px-M13px mt-[16px] flex justify-between"
        >
          <p>Coupon</p>
          <p className="whitespace-nowrap text-right">
            {" "}
            <span
              className={classNames({
                "flex items-center text-darkgray": true,
                //processing: recalculation,
              })}
            >
              {removeCouponLoading == coupon.code ? (
                <Spinner customClass="mr-[8px]" />
              ) : (
                <span
                  className={classNames({
                    "flex items-center gap-x-[8px]": true,
                    "cursor-wait": removeCouponLoading,
                    "cursor-pointer [&_circle]:hover:fill-[#9A9A9F]":
                      !removeCouponLoading,
                  })}
                  onClick={() =>
                    !removeCouponLoading
                      ? handleRemoveCouponCode(coupon.code)
                      : {}
                  }
                >
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    className="min-h-[14px] min-w-[13px]"
                  >
                    <circle cx="6.5" cy="7" r="6.5" fill="#C7C7C7" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.50004 7.70714L8.64648 9.85359L9.35359 9.14648L7.20714 7.00004L9.35359 4.85359L8.64648 4.14648L6.50004 6.29293L4.35359 4.14648L3.64648 4.85359L5.79293 7.00004L3.64648 9.14648L4.35359 9.85359L6.50004 7.70714Z"
                      fill="white"
                    />
                  </svg>
                  <span className="mr-[8px] border-2 border-dotted border-gray3 px-[16px] py-[3px] text-darkgray hover:bg-gray4">
                    {coupon.code}
                  </span>
                </span>
              )}

              {formatCurrency(+`-${+coupon.amount}`)}
            </span>
          </p>
        </div>
      ))}
      <div className="mt-[24px] flex items-start justify-between border-b-[1px] border-t-[1px] border-borderColor py-[24px] sm:mt-[16px] sm:py-[16px]">
        <p className="font-D16px-M13px">Shipping</p>
        <div className="font-D16px-M13px flex flex-col items-end gap-[8px] text-right sm:pl-[18px]">
          <p>
            {selectedShipping
              ? parseFreeShippingMethodTitle(
                  selectedShipping.label.replace("working", "")
                )
              : shippingRates?.length
                ? parseFreeShippingMethodTitle(shippingRates[0]?.label)
                : "Priority 2-4 days"}
            {totalShipping
              ? `: ${formatCurrency(totalShipping, false, false)}`
              : ""}
          </p>
          <p className="max-w-[180px]">
            Shipping options will be updated during checkout.
          </p>
          {/* Calculate shipping hidden for now */}
          {/* <Link
            href="#"
            className="text-[16px] font-normal leading-[24px] text-darkgray transition-all ease-linear hover:text-gray sm:text-[14px] sm:leading-[22px]"
          >
            Calculate shipping
          </Link> */}
        </div>
      </div>
      <div className="mt-[24px] sm:mt-[16px]">
        <div className="font-D18px-M13px flex items-center justify-between">
          <p className="font-bold uppercase">Total</p>
          <p className="font-bold text-darkgray">
            {formatCurrency(
              totalPrice,
              false,
              (formatCurrency(totalPrice!, false, false)
                .toString()
                .split(".")[1] || "") == "00"
            )}
          </p>
        </div>
        <Link href="/payment">
          <Button
            text="PROCEED TO CHECKOUT"
            highlighted
            onPress={async () => {}}
            customClass="w-full mt-[32px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default CartPageRightSide;
