import { useThemeContext } from "@/context/theme-provider";
import { fetcher } from "@/helpers/fetchers";
import { renderLabel } from "@/helpers/product_helper";
import { replaceLinks } from "@/helpers/replace_links_helper";
import useIsClientRender from "@/hooks/useIsClientRender";
import { CartItemContext, CartResponse } from "@/types/cart_types";
import { ProductNew, SelectedAttributes, Variation } from "@/types/product";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useSWR from "swr";
import Button from "../Button/Button";
import QuickviewIcon from "../Icons/QuickviewIcon";
import ProductLabel from "../ProductLabel/ProductLabel";
import SidePopover from "../SidePopover/SidePopover";
import AddToCartButton from "./ProductCardContent/AddToCartButton";
import MerchModalButton from "./ProductCardContent/MerchModalButton";
import ProductCardImage from "./ProductCardContent/ProductCardImage";
import ProductCardName from "./ProductCardContent/ProductCardName";
import ProductCardPrice from "./ProductCardContent/ProductCardPrice";
import ProductCardWeight from "./ProductCardContent/ProductCardWeight";
import QuickViewButton from "./ProductCardContent/QuickViewButton";
import WishlistButton from "./ProductCardContent/WishlistButton";

interface ProductCardProps {
  mainProduct: ProductNew;
  fixedGridMode?: string;
  searchTerm?: string;
  section?: string;
  activeCategory?: string;
  showLabel?: boolean;
  hideQuickviewAndWishlist?: boolean;
  hideLastItemInList?: boolean;
  selectFirstVariation?: boolean;
  hideSelectWeightTooltip?: boolean;
  overlayOpened?: boolean;
  toggleOverlay?: () => void;
  closeSidebar?: () => void;
  isMegaMenuMobile?: boolean;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  mainProduct,
  fixedGridMode,
  searchTerm,
  section,
  activeCategory,
  showLabel,
  hideQuickviewAndWishlist,
  hideLastItemInList,
  selectFirstVariation,
  hideSelectWeightTooltip,
  overlayOpened,
  toggleOverlay,
  closeSidebar,
  isMegaMenuMobile,
  setIsMearchModalOpen,
}) => {
  const router = useRouter();
  const isClient = useIsClientRender();
  const appContext: any = useThemeContext();
  const { viewMode, cartItems } = appContext.state;
  const productViewMode = fixedGridMode || viewMode;

  const addToCartRef = useRef<HTMLDivElement>(null);

  const [popoverType, setPopoverType] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [selectVariationActive, setSelectVariationActive] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>(
      selectFirstVariation ? mainProduct.variations[0].attributes : []
    );

  const selectedVariation = useMemo(() => {
    if (selectedAttributes.length === 0) return undefined;
    return mainProduct.variations.find((variation) => {
      return variation.attributes.every((varAttr) => {
        const selAttr = selectedAttributes.find((a) => a.name === varAttr.name);
        return varAttr.option === selAttr?.option;
      });
    });
  }, [mainProduct, selectedAttributes]);

  const productLabel = useMemo(
    () => (showLabel ? renderLabel(mainProduct) : ""),
    [mainProduct, showLabel]
  );

  const isMerch = useMemo(
    () => mainProduct.categories.some((c) => c.slug === "merch"),
    [mainProduct]
  );

  const isGift = useMemo(() => {
    const hasGift = cartData?.cart?.items?.find((item) => !!item?.is_gift_item);
    return !hasGift && isMerch && +(cartData?.cart?.total ?? 0) > 50000;
  }, [isMerch, cartData]);

  const weightOrVolume = useMemo(() => {
    if (!mainProduct.attributes.length) return "";
    return mainProduct.attributes[0].name;
  }, [mainProduct]);

  const isProductInCart = useMemo(() => {
    const productId = selectedVariation?.id || mainProduct.id;
    return (
      (cartItems as CartItemContext[])?.findIndex(
        (item) => item.id == productId
      ) > -1
    );
  }, [selectedVariation, cartItems, mainProduct]);

  useEffect(() => {
    if (!overlayOpened) setSelectVariationActive(false);
  }, [overlayOpened]);

  const handlePopoverAction = (open: boolean, type: string, product: any) => {
    setPopoverOpened(open);
    setPopoverType(type);
    setActiveProduct(product);
  };

  const addToCart = () => {
    addToCartRef.current?.click();
  };

  const handleSelectAttribute = (name: string, val: string) => {
    const attr = mainProduct.attributes.find((a) => a.name === name);
    setSelectedAttributes((prev) => {
      const selectedAttr = prev.find((a) => a.name === name);
      if (selectedAttr) {
        if (selectedAttr.option === val) {
          return prev.filter((a) => a.name !== name);
        }
        return prev.map((a) =>
          a.name === name ? { id: attr?.id ?? 0, name, option: val } : a
        );
      }
      return [...prev, { id: attr?.id ?? 0, name, option: val }];
    });

    if (selectVariationActive) {
      toggleOverlay?.();
      setSelectVariationActive(false);
      // If variation is selected from pick then add it to cart
      setTimeout(() => {
        addToCart();
      }, 500);
    }
  };

  const handleChangeVariation = (variation: Variation) => {
    setSelectedAttributes(variation.attributes);

    if (selectVariationActive) {
      toggleOverlay?.();
      setSelectVariationActive(false);
      // If variation is selected from pick then add it to cart
      setTimeout(() => {
        addToCart();
      }, 500);
    }
  };

  const handleOverlay = () => {
    toggleOverlay?.();
    setSelectVariationActive((prev) => !prev);
  };

  const onNavigate = (slug: string) => {
    closeSidebar?.();
    router.push(slug);
  };

  return (
    <>
      <div
        className={classNames(
          "flex",
          (viewMode === "rows" || productViewMode === "rows") &&
            "flex-row items-center pl-[16px] xl:pl-0",
          (viewMode !== "rows" ||
            productViewMode !== "rows" ||
            section === "mega-menu" ||
            section === "search") &&
            "flex-col",
          (section === "mega-menu" || section === "search") && "!items-start",
          hideLastItemInList && "last:hidden xl:!flex"
        )}
      >
        <div
          className={classNames(
            "relative overflow-hidden",
            productViewMode === "rows" &&
              section !== "mega-menu" &&
              section !== "search" &&
              "md:min-w-[255px] lg:!min-w-[288px]",
            (section === "mega-menu" || section === "search") && "w-full "
          )}
        >
          {productLabel && (
            <div className="absolute left-0 top-[16px] !z-[1]">
              <ProductLabel type={productLabel} />
            </div>
          )}

          <ProductCardImage
            mainProduct={mainProduct}
            selectedVariation={selectedVariation}
            viewMode={productViewMode}
            section={section}
            activeCategory={activeCategory}
            onNavigate={onNavigate}
            isMerch={isMerch}
          />

          {/* Wishlist button */}
          {viewMode !== "rows" &&
            section !== "mega-menu" &&
            section !== "search" &&
            !hideQuickviewAndWishlist && (
              <WishlistButton productId={mainProduct.id} viewMode={viewMode} />
            )}

          {/* Qucikview bytton */}
          {section !== "mega-menu" &&
            section !== "search" &&
            !hideQuickviewAndWishlist && (
              <QuickViewButton
                viewMode={viewMode}
                onPress={() =>
                  handlePopoverAction(true, "quickview", mainProduct)
                }
              />
            )}
        </div>
        <div className="relative w-full">
          {/* Add to cart button */}
          {!isMerch ? (
            <AddToCartButton
              ref={addToCartRef}
              setAddingToCart={setAddingToCart}
              addingToCart={addingToCart}
              product={selectedVariation || mainProduct}
              onClick={handleOverlay}
              variation={
                selectedAttributes.find((a) => a.name === weightOrVolume)
                  ?.option
              }
              viewMode={productViewMode}
              selectVariationActive={selectVariationActive}
              hasVariations={mainProduct.variations.length > 1}
              productIsInCart={isProductInCart}
              hideSelectWeightTooltip={hideSelectWeightTooltip}
              closeSidepopover={closeSidebar}
              section={section}
            />
          ) : (
            <MerchModalButton
              ref={addToCartRef}
              mainProduct={mainProduct}
              selectedVariation={selectedVariation}
              selectVariationActive={selectVariationActive}
              selectedAttributes={selectedAttributes}
              handleSelectAttribute={handleSelectAttribute}
              hideSelectTooltip={hideSelectWeightTooltip}
              productIsInCart={isProductInCart}
              closeSidepopover={closeSidebar}
              viewMode={productViewMode}
              section={section}
              isGift={isGift}
              handleChangeVariation={handleChangeVariation}
              setIsMearchModalOpen={setIsMearchModalOpen}
            />
          )}

          {/* Product information */}
          <div
            className={classNames(
              "mt-[20px] flex flex-col",
              (productViewMode !== "rows" ||
                section === "mega-menu" ||
                section === "search") &&
                "gap-[4px] px-[16px] sm:px-[10px] xl:px-0",
              productViewMode === "rows" &&
                section !== "mega-menu" &&
                section !== "search" &&
                "ml-[16px] mt-0 gap-[8px] px-0",
              productViewMode === "rows" && "!mt-0",
              productViewMode === "rows" &&
                (section === "mega-menu" || section === "search") &&
                "!mt-[20px]"
            )}
          >
            <ProductCardName
              mainProduct={mainProduct}
              searchTerm={searchTerm}
              section={section}
              onNavigate={onNavigate}
              isMegaMenuMobile={isMegaMenuMobile}
            />
            <div
              className={classNames(
                "flex",
                (productViewMode !== "rows" ||
                  section === "mega-menu" ||
                  section === "search") &&
                  "items-center justify-between gap-[4px] sm:flex-col sm:items-start md:flex-col md:items-start lg:flex-col lg:items-start",
                (section === "mega-menu" || section === "search") &&
                  "flex !flex-col !items-start",
                (productViewMode === "rows" ||
                  (productViewMode === "5x5" &&
                    section !== "ourProducts" &&
                    section !== "slider")) &&
                  "flex-col !items-start",
                section === "slider" && "mb-[26px]",
                section === "search" && "mb-0 !flex !flex-row !items-start"
              )}
            >
              {/* Price */}
              {!isGift && (
                <ProductCardPrice
                  mainProduct={mainProduct}
                  selectedVariation={selectedVariation}
                  viewMode={productViewMode}
                  section={section}
                  isMegaMenuMobile={isMegaMenuMobile}
                />
              )}

              {/* Weight Variations buttons */}
              {!isMerch && mainProduct?.attributes?.[0]?.options.length > 1 && (
                <ProductCardWeight
                  mainProduct={mainProduct}
                  selectVariationActive={selectVariationActive}
                  selectFirstVariation={selectFirstVariation}
                  toggleOverlay={toggleOverlay}
                  viewMode={productViewMode}
                  section={section}
                  selectedWeight={
                    selectedAttributes.find((a) => a.name === weightOrVolume)
                      ?.option
                  }
                  handleSelectWeight={(val) =>
                    handleSelectAttribute(weightOrVolume, val)
                  }
                  isMegaMenuMobile={isMegaMenuMobile}
                />
              )}
            </div>

            {/* FOR LIST VIEW PRODUCT */}
            {!isMerch &&
              productViewMode === "rows" &&
              section !== "mega-menu" &&
              section !== "search" && (
                <div
                  className={classNames(
                    "mt-[2px]"
                    // hidden:
                    //   productViewMode !== "rows" || section === "mega-menu",
                  )}
                >
                  {/* Disclaimer for not being able to send */}
                  {/* <p className=" lgfont-16px-ALL text-red">
                    This product can not be shipped to United Kingdom for PayPal
                    customers
                  </p> */}
                  {/* Short product description */}
                  <p
                    className="font-16px-ALL product-short-desc mt-[16px] line-clamp-5 pr-[16px] xl:pr-0"
                    dangerouslySetInnerHTML={{
                      __html: isClient
                        ? replaceLinks(mainProduct.short_description)
                        : "",
                    }}
                  />
                  {/* List product buttons */}
                  <div className="mt-[24px] flex items-center gap-[24px] md:gap-[16px]">
                    {/* Cart btn */}
                    <Button
                      showSpinerOutside={addingToCart}
                      showSpiner={true}
                      onPress={async () => addToCart()}
                      text="ADD TO CART"
                      disabled={!mainProduct.in_stock}
                    />
                    {/* Quickview btn */}
                    <div
                      onClick={() =>
                        handlePopoverAction(true, "quickview", mainProduct)
                      }
                      className="group/quickView font-16px-ALL blue-color-hover text flex cursor-pointer select-none items-center gap-[8px] whitespace-nowrap text-gray2"
                    >
                      {" "}
                      <QuickviewIcon customClass="w-[32px] h-[32px] [&_path]:stroke-gray2 [&_circle]:stroke-gray2 [&_path]:group-hover/quickView:stroke-[#333333] [&_circle]:group-hover/quickView:stroke-[#333333]" />{" "}
                      QUICK VIEW
                    </div>
                    {/* Wishlist btn */}
                    <WishlistButton
                      productId={mainProduct.id}
                      viewMode={productViewMode}
                      listView
                    />
                  </div>
                </div>
              )}
          </div>
        </div>
        {isClient &&
          createPortal(
            <SidePopover
              popoverOpened={popoverOpened}
              type={popoverType}
              fromTop={false}
              activeProduct={activeProduct!}
              onClose={() => {
                setPopoverOpened(false);
              }}
            />,
            document.body
          )}
      </div>
    </>
  );
};

export default ProductCard;
