"use client";

import { addToCart as addToCartAction } from "@/app/actions/cart/add/actions";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { CartItemType } from "@/types/cart_types";
import { ProductNew, Variation } from "@/types/product";
import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { mutate } from "swr";
import ProductBanner from "../ProductBanner/ProductBanner";

interface featuredProductsProps {
  mainProduct: ProductNew;
  cartView?: boolean;
  cartItems: CartItemType[];
  closeSidepopoverModal?: () => void;
  selectedWater?: "water" | "nacl";
  setSelectedWater?: Dispatch<SetStateAction<"water" | "nacl">>;
}

const FeaturedProduct: FC<featuredProductsProps> = ({ mainProduct }) => {
  const [variation, setVariation] = useState<string | undefined>(
    mainProduct?.attributes?.[0]?.options?.[0]
  );

  const [productVariation, setProductVariation] = useState(
    mainProduct.variations.findIndex(
      (item) => item.attributes[0].option === variation
    )
  );

  const [showSpinner, setSpinner] = useState(false);
  const appContext: any = useContext(ThemeContext);
  const pathname = usePathname();
  const checkoutPage = pathname === "/cart/";

  const handleAddToCartAction = async (product: ProductNew | Variation) => {
    setSpinner(true);

    const addToCartResult = await addToCartAction([
      {
        product_id: product.id.toString(),
        quantity: 1,
      },
    ]);

    if (addToCartResult.success) {
      setSpinner(false);
      !checkoutPage &&
        appContext.dispatch({
          type: TOGGLE_CART_MODAL,
          payload: { showCartModal: true },
        });
      mutate("/api/cart/get_cart", {
        cart: addToCartResult?.success?.cart?.data,
        loggedUser: "success",
      });
    } else {
      setSpinner(false);
    }
  };

  const product = mainProduct?.variations[productVariation];

  const addToCart = async () => {
    if (variation) {
      await handleAddToCartAction(product);
    } else {
      await handleAddToCartAction(mainProduct);
    }
  };

  const handleVariation = (e: string) => {
    const productIndex = mainProduct.variations.findIndex(
      (item) => item.attributes[0].option === e
    );

    setVariation(e);
    setProductVariation(productIndex);
  };

  return (
    <ProductBanner
      title={
        mainProduct?.id === 114187
          ? "Bacteriostatic Water"
          : mainProduct?.id === 114191
            ? "Bacteriostatic NaCl"
            : mainProduct?.name
      }
      text={
        mainProduct.id == 114187
          ? "Bacteriostatic Water is simply sterile water containing 0.9% benzyl alcohol, and it is typically used to dissolve or dilute stronger medications. It is safe to use in injections – so safe, in fact, that it brings no harm to the body when used on a regular basis."
          : mainProduct.id == 114191
            ? "Bacteriostatic Sodium Chloride for Injection"
            : mainProduct.id == 114189
              ? "Empty vials for mixing"
              : mainProduct.id == 114195
                ? "Water based cream, used to reconstitute topical peptides."
                : ""
      }
      toggleWaters={mainProduct?.id === 114187 || mainProduct?.id === 114191}
      attributes={
        mainProduct?.attributes?.length ? mainProduct?.attributes : null
      }
      variations={mainProduct?.variations ? mainProduct.variations : null}
      image={product ? product.image[0].src : mainProduct?.images[0].src}
      buttonText="ADD TO CART"
      customTextHolderClass={
        "w-[341px] sm:min-w-min sm:w-full sm:max-w-[323px] md:w-full md:pr-[60px] from834:pr-[30px]"
      }
      buttonAction={addToCart}
      variationChange={(e) => {
        handleVariation(e);
      }}
      mainProduct={mainProduct}
      bacterioWaterEnv={114187}
      bacterioNaClEnv={114191}
      sterileEmptyVialsEnv={114189}
      serumBaseEnv={114195}
      insulinSyringeEnv={11557}
    />
  );
};

export default FeaturedProduct;
