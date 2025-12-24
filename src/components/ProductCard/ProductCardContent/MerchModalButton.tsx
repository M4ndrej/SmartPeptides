import CartIcon from "@/components/Icons/CartIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import MerchModal from "@/components/MerchModal/MerchModal";
import SelectTooltip from "@/components/SelectTooltip/SelectTooltip";
import Tooltip from "@/components/Tooltip/Tooltip";
import { Attribute2, ProductNew, Variation } from "@/types/product";
import classNames from "classnames";
import { forwardRef, useState } from "react";

interface MerchModalButtonProps {
  mainProduct: ProductNew;
  selectedVariation?: Variation;
  selectVariationActive: boolean;
  selectedAttributes: Attribute2[];
  productIsInCart: boolean;
  hideSelectTooltip?: boolean;
  viewMode: string;
  section?: string;
  isGift?: boolean;
  handleSelectAttribute: (name: string, val: string) => void;
  handleChangeVariation: (variation: Variation) => void;
  closeSidepopover?: () => void;
  setIsMearchModalOpen?: (value: boolean) => void;
}

const MerchModalButton = forwardRef<HTMLDivElement, MerchModalButtonProps>(
  (
    {
      mainProduct,
      selectedVariation,
      selectedAttributes,
      handleSelectAttribute,
      handleChangeVariation,
      selectVariationActive,
      productIsInCart,
      isGift,
      hideSelectTooltip,
      closeSidepopover,
      viewMode,
      section,
      setIsMearchModalOpen,
    },
    ref
  ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      closeSidepopover?.();
      setIsModalOpen(true);
      setIsMearchModalOpen?.(true);
    };

    return (
      <>
        <div
          className={classNames(
            "group/cart cart-img-btn absolute right-[16px] top-[-19px] sm:right-[8px]",
            !selectedVariation && "group/variation-select bg-white",
            viewMode === "rows" && section !== "mega-menu" && "hidden"
            //group/variation-select is only for showing tooltip when variation isnt selected
          )}
        >
          {/* Tooltip */}
          {!hideSelectTooltip ? (
            <SelectTooltip
              className="group-hover/variation-select:scale-[1] group-hover/variation-select:opacity-100"
              selectVariationActive={selectVariationActive}
            />
          ) : (
            <Tooltip
              text={"Add to cart"}
              pointerSide="right"
              customClass="top-[9px] sm:top-[6px] left-[-97px] scale-[.7] translate-x-[30px] group-hover/cart:translate-x-[0] group-hover/cart:scale-[1] opacity-0 transition duration-150 group-hover/cart:opacity-100"
            />
          )}
          <div
            ref={ref}
            onClick={handleOpenModal}
            className={classNames(
              "cart-img-btn ease-[cubic-bezier(0.11, 0, 0.5, 0)] select-none bg-[#E7461E] transition duration-200",
              !selectedVariation &&
                !hideSelectTooltip &&
                "group-hover/cart:!bg-[#E7461E]",
              (selectedVariation || hideSelectTooltip) &&
                "group-hover/cart:bg-[#E7461E]",
              !selectVariationActive && "group-hover/cart:z-[3]",
              selectVariationActive &&
                "z-[99999999991] bg-white [&_svg]:transition [&_svg]:duration-200 [&_svg]:hover:rotate-[45deg] "
            )}
          >
            <div
              className={classNames(
                "flex items-center justify-center",
                !selectedVariation &&
                  !hideSelectTooltip &&
                  "group-hover/cart:hidden"
              )}
            >
              {isGift ? (
                <PlusIcon className="stroke-white transition duration-200" />
              ) : (
                <CartIcon className="transition duration-200" />
              )}
            </div>
            {!hideSelectTooltip && (
              <div
                className={classNames(
                  !selectVariationActive && "hidden",
                  !selectedVariation && "group-hover/cart:block"
                )}
              >
                <PlusIcon />
              </div>
            )}
          </div>
        </div>
        <MerchModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          mainProduct={mainProduct}
          selectedAttributes={selectedAttributes}
          handleSelectAttribute={handleSelectAttribute}
          selectedVariation={selectedVariation}
          handleChangeVariation={handleChangeVariation}
          isGift={isGift}
          setIsMearchModalOpen={setIsMearchModalOpen}
        />
      </>
    );
  }
);

MerchModalButton.displayName = "MerchModalButton";

export default MerchModalButton;
