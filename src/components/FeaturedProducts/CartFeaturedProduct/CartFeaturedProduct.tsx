"use client";
import { ProductNew, Variation } from "@/types/product";
import { FC, useContext, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import Spinner from "@/components/SvgComponents/Spinner";
import AuthorizedImage from "@/components/Image/Image";
import { CartItemContext, CartItemType } from "@/types/cart_types";
import Tooltip from "@/components/Tooltip/Tooltip";
import CartFeaturedProductAttributes from "./CartFeaturedProductAttributes";
import { usePathname, useRouter } from "next/navigation";
import { ThemeContext } from "@/context/theme-provider";
import { addToCart as addToCartAction } from "@/app/actions/cart/add/actions";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { mutate } from "swr";
import { hasProductInCart } from "@/helpers/product_cart_helpers";
import { getComProductSlug } from "@/helpers/product_helper";

interface CartFeaturedProductProps {
  mainProduct: ProductNew;
  cartItems: CartItemType[];
  closeSidepopoverModal?: () => void;
}

const CartFeaturedProduct: FC<CartFeaturedProductProps> = ({
  mainProduct,
  cartItems,
  closeSidepopoverModal,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const checkoutPage = pathname === "/cart/";
  const appContext: any = useContext(ThemeContext);

  const [weight, setWeight] = useState<string | undefined>();
  const selectedVariation = useMemo(() => {
    return mainProduct.variations.find(
      (v) => v.attributes[0].option === weight
    );
  }, [weight, mainProduct]);
  const productToShow = selectedVariation || mainProduct;

  const [showSelectWeightMsg, setShowSelectWeightMsg] = useState(false);
  const [showSpinner, setSpinner] = useState(false);

  const addToCartRef = useRef<HTMLDivElement>(null);

  const isProductInCart = useMemo(() => {
    return (
      (cartItems as CartItemContext[])?.findIndex(
        (item) => item.id == productToShow.id
      ) > -1
    );
  }, [productToShow, cartItems]);

  const handleAddToCartAction = async (product: ProductNew | Variation) => {
    if (!weight && product?.id === 11557) {
      setShowSelectWeightMsg(true);
      return;
    }
    setSpinner(true);

    const addToCartResult = await addToCartAction([
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
      if (product?.id === 11557) {
        handleVariationChange(hasInsulin05 ? "1ml" : "0.5ml");
      }
    }
  };

  const onAddToCartClick = async () => {
    if (isProductInCart) return;
    await handleAddToCartAction(selectedVariation || mainProduct);
  };

  const handleVariationChange = (weight: string) => {
    setWeight(weight);

    if (showSelectWeightMsg) {
      setTimeout(() => {
        addToCartRef.current?.click();
        setShowSelectWeightMsg(false);
        setWeight(undefined);
      }, 500);
    }
  };

  const hasSterileVials = useMemo(
    () => hasProductInCart(cartItems, 114189), // "Ovo je PRODUCT_ID od Sterile Empty Vials 10ml (3 pcs)"
    [cartItems]
  );

  // const hasNaCL = useMemo(
  //   () => hasProductInCart(cartItems, 114187), // "Ovo je PRODUCT_ID od Bacteriostatic NACL 30ml"
  //   [cartItems]
  // );

  // const hasWater = useMemo(
  //   () => hasProductInCart(cartItems, 114187), // "Ovo je PRODUCT_ID od Bacteriostatic Water 30ml"
  //   [cartItems]
  // );

  const hasSerum = useMemo(
    () => hasProductInCart(cartItems, 114195), // "Ovo je PRODUCT_ID od Serum Base 2oz"
    [cartItems]
  );

  const hasInsulin05 = useMemo(
    () => hasProductInCart(cartItems, 11557, "0-5ml"), // "Ovo je PRODUCT_ID od Insulin Syringe U-100"
    [cartItems]
  );

  const hasInsulin1 = useMemo(
    () => hasProductInCart(cartItems, 11557, "1ml"), // "Ovo je PRODUCT_ID od Insulin Syringe U-100"
    [cartItems]
  );

  const productName = useMemo(() => {
    if (mainProduct.name.includes("Sterile")) {
      return "Sterile Empty Vials 10ml";
    }
    if (mainProduct.name.includes("30ml")) {
      return mainProduct.name.slice(0, -4);
    }
    if (mainProduct.name.includes("Insulin")) {
      return "Insulin Syringe U-100, bag of 10";
    }
    return mainProduct.name;
  }, [mainProduct]);

  const labelClickHandler = (route: string) => {
    router.push(route);
    pathname !== "/cart/" && closeSidepopoverModal?.();
  };

  return (
    <>
      {((mainProduct.id === 11557 && !hasInsulin05) ||
        (mainProduct.id === 11557 && !hasInsulin1) ||
        (mainProduct.id === 114189 && !hasSterileVials) ||
        (mainProduct.id === 114195 && !hasSerum)) && (
        <div
          className={classNames({
            "!col-span-2 flex h-[67px] w-full items-center bg-[#f0f0f0] py-[9px] pl-[6px] pr-[16px] dark:bg-transparent":
              true,
            "order-[-1]": mainProduct.id == 11557,
            "order-[1]": mainProduct.id === 114189,
            "order-[2]": mainProduct.id === 114195,
            "!col-span-2": !hasInsulin05 || !hasInsulin1,
          })}
        >
          <div className="mr-[8px] h-[40px] w-[40px]">
            <div
              onClick={() =>
                labelClickHandler(`/${getComProductSlug(mainProduct)}`)
              }
              className="overflow-hidden"
            >
              <AuthorizedImage
                src={mainProduct?.images?.[0].src}
                width={40}
                height={40}
                alt="Featured Product"
                className={classNames({
                  " h-full w-full scale-[1.2] cursor-pointer select-none object-cover transition duration-200 hover:scale-[1.3]":
                    true,
                })}
              />
            </div>
          </div>
          <div
            className={classNames({
              "flex flex-1 flex-col gap-[4px]": true,
              "!gap-0": mainProduct?.attributes?.[0]?.options,
            })}
          >
            <div
              onClick={() =>
                labelClickHandler(`/${getComProductSlug(mainProduct)}`)
              }
            >
              <div className="font-D16px-M12px w-fit cursor-pointer font-bold transition-[color] duration-300 ease-in-out hover:text-gray">
                {productName}
              </div>
            </div>

            <div className="flex items-center gap-[5px]">
              <div
                className={classNames({
                  "flex gap-x-[8px]": true,
                  "w-fit translate-x-[-4px] rounded-[4px] border-[2px] p-[4px] transition duration-200":
                    mainProduct?.attributes?.[0]?.options,
                  "border-transparent":
                    mainProduct?.attributes?.[0]?.options &&
                    !showSelectWeightMsg,
                  "border-red":
                    mainProduct?.attributes?.[0]?.options &&
                    showSelectWeightMsg,
                })}
              >
                <CartFeaturedProductAttributes
                  variation={weight}
                  cartItems={cartItems}
                  mainProduct={mainProduct}
                  showSelectWeightMsg={showSelectWeightMsg}
                  insulin05ml={hasInsulin05}
                  insulin1ml={hasInsulin1}
                  handleVariationChange={handleVariationChange}
                />
              </div>
              {mainProduct?.attributes?.[0]?.options && (
                <div
                  className={classNames({
                    "pointer-events-none text-[12px] font-bold leading-[12.19px] text-red opacity-0 transition duration-200":
                      true,
                    "pointer-events-auto !opacity-100": showSelectWeightMsg,
                  })}
                >
                  Select weight
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <p className="font-D16px-M14px text-darkgray">
              ${mainProduct.price} USD
            </p>
            {showSpinner ? (
              <div className="mr-[16px] flex h-[25px] w-[25px] items-center justify-center sm:mr-[8px] sm:h-[33px] sm:w-[33px]">
                <Spinner widthHeight="h-[20px] w-[20px]" />
              </div>
            ) : (
              <div
                ref={addToCartRef}
                className={classNames({
                  "group relative flex h-[41px] w-[41px] cursor-pointer select-none items-center justify-center rounded-[7px] bg-[#f0f0f0] transition duration-200 hover:bg-[#9A9A9F] dark:bg-transparent":
                    true,
                  "!cursor-not-allowed": isProductInCart,
                })}
                onClick={onAddToCartClick}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4979 7.99609C11.4979 6.0631 13.0649 4.49609 14.9979 4.49609H16.9541C18.8871 4.49609 20.4541 6.0631 20.4541 7.99609V10.4963H11.4979V7.99609ZM10.4979 11.4963V11.6833C10.2324 11.8633 10.0575 12.1707 10.0575 12.5197C10.0575 13.0743 10.4991 13.5239 11.0439 13.5239C11.5886 13.5239 12.0303 13.0743 12.0303 12.5197C12.0303 12.1318 11.8142 11.7953 11.4979 11.6281V11.4963H20.4541V11.6286C20.1383 11.796 19.9227 12.1322 19.9227 12.5197C19.9227 13.0743 20.3643 13.5239 20.9091 13.5239C21.4539 13.5239 21.8955 13.0743 21.8955 12.5197C21.8955 12.1703 21.7201 11.8625 21.4541 11.6827V11.4963H23.0547C23.7801 11.4963 24.4016 12.0155 24.5307 12.7294L26.8952 25.8048C27.0617 26.7252 26.3545 27.5718 25.4192 27.5718H6.53392C5.59864 27.5718 4.89143 26.7252 5.05786 25.8048L7.42236 12.7294C7.55146 12.0155 8.17295 11.4963 8.89842 11.4963H10.4979ZM10.4979 10.4963V7.99609C10.4979 5.51081 12.5126 3.49609 14.9979 3.49609H16.9541C19.4394 3.49609 21.4541 5.51081 21.4541 7.99609V10.4963H23.0547C24.2638 10.4963 25.2996 11.3616 25.5148 12.5515L27.8793 25.6269C28.1567 27.1608 26.978 28.5718 25.4192 28.5718H6.53392C4.97513 28.5718 3.79643 27.1608 4.07382 25.6269L6.43832 12.5515C6.65348 11.3616 7.68931 10.4963 8.89842 10.4963H10.4979Z"
                    fill="#9A9A9F"
                    className="transition duration-300 group-hover:fill-gray4"
                  />
                </svg>
                {isProductInCart && (
                  <Tooltip
                    text="Already in cart"
                    pointerSide="right"
                    customClass={classNames({
                      "top-[10px] sm:top-[11px] left-[-120px] scale-[.7] translate-x-[30px] group-hover:translate-x-[0] group-hover:scale-[1] opacity-0 transition duration-150 group-hover:opacity-100":
                        true,
                    })}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartFeaturedProduct;
