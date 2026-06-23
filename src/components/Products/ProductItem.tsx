"use client";
import { addToCart } from "@/app/actions/cart/add/actions";
import Shipping from "@/components/Shipping/Shipping";
import { useRecentlyViewedProducts } from "@/context/RecentlyViewedProductsContext";
import { TOGGLE_CART_MODAL, UPDATE_CURRENT_ROUTE } from "@/context/constants";
import { ThemeContext, useThemeContext } from "@/context/theme-provider";
import { pages } from "@/data/pages_data";
import { analyticsAddToCartEvent } from "@/helpers/analytics_place_order";
import { fetcher } from "@/helpers/fetchers";
import { replaceLinks } from "@/helpers/replace_links_helper";
import useIsClientRender from "@/hooks/useIsClientRender";
import useScreenSize from "@/hooks/useScreenSize";
import { CartResponse } from "@/types/cart_types";
import { ProductNew, SelectedAttributes, Variation } from "@/types/product";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import useSWR, { mutate } from "swr";
import Disclaimer from "../Disclaimer/Disclaimer";
import SemaglutideName from "../Icons/SemaglutideName";
import MerchCare from "../MerchProductWidgets/MerchCare";
import MerchDescription from "../MerchProductWidgets/MerchDescription";
import MerchGarment from "../MerchProductWidgets/MerchGarment";
import MerchQuality from "../MerchProductWidgets/MerchQuality";
import MerchShortDescription from "../MerchProductWidgets/MerchShortDescription";
import MerchVariationPicker from "../MerchProductWidgets/MerchVariationPicker";
import Overlay from "../Overlay/Overlay";
import PeptidesList from "../PeptidesList/PeptidesList";
import ProductFormDisclaimer from "../ProductFormDisclaimer/ProductFormDisclaimer";
import ShareButtons from "../ShareButtons/ShareButtons";
import SingleProductDiscountDisclaimer from "../SingleProductWidgets/SingleProductDiscountDisclaimer";
import SingleProductMainDescription from "../SingleProductWidgets/SingleProductMainDescription";
import SingleProductPriceRange from "../SingleProductWidgets/SingleProductPriceRange";
import SingleProductShippingInfo from "../SingleProductWidgets/SingleProductShippingInfo";
import SingleProductSinglePrice from "../SingleProductWidgets/SingleProductSinglePrice";
import SingleProductStaticActionButtons from "../SingleProductWidgets/SingleProductStaticActionButtons";
import SingleProductStickyActionButtons from "../SingleProductWidgets/SingleProductStickyActionButtons";
import SingleProductSwitchButtons from "../SingleProductWidgets/SingleProductSwitchButtons";
import SingleProductTags from "../SingleProductWidgets/SingleProductTags";
import SingleProductVariationPicker from "../SingleProductWidgets/SingleProductVariationPicker";
import "./ProductItem.css";
import { ProductNavigation } from "@/app/actions/navigation/fetchProductNavigation";
import SingleProductImage from "../SingleProductWidgets/SingleProductImage";
import RelatedSlider from "../ProductSlider/RelatedSlider";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface ProductPageProps {
  relatedProducts?: ProductNew[];
  mainProduct: ProductNew;
  navigationData?: ProductNavigation;
}

const ProductPage: FC<ProductPageProps> = ({
  mainProduct,
  navigationData,
  relatedProducts,
}) => {
  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;
  const { width } = useScreenSize();

  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const router = useRouter();
  const activePath = usePathname();
  const appContext: any = useContext(ThemeContext);
  const { currentRoute } = appContext.state;
  const { addToRecentlyViewed } = useRecentlyViewedProducts();
  const addToCartButton = useRef<HTMLButtonElement>(null);
  const variationsRef = useRef<HTMLDivElement>(null);

  const [hasOverlay, setHasOverlay] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [popoverOpened, handlePopover] = useState(false);
  const [popoverType, handlePopoverType] = useState("");
  const isClient = useIsClientRender();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>([]);

  const selectedVariation = useMemo(() => {
    if (selectedAttributes.length === 0) return undefined;
    return mainProduct.variations.find((variation) => {
      return variation.attributes.every((varAttr) => {
        const selAttr = selectedAttributes.find((a) => a.name.toLowerCase() === varAttr.name.toLowerCase());
        return varAttr.option === selAttr?.option;
      });
    });
  }, [mainProduct, selectedAttributes]);

  const productToShow = selectedVariation || mainProduct;

  const hasPartedImage = [56798, 56914].includes(mainProduct.id);

  const productImages = useMemo(() => {
    let images = [...mainProduct.images];
    if (selectedVariation) {
      images[0] = selectedVariation.image[0];
      if (hasPartedImage) {
        images[1] = selectedVariation.image[1];
        images[2] = selectedVariation.image[2];
      }
    }
    if (hasPartedImage) return images.slice(0, 6);
    return images.slice(0, 4);
  }, [selectedVariation, mainProduct, hasPartedImage]);

  const productFirstImage = mainProduct.images?.[0].src.replace(
    `${process.env.NEXT_PUBLIC_APP_MAIN}`,
    `${process.env.NEXT_PUBLIC_CDN_MAIN}`
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mainProduct) addToRecentlyViewed(mainProduct);
    console.log("relatedProducts", relatedProducts);
  }, [mainProduct]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mainProduct?.id && currentRoute) {
      const activePage = "/" + activePath.split("/")[1];
      const currentPage = pages.find((page) => page.link == activePage);

      let currRoute = { ...currentRoute };
      if (!currRoute.title) currRoute = currentPage;

      const routeSub = {
        ...currRoute,
        subRoute: {
          name: mainProduct?.name,
          link: `/${mainProduct?.id}`,
        },
      };
      appContext.dispatch({
        type: UPDATE_CURRENT_ROUTE,
        payload: routeSub,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleQuantatyChange = async (quantity: number) => {
    if (quantity) setProductQuantity(quantity);
  };

  const handleAddToCartAction = async (
    product: ProductNew | Variation,
    redirect?: boolean
  ) => {
    if (!selectedVariation && mainProduct.variations.length > 0) {
      if (variationsRef?.current) {
        variationsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return setHasOverlay(true);
    }

    const addToCartProduct = product || mainProduct;
    const addToCartResult = await addToCart([
      {
        product_id: addToCartProduct.id.toString(),
        quantity: productQuantity,
      },
    ]);

    if (!addToCartResult.success || !addToCartResult.success.cart) return;
    await mutate("/api/cart/get_cart", {
      cart: addToCartResult.success.cart.data,
      loggedUser: "success",
    });
    analyticsAddToCartEvent(
      +addToCartProduct.price,
      addToCartResult.success.cart.data.items
    );

    if (redirect) {
      return router.push("/payment");
    }

    appContext.dispatch({
      type: TOGGLE_CART_MODAL,
      payload: { showCartModal: true },
    });
  };

  const handlePopoverAction = (open: boolean, type: string) => {
    const scrollBarHolder = document.querySelector(
      ".scroll-tab-holder"
    ) as HTMLElement;

    const scrollBar = document.querySelector(
      ".peptide-scroll-bar"
    ) as HTMLElement;

    const peptideScroll = document.querySelector(
      ".peptide-scroll"
    ) as HTMLElement;

    const stickyNav = document.querySelector(".sticky-nav") as HTMLElement;
    const peptidesList = document.querySelector(
      ".peptides-list"
    ) as HTMLElement;
    const prodListContainer = document.querySelector(
      ".product-list-container"
    ) as HTMLElement;
    document.body.classList.add("popover-open");
    document.body.classList.add("megaMenuOpen");
    peptideScroll.classList.add("prevent-scroll");
    scrollBarHolder?.classList.add("hide-scrollbar-holder");
    scrollBar?.classList.add("hide-scroll-bar");
    stickyNav?.classList.add("popover-open");
    peptidesList?.classList.add("popover-open");
    prodListContainer?.classList.add("popover-open");

    handlePopover(open);
    handlePopoverType(type);
  };

  const sanitizedDescription =
    mainProduct.id === 6857 // CJC product
      ? replaceLinks(mainProduct.short_description)
          .replace(/&nbsp;/g, " ")
          .trim()
      : mainProduct.short_description.replace(/&nbsp;/g, " ").trim();

  return (
    <>
      <Overlay onClose={() => setHasOverlay(false)} isOpen={hasOverlay} />
      {productToShow && (
        <div className="w-full">
          {/* Peptides list sidebar */}
          <div className="products-peptdes-list fixed left-0 top-[356px] z-[2] sm:top-[341px] md:top-[335px]">
            {/*  <PeptidesList /> */}
          </div>
          <div className="container-margin-bottom-D96px-M64px container-padding-inline m-[auto] max-w-[1264px] pt-[48px]">
            <div>
              <div className="from834:flex-items-start flex w-full max-w-full items-start sm:flex-col sm:items-center sm:justify-center md:flex-col md:items-center md:justify-center md:gap-[32px] from834:flex-row from834:items-start from834:gap-[20px] lg:gap-[20px] xl:gap-[32px]">
                {/* Switch produts buttons for mobile */}
                <SingleProductSwitchButtons
                  mainProduct={mainProduct}
                  hideDesktopSwitch={true}
                  previousProduct={navigationData?.previousProduct}
                  nextProduct={navigationData?.nextProduct}
                />

                {/* Product images carousel */}
                <div className="relative flex h-auto w-[491px] flex-col sm:w-full md:w-full from834:w-[377px] lg:min-w-[472px] xl:min-w-[491px]">
                  <SingleProductImage
                    key={mainProduct.id}
                    image={mainProduct.images[0]}
                    priority={true}
                  />
                </div>
                <div className="w-full sm:max-w-full sm:pt-[30px] md:pt-0 from834:pt-0 lg:max-w-[669px]">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start justify-between">
                      <h1
                        className="!font-D32px-M18px font-bold"
                        style={{ fontFamily: "inherit" }}
                      >
                        {mainProduct.id === 56798 ? (
                          <SemaglutideName
                            fontSize={width > 767 ? 32 : 24}
                            fontWeight="bold"
                            hasHover={false}
                          />
                        ) : (
                          mainProduct.name
                        )}
                      </h1>
                      {/* Designed by Voiceart and Merch message */}
                      {isMerch && (
                        <span className="mt-2">
                          {mainProduct.name} designed and sold by{" "}
                          <Image
                            src={
                              !isDark
                                ? "/images/voiceartLogo.svg"
                                : "/images/voiceartLogoDark.svg"
                            }
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
                      {/* Product price below main title if there is no variations of product */}
                      {(mainProduct?.variations.length === 0 || isMerch) && (
                        <div className="mt-[16px]">
                          <SingleProductSinglePrice product={productToShow} />
                        </div>
                      )}
                    </div>

                    {/* Switch produts buttons for desktop */}
                    <SingleProductSwitchButtons
                      mainProduct={mainProduct}
                      hideMobileSwitch={true}
                      previousProduct={navigationData?.previousProduct}
                      nextProduct={navigationData?.nextProduct}
                    />
                  </div>

                  {/* Product price range when there are few variations of product */}
                  {!isMerch && (
                    <SingleProductPriceRange mainProduct={mainProduct} />
                  )}

                  {isMerch ? (
                    <p className="font-D14px-M13px mb-6 mt-2 font-bold text-[#333333]">
                      *PURCHASING MERCH PRODUCTS MAY DELAY ENTIRE ORDER BY
                      ADDITIONAL 24H*
                    </p>
                  ) : (
                    <>
                      {/* Product discount disclaimer 5%, 8% */}
                      <SingleProductDiscountDisclaimer />

                      {/* Injectable or topical product disclaimer */}
                      <ProductFormDisclaimer mainProduct={mainProduct} />

                      {/* Bacterio water and syringe selling note */}
                      {/* {mainProduct?.categories[0].name === "Peptides" ||
                      mainProduct?.categories[0].name === "Peptide Blends" ? (
                        <p className="font-D16px-M13px mt-[24px] font-bold text-red">
                          *BACTERIOSTATIC WATER AND SYRINGES ARE SOLD SEPARATELY
                        </p>
                      ) : (
                        ""
                      )} */}
                      {/* <p className="font-D16px-M13px mt-[24px] font-bold text-red">
                        *THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE FOOD
                        AND DRUG ADMINISTRATION. THIS PRODUCT IS NOT INTENDED TO
                        DIAGNOSE, TREAT, CURE OR PREVENT ANY DISEASE.
                      </p> */}
                      {/* Product short description */}
                      {sanitizedDescription && (
                        <div className="product-item pb-[16px] pt-[24px]">
                          <div
                            className="font-D16px-M13px product-short-desc entry-content !mb-0"
                            style={{ fontFamily: "inherit" }}
                            dangerouslySetInnerHTML={{
                              __html: replaceLinks(sanitizedDescription),
                            }}
                          />
                        </div>
                      )}

                      {/* Injectable or topical product disclaimer for mobile */}
                      <ProductFormDisclaimer
                        mainProduct={mainProduct}
                        isMobile={true}
                      />
                    </>
                  )}

                  {/* <Overlay  isOpen={false} /> */}

                  {/* Select weight actions */}
                  {isMerch && (
                    <MerchVariationPicker
                      mainProduct={mainProduct}
                      handleSelectAttribute={handleSelectAttribute}
                      selectedAttributes={selectedAttributes}
                      selectedVariation={selectedVariation}
                      handleChangeVariation={handleChangeVariation}
                      hasOverlay={hasOverlay}
                      setHasOverlay={setHasOverlay}
                      containerRef={variationsRef}
                      includeAllVariations={false}
                    />
                  )}
                  {!isMerch && mainProduct.variations.length > 1 && (
                    <SingleProductVariationPicker
                      weightOrVolume={weightOrVolume}
                      mainProduct={mainProduct}
                      selectedAttributes={selectedAttributes}
                      handleSelectAttribute={handleSelectAttribute}
                      hasOverlay={hasOverlay}
                      setHasOverlay={setHasOverlay}
                      containerRef={variationsRef}
                    />
                  )}

                  {/* Product price for each variation */}
                  {!isMerch && selectedVariation && (
                    <div className="pt-4 sm:pt-0">
                      <SingleProductSinglePrice product={productToShow} />
                    </div>
                  )}

                  {!mainProduct.in_stock && (
                    <p className="font-D16px-M13px mt-[24px] font-bold text-red">
                      PRODUCT NOT IN STOCK. CONTACT SUPPORT FOR MORE
                      INFORMATION.
                    </p>
                  )}

                  {/* Static action buttons for adding to cart, buy now and quantity change for desktop and tablet devices */}
                  <div className="mt-6 sm:hidden">
                    <SingleProductStaticActionButtons
                      addToCartRef={width > 767 ? addToCartButton : undefined}
                      productQuantity={productQuantity}
                      handleQuantatyChange={handleQuantatyChange}
                      product={productToShow}
                      handleAddToCartAction={handleAddToCartAction}
                      type="single-product"
                      isGift={isGift}
                    />
                  </div>

                  <div className="mt-[32px] sm:mt-[24px]">
                    <ShareButtons productImage={productFirstImage} />
                  </div>

                  {/* sticky action buttons for mobile devices */}
                  <SingleProductStickyActionButtons
                    addToCartRef={width <= 767 ? addToCartButton : undefined}
                    productQuantity={productQuantity}
                    handleQuantatyChange={handleQuantatyChange}
                    product={productToShow}
                    handleAddToCartAction={handleAddToCartAction}
                    isGift={isGift}
                  />

                  {isMerch ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {/* General product disclaimer */}
                      <div className="mt-[24px]">
                        <Disclaimer expand={true} />
                      </div>

                      {/* Product tags */}
                      {mainProduct.tags && (
                        <div className="mt-[24px]">
                          <SingleProductTags mainProduct={mainProduct} />
                        </div>
                      )}
                    </>
                  )}

                  {/* Product shipping information */}
                  <div className="pt-[24px]">
                    <SingleProductShippingInfo />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="mb-[64px] mt-[64px] h-[1px] w-[100%] bg-borderColor sm:mb-[56px] sm:mt-[56px] md:mb-[52px] md:mt-[52px] lg:mb-[54px] lg:mt-[54px]" />

            {/* Shipping price boxes */}
            {/*  <div className="w-full sm:mt-[48px] sm:flex sm:items-center sm:justify-center md:mt-[54px] lg:mt-[54px]">
              <Shipping />
            </div> */}

            {/* Main description, additional info and review section */}
            {!isMerch && (
              <div className="container-margin-top-D96px-M64px flex w-[100%] flex-col items-start justify-center">
                {/* Main product description */}
                <SingleProductMainDescription mainProduct={mainProduct} />

                {/* Product additional info */}
                {/* <SingleProductAdditionalInfo mainProduct={mainProduct} /> */}

                {/* REVIEW SECTION HIDDEN FOR NOW UNITL RATINGS ARE CREATED */}
                {/* <SingleProductReviewSection mainProduct={mainProduct} /> */}
              </div>
            )}
          </div>

          {/* Related products */}
          <div className="container-margin-top-D96px-M64px container-margin-bottom-D96px-M64px mx-auto">
            <RelatedSlider relatedProducts={relatedProducts} />
          </div>
        </div>
      )}
      {/* {isClient &&
        createPortal(
          <ProductImageGallery
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            images={productImages}
            hasPartedImage={hasPartedImage}
            initialIndex={clickedImageIndex}
          />,
          document.body
        )} */}
    </>
  );
};

export default ProductPage;
