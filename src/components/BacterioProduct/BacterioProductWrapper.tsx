import { hasProductInCart } from "@/helpers/product_cart_helpers";
import { CartItemType } from "@/types/cart_types";
import { ProductNew, Variation } from "@/types/product";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import BacterioProduct from "./BacterioProduct";
import { addToCart } from "@/app/actions/cart/add/actions";
import { ThemeContext } from "@/context/theme-provider";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { usePathname } from "next/navigation";
import { mutate } from "swr";
import { useRouter } from "next/navigation";

interface BacterioProductWrapperProps {
  naclProduct: ProductNew;
  waterProduct: ProductNew;
  cartItems: CartItemType[];
  closeSidepopoverModal?: () => void;
}

const BacterioProductWrapper: FC<BacterioProductWrapperProps> = ({
  naclProduct,
  waterProduct,
  cartItems,
  closeSidepopoverModal,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const checkoutPage = pathname === "/checkout";
  const appContext: any = useContext(ThemeContext);
  const [spinner, setSpinner] = useState(false);

  const [selectedWater, setSelectedWater] = useState<"water" | "nacl">("water");

  const hasNaCL = useMemo(
    () => hasProductInCart(cartItems, 114191), // "Ovo je PRODUCT_ID od Bacteriostatic NACL 30ml"
    [cartItems]
  );

  const hasWater = useMemo(
    () => hasProductInCart(cartItems, 114187), // "Ovo je PRODUCT_ID od Bacteriostatic Water 30ml"
    [cartItems]
  );

  useEffect(() => {
    if (hasNaCL) {
      setSelectedWater("water");
    }
    if (hasWater) {
      setSelectedWater("nacl");
    }
  }, [hasNaCL, hasWater]);

  const handleAddToCartAction = async (product: ProductNew | Variation) => {
    setSpinner(true);

    const addToCartResult = await addToCart([
      {
        product_id: product.id.toString(),
        quantity: 1,
      },
    ]);

    setSpinner(false);
    if (addToCartResult.success) {
      if (!checkoutPage) {
        appContext.dispatch({
          type: TOGGLE_CART_MODAL,
          payload: { showCartModal: true },
        });
      }
      mutate("/api/cart/get_cart", {
        cart: addToCartResult?.success?.cart?.data,
        loggedUser: "success",
      });
    }
  };

  const labelClickHandler = (route: string) => {
    router.push(route);
    pathname !== "/cart/" && closeSidepopoverModal?.();
  };

  if (hasWater && hasNaCL) return null;
  return (
    <BacterioProduct
      product={selectedWater === "water" ? waterProduct : naclProduct}
      showSpinner={spinner}
      customImgClasses=""
      addToCart={handleAddToCartAction}
      setSelected={setSelectedWater}
      hasBacterioWater={hasWater}
      hasBacterioNaCl={hasNaCL}
      closePopover={() => {
        labelClickHandler(
          selectedWater === "water"
            ? "/bacteriostatic-water-30ml/"
            : "/bacteriostatic-sodium-chloride-30ml/"
        );
      }}
    />
  );
};

export default BacterioProductWrapper;
