import { ProductNew, Variation } from "@/types/product";
import { FC, Ref } from "react";
import Button from "../Button/Button";
import Quantity from "../Quantity/Quantity";

interface SingleProductStickyActionButtonsProps {
  productQuantity: number;
  handleQuantatyChange: (quantity: number) => void;
  product: ProductNew | Variation;
  disabled?: boolean;
  handleAddToCartAction: (
    product: ProductNew | Variation,
    redirect?: boolean
  ) => Promise<void>;
  isGift?: boolean;
  addToCartRef?: Ref<HTMLButtonElement>;
}

const SingleProductStickyActionButtons: FC<
  SingleProductStickyActionButtonsProps
> = ({
  productQuantity,
  handleQuantatyChange,
  product,
  disabled,
  handleAddToCartAction,
  isGift,
  addToCartRef,
}) => {
  if (isGift) {
    return (
      <div className="fixed bottom-[10px] left-[10px] z-[2] hidden max-h-[70px] w-full max-w-[calc(100%-20px)] items-center justify-between gap-[4px] rounded-[5px] bg-backdrop p-[8px] sm:flex">
        <Button
          text="CLAIM NOW"
          onPress={() => handleAddToCartAction(product, false)}
          highlighted={true}
          showSpiner={true}
          reverseColors={true}
          customClass="w-full"
          disabled={disabled || !product.in_stock}
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-[10px] left-[10px] z-[2] hidden max-h-[70px] w-full max-w-[calc(100%-20px)] items-center justify-between gap-[4px] rounded-[5px] bg-backdrop p-[8px] sm:flex">
      <div className="w-[50%] min-w-[50%] max-w-[50%]">
        <Quantity
          quantityNumber={productQuantity}
          changeQuantaty={handleQuantatyChange}
          type="sticky-actions"
        />
      </div>
      <div className="flex w-[49%] min-w-[49%] max-w-[49%] flex-col gap-[4px]">
        <Button
          ref={addToCartRef}
          text="ADD TO CART"
          customSpinnerClass="!h-[16px] !w-[16px] !mr-[10px]"
          onPress={() => handleAddToCartAction(product)}
          customClass="!h-[25px] font-13px-ALL bg-white border-[#E7461E]"
          showSpiner
          disabled={disabled || !product.in_stock}
        />
        <Button
          text="BUY NOW"
          highlighted
          customClass="!h-[25px] font-13px-ALL"
          customSpinnerClass="!h-[16px] !w-[16px] !mr-[12px]"
          onPress={() => handleAddToCartAction(product, true)}
          showSpiner
          disabled={disabled || !product.in_stock}
          reverseColors
        />
      </div>
    </div>
  );
};

export default SingleProductStickyActionButtons;
