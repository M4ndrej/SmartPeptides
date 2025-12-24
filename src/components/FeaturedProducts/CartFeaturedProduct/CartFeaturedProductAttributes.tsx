import VariationButton from "@/components/VariationButton/VariationButton";
import { CartItemContext, CartItemType } from "@/types/cart_types";
import { ProductNew } from "@/types/product";
import { FC } from "react";

interface CartFeaturedProductAttributesProps {
  variation: string | undefined;
  cartItems: CartItemType[];
  mainProduct: ProductNew;
  showSelectWeightMsg: boolean;
  insulin05ml: boolean;
  insulin1ml: boolean;
  handleVariationChange: (option: string) => void;
}

const CartFeaturedProductAttributes: FC<CartFeaturedProductAttributesProps> = ({
  variation,
  cartItems,
  mainProduct,
  showSelectWeightMsg,
  insulin05ml,
  insulin1ml,
  handleVariationChange,
}) => {
  const productListWeightOptions = mainProduct?.attributes?.[0]?.options;
  if (!productListWeightOptions || productListWeightOptions.length < 2) {
    return undefined;
  }

  const validOptions = productListWeightOptions.filter((op) => {
    if (mainProduct.id === 11557) {
      if (insulin05ml) return op !== "0.5ml";
      if (insulin1ml) return op !== "1ml";
    }
    return op;
  });

  return validOptions?.map((option, index) => {
    const currentVariation = mainProduct.variations.find(
      (item) => item.attributes[0].option === option
    );

    const isVariationInCart =
      (cartItems as CartItemContext[])?.findIndex(
        (itm) => itm.id == +currentVariation?.id!
      ) > -1;

    return (
      <VariationButton
        key={option}
        onClick={() => handleVariationChange(option)}
        variationValue={option}
        variationSelected={option === variation}
        variationAddedToCart={isVariationInCart}
        largerBtns={true}
      />
    );
  });
};

export default CartFeaturedProductAttributes;
