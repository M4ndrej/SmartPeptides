import { ChangeEvent, FC, useEffect, useState } from "react";
import classNames from "classnames";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";
interface QuantityProps {
  quantityNumber: number;
  smallerSize?: boolean;
  type?: string;
  changeQuantaty: (quantaty: number) => void;
  handleRemoveFromCart?: () => void;
}

let changeQuantityTimer: NodeJS.Timeout;

const Quantity: FC<QuantityProps> = ({
  quantityNumber,
  smallerSize,
  type,
  changeQuantaty,
  handleRemoveFromCart,
}) => {
  const [quantity, handleQuantity] = useState(+quantityNumber);
  const insertQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return;

    const val = e.target.value ? parseInt(e.target.value) : 0;

    handleQuantity(val);

    clearTimeout(changeQuantityTimer);
    changeQuantityTimer = setTimeout(async () => {
      if (val === 0) {
        if (confirm("Do you want to delete this product from cart?") == true) {
          await handleRemoveFromCart?.();
        } else {
          handleQuantity(+quantityNumber);
        }
        return;
      }

      changeQuantaty(val);
    }, 1200);
  };

  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleChangeQuantaty = (quantaty: number) => {
    handleQuantity(+quantaty);

    clearTimeout(changeQuantityTimer);
    changeQuantityTimer = setTimeout(async () => {
      if (quantaty === 0) {
        if (confirm("Do you want to delete this product from cart?") == true) {
          await handleRemoveFromCart?.();
        } else {
          setBtnDisabled(false);
          handleQuantity(+quantityNumber);
        }
        return;
      }

      changeQuantaty(+quantaty);
    }, 800);
  };

  useEffect(() => {
    setBtnDisabled(quantity === 1 ? true : false);
  }, [quantity]);

  return (
    <div
      className={classNames(
        "flex h-[48px] w-[113px] items-center rounded-[5px] border border-borderColor",
        smallerSize && "!h-[40px]",
        type === "quickview" && "!w-full sm:!w-full sm:justify-between",
        type === "single-product" &&
          "sm:!w-full sm:justify-between md:!w-[141px] from834:!w-[135px] lg:!w-[180px] xl:!w-[141px]",
        type === "sticky-actions" && "h-[55px] w-full justify-center bg-white"
      )}
    >
      <div
        className={classNames(
          "transition-bg flex h-[100%] w-[54px] cursor-pointer items-center justify-center duration-200 hover:bg-gray",
          quantity > 1 && "cursor-pointer hover:bg-gray dark:hover:bg-darkgray",
          btnDisabled && "pointer-events-none",
          type === "sticky-actions" && "w-full",
          type === "single-product" && "md:!w-[87px] lg:!w-[87px] xl:!w-[54px]"
        )}
        onClick={() => handleChangeQuantaty(quantity - 1)}
      >
        <MinusIcon
          width={12}
          height={12}
          className={classNames(
            quantity > 1
              ? "stroke-darkgray dark:stroke-gray"
              : "stroke-gray dark:stroke-gray"
          )}
        />
      </div>

      <input
        maxLength={2}
        type="text"
        inputMode="numeric"
        value={quantity}
        min={1}
        className="h-[100%] !w-[33px] !border-0 !bg-transparent text-center outline-none focus:!bg-transparent"
        onChange={(e) => {
          insertQuantity(e);
        }}
      />

      <div
        className={classNames(
          "transition-bg flex h-[100%] w-[54px] cursor-pointer items-center justify-center duration-200 hover:bg-gray dark:hover:bg-darkgray",
          type === "sticky-actions" && "w-full",
          type === "single-product" && "md:!w-[87px] lg:!w-[87px] xl:!w-[54px]"
        )}
        onClick={() => handleChangeQuantaty(quantity + 1)}
      >
        <PlusIcon
          width={12}
          height={12}
          className="stroke-darkgray dark:stroke-gray"
        />
      </div>
    </div>
  );
};

export default Quantity;
