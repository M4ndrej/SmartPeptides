import { ProductNew, Variation } from "@/types/product";
import { FC, Ref } from "react";
import Button from "../Button/Button";
import Quantity from "../Quantity/Quantity";

interface SingleProductStaticActionButtonsProps {
  productQuantity: number;
  handleQuantatyChange: (quantity: number) => void;
  product: ProductNew | Variation;
  disabled?: boolean;
  handleAddToCartAction: (
    product: ProductNew | Variation,
    redirect?: boolean
  ) => Promise<void>;
  isWrapped?: boolean;
  type?: string;
  isGift?: boolean;
  addToCartRef?: Ref<HTMLButtonElement>;
}

const SingleProductStaticActionButtons: FC<
  SingleProductStaticActionButtonsProps
> = ({
  productQuantity,
  handleQuantatyChange,
  product,
  disabled,
  handleAddToCartAction,
  isWrapped,
  type = "single-product",
  isGift,
  addToCartRef,
}) => {
  if (isGift) {
    return (
      <Button
        ref={addToCartRef}
        text="CLAIM NOW"
        onPress={() => handleAddToCartAction(product, false)}
        highlighted={true}
        showSpiner={true}
        reverseColors={true}
        customClass="w-full"
        // disabled={disabled}
      />
    );
  }

  return (
    <div className="flex w-full flex-wrap gap-4 sm:gap-[10px]">
      <div className="sm:order-2 sm:w-[172px] sm:grow">
        <Quantity
          quantityNumber={productQuantity}
          changeQuantaty={handleQuantatyChange}
          type={type}
        />
      </div>
      <div className="w-[170px] grow sm:order-first">
        <Button
          ref={addToCartRef}
          text="ADD TO CART"
          customClass="w-full sm:min-w-[50%]"
          onPress={() => handleAddToCartAction(product)}
          showSpiner
          disabled={disabled || !product.in_stock}
        />
      </div>
      <div className="grow sm:order-last">
        <Button
          text="BUY NOW"
          highlighted
          customClass="w-full"
          onPress={() => handleAddToCartAction(product, true)}
          showSpiner
          disabled={disabled || !product.in_stock}
          reverseColors
        />
      </div>
    </div>
  );
};

export default SingleProductStaticActionButtons;
