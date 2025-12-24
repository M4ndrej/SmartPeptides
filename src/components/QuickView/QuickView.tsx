"use client";

import { addToCart } from "@/app/actions/cart/add/actions";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { ThemeContext } from "@/context/theme-provider";
import { analyticsAddToCartEvent } from "@/helpers/analytics_place_order";
import { fetcher } from "@/helpers/fetchers";
import useScreenSize from "@/hooks/useScreenSize";
import { CartResponse } from "@/types/cart_types";
import { ProductNew, SelectedAttributes, Variation } from "@/types/product";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import Disclaimer from "../Disclaimer/Disclaimer";
import SemaglutideName from "../Icons/SemaglutideName";
import TirzName from "../Icons/TirzName";
import AuthorizedImage from "../Image/Image";
import MerchCare from "../MerchProductWidgets/MerchCare";
import MerchDescription from "../MerchProductWidgets/MerchDescription";
import MerchGarment from "../MerchProductWidgets/MerchGarment";
import MerchQuality from "../MerchProductWidgets/MerchQuality";
import MerchShortDescription from "../MerchProductWidgets/MerchShortDescription";
import MerchVariationPicker from "../MerchProductWidgets/MerchVariationPicker";
import ProductFormDisclaimer from "../ProductFormDisclaimer/ProductFormDisclaimer";
import InsideScroll from "../Scroll/InsideScroll";
import SidebarMobileHeader from "../SidebarMobileHeader/SidebarMobileHeader";
import SingleProductDiscountDisclaimer from "../SingleProductWidgets/SingleProductDiscountDisclaimer";
import SingleProductPriceRange from "../SingleProductWidgets/SingleProductPriceRange";
import SingleProductSinglePrice from "../SingleProductWidgets/SingleProductSinglePrice";
import SingleProductStaticActionButtons from "../SingleProductWidgets/SingleProductStaticActionButtons";
import SingleProductVariationPicker from "../SingleProductWidgets/SingleProductVariationPicker";
import Spinner from "../SvgComponents/Spinner";

interface QuickViewProps {
  productId?: number;
  closePopover?: any;
}

const QuickView: FC<QuickViewProps> = ({ productId, closePopover }) => {
  const { width } = useScreenSize();

  const { data: mainProduct, isLoading } = useSWR<ProductNew>(
    `/api/products/${productId}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const appContext: any = useContext(ThemeContext);
  const router = useRouter();

  const addToCartButton = useRef<HTMLButtonElement>(null);
  const [hasOverlay, setHasOverlay] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>([]);

  const selectedVariation = useMemo(() => {
    if (selectedAttributes.length === 0) return undefined;
    return mainProduct?.variations.find((variation) => {
      return variation.attributes.every((varAttr) => {
        const selAttr = selectedAttributes.find((a) => a.name === varAttr.name);
        return varAttr.option === selAttr?.option;
      });
    });
  }, [mainProduct, selectedAttributes]);

  const productToShow = selectedVariation || mainProduct;

  const isMerch = useMemo(
    () => mainProduct?.categories.some((c) => c.slug === "merch"),
    [mainProduct]
  );

  const isGift = useMemo(() => {
    const hasGift = cartData?.cart?.items?.find((item) => !!item?.is_gift_item);
    return !hasGift && isMerch && +(cartData?.cart?.total ?? 0) > 50000;
  }, [isMerch, cartData]);

  const hasPartedImage = [56798, 56914].includes(mainProduct?.id ?? 0);

  const productImages = useMemo(
    () => selectedVariation?.image ?? mainProduct?.images,
    [selectedVariation, mainProduct]
  );

  const weightOrVolume = useMemo(() => {
    if (!mainProduct?.attributes.length) return "";
    return mainProduct?.attributes?.[0]?.name;
  }, [mainProduct]);

  useEffect(() => {
    if (mainProduct) {
      // setSelectedAttributes(mainProduct?.variations?.[0]?.attributes ?? []);
    }
  }, [mainProduct]);

  const handleSelectAttribute = (name: string, val: string) => {
    const attr = mainProduct?.attributes.find((a) => a.name === name);
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

    if (hasOverlay) {
      setHasOverlay(false);
      setTimeout(() => {
        addToCartButton.current?.click();
      }, 500);
    }
  };

  const handleChangeVariation = (variation: Variation) => {
    setSelectedAttributes(variation.attributes);
  };

  const removeLastEmptyParagraph = (htmlString: string) => {
    const paragraphs = htmlString.match(/<p>(.*?)<\/p>/g);

    if (paragraphs && paragraphs.length > 1) {
      const secondToLastIndex = paragraphs.length - 2;

      if (/^<p>(\s|&nbsp;)*<\/p>$/.test(paragraphs[secondToLastIndex])) {
        paragraphs.splice(secondToLastIndex, 1);
      }

      return paragraphs.join("");
    }

    return htmlString;
  };

  const handleQuantatyChange = async (quantity: number) => {
    if (quantity) setProductQuantity(quantity);
  };

  const handleAddToCartAction = async (
    product: ProductNew | Variation,
    redirect?: boolean
  ) => {
    if (!selectedVariation && (mainProduct?.variations?.length ?? 0) > 0) {
      return setHasOverlay(true);
    }

    const addToCartProduct = product || mainProduct;
    const addToCartResult = await addToCart([
      {
        product_id: addToCartProduct.id.toString(),
        quantity: productQuantity,
      },
    ]);

    if (!addToCartResult.success) return;
    if (redirect) return router.push("/payment");
    closePopover();
    setTimeout(() => {
      appContext.dispatch({
        type: TOGGLE_CART_MODAL,
        payload: { showCartModal: true },
      });
    }, 500);
    await mutate("/api/cart/get_cart", {
      cart: addToCartResult.success.cart.data,
      loggedUser: "success",
    });
    analyticsAddToCartEvent(
      +addToCartProduct.price,
      addToCartResult.success.cart.data.items
    );
  };

  return (
    <div
      className={classNames({
        "w-[566px] overflow-auto sm:!w-full": true,
      })}
    >
      <InsideScroll className="h-[100dvh]">
        <>
          {!productToShow || !mainProduct || isLoading ? (
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Spinner widthHeight="h-10 w-10" customClass="!mr-0" />
            </div>
          ) : (
            <>
              <div className="hidden h-[40px] w-full bg-transparent sm:block"></div>
              <div className="flex w-full flex-col justify-center pb-[32px] pr-[32px] pt-[32px] sm:pb-0 sm:pr-[10px] sm:pt-0">
                <SidebarMobileHeader
                  closeBtnAction={() => closePopover()}
                  hideUnderline
                  customCloseBtnClass="!top-[40px]"
                  additionalParentClass="sm:pb-[24px]"
                />
                <div className="flex !h-[364px] w-full bg-lightgray ">
                  {hasPartedImage ? (
                    <div className="relative flex w-full items-center justify-center gap-0">
                      <div
                        className={`flex w-full max-w-[330px] items-center justify-center ${mainProduct.id === 56798 ? "scale-[1.1] sm:scale-[1.07]" : "scale-[0.95] sm:scale-[1.15]"}`}
                      >
                        {productImages?.[1]?.src && (
                          <AuthorizedImage
                            className="object-fit flex h-full w-[165px] select-none"
                            src={productImages?.[1]?.src}
                            width={250}
                            height={700}
                            alt={productImages?.[1]?.alt}
                          />
                        )}
                        {productImages?.[2]?.src && (
                          <AuthorizedImage
                            className="object-fit flex h-full w-[165px] select-none"
                            src={productImages?.[2]?.src}
                            width={250}
                            height={700}
                            alt={productImages?.[2]?.alt}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <AuthorizedImage
                      className="flex w-full select-none object-contain sm:!h-full sm:!w-full"
                      src={productImages?.[0]?.src!}
                      width={500}
                      height={700}
                      alt={productImages?.[0]?.alt!}
                    />
                  )}
                </div>
                <div className="flex-1">
                  {/* Product name */}
                  <div className="mt-[16px] flex items-center justify-between sm:flex-col sm:items-start">
                    <div className="font-D32px-M18px font-bold">
                      {mainProduct.id === 56798 && (
                        <SemaglutideName
                          fontSize={width > 767 ? 32 : 24}
                          fontWeight="bold"
                          hasHover={false}
                        />
                      )}
                      {mainProduct.id === 56914 && (
                        <TirzName
                          fontSize={width > 767 ? 32 : 24}
                          fontWeight="bold"
                          hasHover={false}
                          fillOpacity={0.8}
                        />
                      )}
                      {![56798, 56914].includes(mainProduct.id) &&
                        mainProduct.name}
                    </div>
                  </div>

                  {/* Designed by Voiceart and Merch message */}
                  {isMerch && (
                    <span className="mt-2">
                      {mainProduct.name} designed and sold by{" "}
                      <Image
                        src={"/images/voiceartLogo.svg"}
                        width={96}
                        height={25}
                        alt={"Voiceart Logo"}
                        className={`inline`}
                      />
                    </span>
                  )}

                  {isMerch && (
                    <MerchShortDescription
                      description={mainProduct.short_description}
                    />
                  )}

                  {/* Product price */}
                  {mainProduct?.variations.length === 0 || isMerch ? (
                    <div className="mt-[16px]">
                      <SingleProductSinglePrice product={productToShow} />
                    </div>
                  ) : (
                    <SingleProductPriceRange mainProduct={mainProduct} />
                  )}

                  {isMerch ? (
                    <p className="font-D14px-M13px mb-6 mt-2 font-bold text-[#E7461E]">
                      *PURCHASING MERCH PRODUCTS MAY DELAY ENTIRE ORDER BY
                      ADDITIONAL 24H*
                    </p>
                  ) : (
                    <>
                      {/* Discount Disclaimer */}
                      <SingleProductDiscountDisclaimer />

                      {/* Product description */}
                      <div
                        className="font-D16px-M13px quickview-description mt-[24px]"
                        dangerouslySetInnerHTML={{
                          __html: removeLastEmptyParagraph(
                            mainProduct?.short_description || ""
                          ),
                        }}
                      />

                      {/* Injectable or topical product disclaimer */}
                      <div className="mb-[24px] mt-[24px]">
                        <ProductFormDisclaimer mainProduct={mainProduct!} />
                      </div>
                    </>
                  )}

                  {isMerch && (
                    <MerchVariationPicker
                      mainProduct={mainProduct}
                      selectedAttributes={selectedAttributes}
                      handleSelectAttribute={handleSelectAttribute}
                      selectedVariation={selectedVariation}
                      handleChangeVariation={handleChangeVariation}
                      hasOverlay={hasOverlay}
                      setHasOverlay={setHasOverlay}
                      redBorder={true}
                    />
                  )}
                  {!isMerch && (mainProduct?.variations?.length ?? 0) > 1 && (
                    <SingleProductVariationPicker
                      weightOrVolume={weightOrVolume}
                      mainProduct={mainProduct}
                      selectedAttributes={selectedAttributes}
                      handleSelectAttribute={handleSelectAttribute}
                      hasOverlay={hasOverlay}
                      redBorder={true}
                    />
                  )}

                  {/* Product price for each variation */}
                  {/* {!isMerch && (mainProduct?.variations?.length || 0) > 0 && ( */}
                  {!isMerch && selectedVariation && (
                    <div className="mt-[16px]">
                      <SingleProductSinglePrice product={productToShow} />
                    </div>
                  )}

                  {/* Static action buttons for adding to cart, buy now and quantity change for desktop and tablet devices */}
                  <div className="mt-[24px] w-full">
                    <SingleProductStaticActionButtons
                      productQuantity={productQuantity}
                      handleQuantatyChange={handleQuantatyChange}
                      product={productToShow}
                      // disabled={
                      //   !selectedVariation &&
                      //   mainProduct.variations.length > 0
                      // }
                      handleAddToCartAction={handleAddToCartAction}
                      type="quickview"
                      isGift={isGift}
                      addToCartRef={addToCartButton}
                    />
                  </div>

                  {isMerch ? (
                    <div className="sm:pb-[40px]">
                      {/* General product disclaimer */}
                      <div className="mt-[24px]">
                        <MerchGarment />
                      </div>

                      {/* Product description */}
                      <div className="mt-[24px]">
                        <MerchDescription
                          description={mainProduct.description}
                        />
                      </div>

                      {/* Printing Quality */}
                      <div className="mt-[24px]">
                        <MerchQuality />
                      </div>

                      {/* Merch Care */}
                      <div className="mt-[24px]">
                        <MerchCare />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-[24px] sm:pb-[40px]">
                      <Disclaimer expand={true} />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      </InsideScroll>
    </div>
  );
};

export default QuickView;
``;
