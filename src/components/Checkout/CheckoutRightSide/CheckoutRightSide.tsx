import { formatCurrency } from "@/helpers/curency_format";
import { parseFreeShippingMethodTitle } from "@/helpers/parse_shipping_method_title";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { CartResponse } from "@/types/cart_types";
import classNames from "classnames";
import { FC, useMemo } from "react";
import Spinner from "../../SvgComponents/Spinner";
import CheckoutCouponInput from "./CheckoutCouponInput";
import CheckoutCoupons from "./CheckoutCoupons";
import CheckoutRightSideItem from "./CheckoutRightSideItem";
import CheckoutStoreCredit from "./CheckoutStoreCredit";
import DiscountInfo from "./DiscountInfo";

type CheckoutRightSideProps = {
  paymentStep?: number;
  cartData?: CartResponse;
  isCartLoading?: boolean;
  recalculation?: boolean;
  cartUpdate?: boolean;
  setCartUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckoutRightSide: FC<CheckoutRightSideProps> = ({
  paymentStep,
  cartData,
  recalculation,
  isCartLoading,
  cartUpdate,
  setCartUpdate = () => {},
}) => {
  // hooks
  const { isCartUpdating } = useCheckoutContext();
  // const [cartUpdate, setCartUpdate] = useState(false);

  const cartFees = useMemo(() => {
    if (paymentStep === 1) {
      return cartData?.cart?.fees?.filter(
        (f) => f.key !== "first-order-discount"
      );
    }
    return cartData?.cart?.fees;
  }, [cartData, paymentStep]);

  // const hasFirstOrderDiscount = useMemo(() => {
  //   return cartData?.cart?.fees?.some((f) => f.key === "first-order-discount");
  // }, [cartData]);

  const hasCoupon = useMemo(
    () => cartData?.cart?.coupons?.some((c) => c.code !== "store credit"),
    [cartData]
  );
  const hasStoreCredit = useMemo(
    () => cartData?.cart?.coupons?.some((c) => c.code === "store credit"),
    [cartData]
  );

  if (isCartLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner widthHeight="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="sm:px-[8px] sm:pb-[16px]">
      {/* Right side checkout items */}
      <div>
        {cartData?.cart?.items?.map((item, index) => (
          <CheckoutRightSideItem item={item} key={index} />
        ))}
      </div>

      {/* Coupon code */}
      <div className="sm:hidden">
        {cartData && !hasStoreCredit && !hasCoupon && (
          <CheckoutCouponInput cartData={cartData} />
        )}
      </div>

      {/* subtotal, shipping and total */}
      {cartData !== undefined ? (
        <div className="mt-[24px] flex flex-col">
          {/* subtotal */}
          <div className="font-D16px-M13px flex justify-between">
            <p>Subtotal</p>
            <p
              className={classNames({
                " overflow-hidden text-[#333333] ": true,
                "text-darkgray": recalculation || cartUpdate,
              })}
            >
              {recalculation || cartUpdate || isCartUpdating
                ? "Calculating..."
                : formatCurrency(
                    cartData?.cart?.totals?.subtotal!,
                    false,
                    (formatCurrency(
                      cartData?.cart?.totals?.subtotal!!,
                      false,
                      false
                    )
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
            </p>
          </div>

          {!!cartData?.cart?.coupons?.length && (
            <CheckoutCoupons
              cartData={cartData}
              isProcessing={recalculation || cartUpdate || isCartUpdating}
            />
          )}

          {cartData?.cart?.shipping_rates
            .filter((shippment) => shippment.selected)
            .map((shippment, index) => (
              <div
                key={index}
                className={classNames({
                  "font-D16px-M13px mt-4 flex justify-between": true,
                })}
              >
                <p>Shipping</p>

                <p
                  key={index}
                  className={classNames({
                    "ml-[8px] overflow-hidden text-right sm:flex sm:flex-col sm:justify-end md:flex md:flex-col md:justify-end":
                      true,
                    "flex flex-col items-end ":
                      shippment.label ===
                      "UPS® Ground (3 working days) [Free Shipping]",
                  })}
                >
                  {recalculation || cartUpdate || isCartUpdating
                    ? "Calculating..."
                    : shippment.label ===
                        "UPS® Ground (3 working days) [Free Shipping]"
                      ? "UPS® Ground (3 days)"
                      : parseFreeShippingMethodTitle(
                          shippment.label.replace("working", "")
                        )}
                  {shippment.label !==
                    "UPS® Ground (3 working days) [Free Shipping]" && ": "}
                  <span
                    className={classNames({
                      " text-[#333333] ": true,
                      flex:
                        shippment.label ===
                        "UPS® Ground (3 working days) [Free Shipping]",
                    })}
                  >
                    {shippment.label ===
                      "UPS® Ground (3 working days) [Free Shipping]" &&
                      !recalculation && (
                        <span className="font-D16px-M13px mr-[4px] ">
                          {`[Free Shipping]: `}{" "}
                        </span>
                      )}
                    {recalculation || cartUpdate || isCartUpdating
                      ? ""
                      : formatCurrency(
                          +shippment.cost,
                          true,
                          shippment!.label.includes("[Free Shipping]")
                        )}
                  </span>
                </p>
              </div>
            ))}
          {/* {cartFees?.map((fees) => (
            <div
              key={fees.key}
              className="font-D16px-M13px mt-[16px] flex justify-between"
            >
              <p
                className={classNames({
                  "md:max-w-[180px] ":
                    fees.name?.toLowerCase().includes("cryptocurrency") ||
                    fees.name?.toLowerCase().includes("bank") ||
                    fees.name?.toLowerCase().includes("quantity"),
                  "md:max-w-[140px]": fees.name?.toLowerCase().includes("cash"),
                })}
              >
                {fees.name}
              </p>
              <p>
                {" "}
                <span
                  className={classNames({
                    " text-[#333333] ": true,
                    "animate-pulse":
                      recalculation || cartUpdate || isCartUpdating,
                  })}
                >
                  {formatCurrency(
                    +fees.total,
                    false,
                    (formatCurrency(+fees.total!, false, false)
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
                </span>
              </p>
            </div>
          ))} */}

          {/* Total */}
          <div className="font-D18px-M13px mt-[32px] flex justify-between  font-bold sm:mt-[16px]">
            <p className="uppercase">Total</p>
            <p
              className={classNames({
                " overflow-hidden text-[#333333] ": true,
                "text-darkgray": recalculation || cartUpdate || isCartUpdating,
              })}
            >
              {recalculation || cartUpdate || isCartUpdating
                ? "Calculating..."
                : formatCurrency(
                    cartData?.cart?.totals?.price,
                    false,
                    (formatCurrency(
                      cartData?.cart?.totals?.subtotal!!,
                      false,
                      false
                    )
                      .toString()
                      .split(".")[1] || "") == "00"
                  )}
            </p>
          </div>
          <div className="sm:hidden">
            {!hasStoreCredit && !hasCoupon && (
              <CheckoutStoreCredit
                setCartUpdate={setCartUpdate}
                isMobile={false}
              />
            )}
          </div>

          {/* <div className="sm:hidden">
            <DiscountInfo />
          </div> */}

          {/* <div className="font-14px-ALL pt-6">
            <p className="mb-1 font-bold">HOW DISCOUNT WORKS?</p>
            <span className="mb-2 block italic">
              {`You cannot aggregate first order discount with
              promotions, only the higher discount is applied.`}
            </span>
            <span className="mb-2 block italic">
              {`(e.g. if coupon offers 30% discount and you have a 15% first order
              discount, you'll get 30% TOTAL discount, not
              45%)`}
            </span>
            <span className="block italic">
              {`Store credit and coupon codes cannot be used at the same time. If
              you apply a coupon code, the store credit option will be disabled.`}
            </span>
          </div> */}
        </div>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export default CheckoutRightSide;
