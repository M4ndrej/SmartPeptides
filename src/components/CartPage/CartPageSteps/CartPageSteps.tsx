import { paymentImagesData } from "@/data/payment_images_data";
import classNames from "classnames";
import Image from "next/image";

const CartPageSteps = () => {
  return (
    <div
      className={classNames({
        " m-[auto] bg-lightgray ": true,
      })}
    >
      {/* Steps wrapper */}
      <div
        className={classNames({
          "m-[auto] flex w-full max-w-[1264px] justify-between px-[32px] py-[23px] sm:justify-center sm:py-[16px] md:px-[32px] md:py-[31px] ":
            true,
        })}
      >
        {/* ACTIVE STEP */}
        <div
          className={classNames({
            "flex items-center ": true,
          })}
        >
          <strong className="cart-step-num cart-step-num--active mr-[15px] sm:hidden md:hidden">
            01
          </strong>
          <div className="flex flex-col ">
            <p className="cart-step-title cart-step-title--active">
              Shopping Cart
            </p>
            <span className="cart-step-desc cart-step-desc--active sm:text-center md:text-center">
              Manage Your Items List
            </span>
          </div>
        </div>

        {/* INACTIVE STEP add login for hidden class */}
        <div
          className={classNames({
            "flex items-center sm:hidden": true,
          })}
        >
          <strong className="cart-step-num mr-[15px] sm:hidden md:hidden">
            02
          </strong>
          <div className="flex flex-col">
            <p className="cart-step-title ">Checkout</p>
            <span className="cart-step-desc sm:text-center md:text-center">
              Checkout Your Items List
            </span>
          </div>
        </div>

        {/* INACTIVE STEP */}
        <div
          className={classNames({
            "flex items-center sm:hidden": true,
          })}
        >
          <strong className="cart-step-num mr-[15px] sm:hidden md:hidden">
            03
          </strong>
          <div className="flex flex-col">
            <p className="cart-step-title ">Payment</p>
            <div className="cart-step-desc flex gap-[5px] opacity-[40%]">
              {paymentImagesData.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSteps;
