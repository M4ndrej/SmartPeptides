"use client";
import { addToCart } from "@/app/actions/cart/add/actions";
import { TOGGLE_CART_MODAL } from "@/context/constants";
import { useThemeContext } from "@/context/theme-provider";
import useScreenSize from "@/hooks/useScreenSize";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { Attribute2, ProductNew, Variation } from "@/types/product";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { mutate } from "swr";
import CustomModal from "../CustomModal/CustomModal";
import MerchVariationPicker from "../MerchProductWidgets/MerchVariationPicker";
import InsideScroll from "../Scroll/InsideScroll";
import SingleProductStaticActionButtons from "../SingleProductWidgets/SingleProductStaticActionButtons";

interface MerchModalProps {
  mainProduct: ProductNew;
  selectedAttributes: Attribute2[];
  handleSelectAttribute: (name: string, val: string) => void;
  handleChangeVariation: (variation: Variation) => void;
  selectedVariation?: Variation;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isGift?: boolean;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const MerchModal: FC<MerchModalProps> = ({
  mainProduct,
  selectedAttributes,
  handleSelectAttribute,
  selectedVariation,
  handleChangeVariation,
  isOpen,
  setIsOpen,
  isGift,
  setIsMearchModalOpen,
}) => {
  const { height } = useScreenSize();
  const router = useRouter();
  const appContext = useThemeContext();
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const [hasOverlay, setHasOverlay] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const handleQuantatyChange = async (quantity: number) => {
    if (quantity) setProductQuantity(quantity);
  };

  const hasVersion = useMemo(() => {
    return !!mainProduct.attributes.find((a) => a.name === "Version");
  }, [mainProduct]);

  const modalHeight = useMemo(() => {
    return 704 + (isGift ? -60 : 0) + (!hasVersion ? -150 : 0);
  }, [hasVersion, isGift]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMearchModalOpen?.(false);
  };

  const clearAttributes = () => {
    selectedAttributes.forEach((attr) => {
      handleSelectAttribute(attr.name, "");
    });
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
    clearAttributes();
    handleClose();
    appContext.dispatch({
      type: TOGGLE_CART_MODAL,
      payload: { showCartModal: true },
    });
    await mutate("/api/cart/get_cart", {
      cart: addToCartResult.success.cart.data,
      loggedUser: "success",
    });
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="MerchModal"
    >
      <InsideScroll className="max-h-[calc(100vh-195px)] w-[528px] sm:!w-[calc(100vw-20px)]">
        <div className="m-auto flex max-w-[528px] flex-col items-center justify-center px-6 sm:max-w-[100%]">
          {/* Select Attributes */}
          <div className="mb-8 w-full">
            <MerchVariationPicker
              mainProduct={mainProduct}
              selectedAttributes={selectedAttributes}
              handleSelectAttribute={handleSelectAttribute}
              selectedVariation={selectedVariation}
              handleChangeVariation={handleChangeVariation}
              includeAllVariations={false}
              hasOverlay={hasOverlay}
              redBorder={true}
            />
          </div>

          {/* Static action buttons for adding to cart, buy now and quantity change for desktop and tablet devices */}
          <SingleProductStaticActionButtons
            productQuantity={productQuantity}
            handleQuantatyChange={handleQuantatyChange}
            product={selectedVariation || mainProduct}
            disabled={!selectedVariation && mainProduct.variations.length > 0}
            handleAddToCartAction={handleAddToCartAction}
            isWrapped={true}
            isGift={isGift}
          />
        </div>
      </InsideScroll>
    </CustomModal>
  );
};

export default MerchModal;
