"use client";

import Quantity from "../Quantity/Quantity";
import { FC } from "react";
import { mutate } from "swr";
import { useState } from "react";
import { formatCurrency } from "@/helpers/curency_format";
import classNames from "classnames";
import Link from "next/link";
import { CartItemType } from "@/types/cart_types";
import updateCartItemQuantity from "@/app/actions/cart/update_quantity/actions";
import removeFromCart from "@/app/actions/cart/remove/actions";
import AuthorizedImage from "../Image/Image";
import CartItem from "../Cart/CartItem";

type CartProductItemProps = {
  item: CartItemType;
  isInDeleteProcess: boolean;
  onDelete: (e: boolean) => void;
};

const CartProductItem: FC<CartProductItemProps> = ({
  item,
  isInDeleteProcess,
  onDelete,
}) => {
  const [updating, setUpdating] = useState(false);

  const handleRemoveFromCart = async (key: string) => {
    setUpdating(true);
    onDelete(true);
    const removeFromCartResponse = await removeFromCart({ key });
    if (removeFromCartResponse.success) {
      mutate("/api/cart/get_cart", {
        cart: removeFromCartResponse.success.cart.data,
        loggedUser: "success",
      });
    }

    setUpdating(false);
    onDelete(false);
  };

  const handleQuantatyChange = async (quantity: number) => {
    const updateCartData = {
      key: item.key,
      quantity: quantity,
    };

    setUpdating(true);

    const handleUpdateQuantity = await updateCartItemQuantity(updateCartData);

    if (handleUpdateQuantity.success) {
      mutate("/api/cart/get_cart", {
        cart: handleUpdateQuantity.success.cart.data,
        loggedUser: "success",
      });
    }
    setUpdating(false);
  };

  const itemName = item?.link.split("/");
  const itemURL = itemName[itemName.length - 2];
  const productQuantaty = +item.quantity || 0;

  return (
    <div className=" ">
      <div
        key={item.id}
        className={classNames({
          "grid grid-cols-5 gap-[16px] border-b-[1px] border-borderColor py-[24px] sm:hidden lg:grid-cols-6":
            true,
          "pointer-events-none animate-pulse opacity-20": updating,
        })}
      >
        <div className="col-span-2 flex items-center gap-[16px] lg:col-span-3">
          <button
            onClick={() => handleRemoveFromCart(item.key)}
            className="sm:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classNames({
                "transition duration-200": true,
                "cursor-not-allowed": isInDeleteProcess,
                "[&_path]:hover:fill-[#333333]": !isInDeleteProcess,
              })}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.70568 8.00094L15.9995 0.707107L15.2924 0L7.99857 7.29383L0.707107 0.00236523L0 0.709472L7.29146 8.00094L0 15.2924L0.707107 15.9995L7.99857 8.70805L15.2924 16.0019L15.9995 15.2948L8.70568 8.00094Z"
                fill="#999999"
              />
            </svg>
          </button>
          <Link href={`/${itemURL}`}>
            <AuthorizedImage
              className={`h-[73px] w-[59px] select-none bg-lightgray object-contain ${item.id === 114189 && "sm:scale-[0.90]"}`}
              src={item.image.src}
              width={200}
              height={200}
              alt={item.image.alt}
              draggable={false}
            />
          </Link>
          <Link
            href={`/${itemURL}`}
            className="font-D16px-M12px overflow-hidden text-ellipsis whitespace-nowrap transition duration-200 hover:text-[#333333] md:max-w-none"
          >
            {item.title}{" "}
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* <div className="  font-10px-ALL text-gray2">
            {productQuantaty >= 5 && (
              <div>
                <span className="line-through">
                  {formatCurrency(+item.price, false, true)}
                </span>{" "}
                {productQuantaty >= 5 && productQuantaty < 10
                  ? "(-5%)"
                  : productQuantaty >= 10
                    ? "(-8%)"
                    : ""}
              </div>
            )}
          </div> */}
          <p className=" font-D16px-M13px text-[#333333] md:min-w-[80px]">
            {formatCurrency(item.prices.discount_price, false, false)}
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="flex flex-grow items-center justify-center">
            <Quantity
              smallerSize
              quantityNumber={productQuantaty}
              changeQuantaty={handleQuantatyChange}
              handleRemoveFromCart={() => handleRemoveFromCart(item.key)}
            />
          </div>
          {/* <div className="absolute bottom-0 flex w-[100%] justify-center">
            <div className="font-10px-ALL text-gray2">
              add X more for X discount
              {[4, 9].includes(productQuantaty) && (
                <div className="whitespace-nowrap">
                  +<span>{1} </span>
                  for{" "}
                  <strong>
                    {productQuantaty === 4 ? "5%" : "8%"} <span>disc</span>
                  </strong>{" "}
                </div>
              )}
            </div>
          </div> */}
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* {productQuantaty >= 5 && (
            <span className="font-10px-ALL text-gray2 line-through">
              {formatCurrency(+item.total, false, true)}
            </span>
          )} */}
          <p
            className={classNames({
              "font-D16px-M13px min-w-[98px] text-center text-[#333333] md:min-w-[80px]":
                true,
            })}
          >
            {formatCurrency(item.prices.total_discount_price, false, false)}
          </p>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className={classNames({
          "relative mt-0 flex flex-1 flex-col overflow-hidden border-b-[1px] border-gray py-[24px] md:hidden lg:hidden xl:hidden":
            true,
          "pointer-events-none opacity-20": updating,
        })}
      >
        <div className="">
          <div className="flex flex-col gap-[16px]">
            <CartItem
              handleRemoveFromCart={() => handleRemoveFromCart(item.key)}
              key={item.key}
              item={item}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
