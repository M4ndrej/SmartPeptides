"use client";

import { addToCart } from "@/app/actions/cart/add/actions";
import CartIcon from "@/components/Icons/CartIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import SelectTooltip from "@/components/SelectTooltip/SelectTooltip";
import Spinner from "@/components/SvgComponents/Spinner";
import Tooltip from "@/components/Tooltip/Tooltip";
import { TOGGLE_CART_MODAL, UPDATE_MEGA_MENU } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import { analyticsAddToCartEvent } from "@/helpers/analytics_place_order";
import { ProductNew, Variation } from "@/types/product";
import classNames from "classnames";
import { forwardRef, useMemo } from "react";
import { mutate } from "swr";

type AddToCartButtonProps = {
  viewMode: string;
  selectVariationActive?: boolean;
  variation: string | undefined;
  product: ProductNew | Variation;
  hasVariations?: boolean;
  productIsInCart?: boolean;
  addingToCart?: boolean;
  hideSelectWeightTooltip?: boolean;
  onClick: () => void;
  setAddingToCart: (addToCart: boolean) => void;
  closeSidepopover?: () => void;
  section?: string;
};

const AddToCartButton = forwardRef<HTMLDivElement, AddToCartButtonProps>(
  (
    {
      viewMode,
      selectVariationActive,
      variation,
      product,
      hasVariations,
      productIsInCart,
      addingToCart,
      hideSelectWeightTooltip,
      onClick,
      setAddingToCart,
      closeSidepopover,
      section,
    },
    ref
  ) => {
    const inStock = product.in_stock;

    const tooltipText = useMemo(() => {
      if (!inStock) return "Not in stock";
      if (productIsInCart) return "Already in cart";
      return "Add to cart";
    }, [inStock, productIsInCart]);

    const appContext: any = useThemeContext();

    const handleAddToCartAction = async () => {
      setAddingToCart(true);
      if (
        (variation ||
          ("variations" in product && !product.variations.length)) &&
        !productIsInCart &&
        inStock
      ) {
        const addToCartResult = await addToCart([
          {
            product_id: product.id.toString(),
            quantity: 1,
          },
        ]);

        if (
          section === "slider" ||
          section === "mega-menu" ||
          section === "search"
        ) {
          closeSidepopover && closeSidepopover();
        }

        appContext.dispatch({
          type: UPDATE_MEGA_MENU,
          payload: {
            productAddedToCart: true,
          },
        });

        if (
          section === "slider" ||
          section === "mega-menu" ||
          section === "search"
        ) {
          setTimeout(() => {
            appContext.dispatch({
              type: TOGGLE_CART_MODAL,
              payload: { showCartModal: true },
            });

            appContext.dispatch({
              type: UPDATE_MEGA_MENU,
              payload: {
                productAddedToCart: false,
              },
            });
          }, 600);
        } else {
          appContext.dispatch({
            type: TOGGLE_CART_MODAL,
            payload: { showCartModal: true },
          });
        }

        mutate("/api/cart/get_cart", {
          cart: addToCartResult.success?.cart?.data,
          loggedUser: "success",
        });

        analyticsAddToCartEvent(
          +product.price,
          addToCartResult.success?.cart?.data?.items
        );
      } else if (!productIsInCart && inStock) {
        onClick?.();
      }

      setAddingToCart(false);
    };

    return (
      <div
        className={classNames({
          "group/cart cart-img-btn absolute right-[16px] top-[-19px] sm:right-[8px]":
            true,
          "group/variation-select bg-white": !variation,
          "!cursor-not-allowed": productIsInCart || !inStock,
          hidden: viewMode === "rows" && section !== "mega-menu",
          //group/variation-select is only for showing tooltip when variation isnt selected
        })}
      >
        {/* Tooltip */}
        {hasVariations &&
        !variation &&
        !productIsInCart &&
        !hideSelectWeightTooltip ? (
          <SelectTooltip
            className="group-hover/variation-select:scale-[1] group-hover/variation-select:opacity-100"
            selectVariationActive={selectVariationActive}
            text="SELECT WEIGHT"
          />
        ) : (
          <Tooltip
            text={tooltipText}
            pointerSide="right"
            customClass={classNames({
              "top-[9px] sm:top-[6px] scale-[.7] translate-x-[30px] group-hover/cart:translate-x-[0] group-hover/cart:scale-[1] opacity-0 transition duration-150 group-hover/cart:opacity-100":
                true,
              "left-[-97px] ": !productIsInCart,
              "left-[-120px]": productIsInCart,
            })}
          />
        )}

        <div
          ref={ref}
          onClick={handleAddToCartAction}
          className={classNames({
            "cart-img-btn ease-[cubic-bezier(0.11, 0, 0.5, 0)] select-none bg-[#9A9A9F] transition duration-200 ":
              true,
            "group-hover/cart:bg-textWhite":
              !variation && hasVariations && !hideSelectWeightTooltip,
            "group-hover/cart:!bg-[#9A9A9F]":
              variation || hideSelectWeightTooltip,
            "group-hover/cart:z-[3]": !selectVariationActive,
            "group-hover/cart:bg-[#9A9A9F]": !hasVariations,
            "!cursor-not-allowed hover:!bg-[#9A9A9F]":
              productIsInCart || !inStock,
            "z-[99999999991] bg-textWhite ":
              selectVariationActive && !hideSelectWeightTooltip,
          })}
        >
          {addingToCart ? (
            <Spinner
              reverseColors
              widthHeight="h-[24px] w-[24px] mr-[1px] ml-[1px] mt-[10px] mb-[10px] sm:h-[19px] sm:w-[19px]"
            />
          ) : (
            <div>
              <div
                className={classNames(
                  "flex items-center justify-center",
                  selectVariationActive && !hideSelectWeightTooltip && "hidden",
                  !variation &&
                    !hideSelectWeightTooltip &&
                    "group-hover/cart:hidden",
                  !hasVariations && "group-hover/cart:!block"
                )}
              >
                <CartIcon className="sm:h-[32px] sm:w-[32px]" />
              </div>
              {!hideSelectWeightTooltip && (
                <div
                  className={classNames(
                    !selectVariationActive && "hidden",
                    !variation && "group-hover/cart:block",
                    !hasVariations && "!hidden"
                  )}
                >
                  <PlusIcon
                    className={classNames(
                      "transition duration-200",
                      selectVariationActive && "group-hover/cart:rotate-[45deg]"
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AddToCartButton.displayName = "AddToCartButton";

export default AddToCartButton;
