// CustomModal.tsx
"use client";
import classNames from "classnames";
import { FC, ReactNode } from "react";
import Logo from "../Logo/Logo";
import ModalCloseButton from "./ModalCloseButton";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  hideLogo?: boolean;
  animationClass?: string;
  modalType?: string;
  hideCloseButton?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  hideLogo,
  animationClass,
  modalType,
  hideCloseButton,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        "fixed inset-0 z-[99999999] flex items-center justify-center bg-backdrop backdrop-blur-sm transition-opacity duration-200",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className={classNames(
          "relative z-[99999999] w-[528px] max-w-full rounded-lg bg-white py-6 sm:w-[calc(100vw-20px)]",
          "modal-animation",
          modalType === "ChatImageModal" &&
            "!h-fit !w-fit !bg-transparent !py-0",
          modalType === "ProductGalleryModal" &&
            "flex !h-screen !w-full items-center !bg-transparent !py-0",
          modalType === "ProfilePictureModal" &&
            "flex !w-[400px] flex-col items-center justify-center !p-[24px] !py-0",
          modalType === "DeleteProfileModal" && "!w-[592px]",
          modalType === "MerchSizeGuide" &&
            "!w-[1200px] !max-w-[calc(100vw-20px)]",
          modalType === "CheckoutFailedPaymentModal" && "!w-[480px] !py-0",
          modalType === "AffiliateModal" && "!w-[592px]",
          modalType === "CashOutModal" && "!w-[496px] !py-0",
          modalType === "TrackingShipmentModal" &&
            "!max-w-[1200px] md:!w-[calc(100vw-20px)] lg:!w-[calc(100vw-20px)]",
          modalType === "SubscribeConfirmationModal" && "!max-w-[480px]",
          modalType === "AffiliateWelcomeModal" &&
            "!w-[821px] md:!w-[670px] from834:!w-[670px] lg:!w-[652px]",
          modalType === "BigSaleBannerModal" &&
            "!w-[418px] !py-0 xs:!h-[569px] xs:!w-[354px] md:!h-[748px] md:!w-[539px] from834:!h-auto from834:!w-[793px] lg:!w-[937px] ",
          animationClass
        )}
        onClick={(e) => {
          modalType !== "ProductGalleryModal" && e.stopPropagation();
        }}
      >
        {!hideCloseButton && <ModalCloseButton onClose={onClose} />}
        {!hideLogo && (
          <>
            <div className="flex justify-center pb-[24px] sm:pb-[16px] ">
              <Logo width={262} height={34} size="small" />
            </div>
            <div className="h-[1px] w-full bg-borderColor"></div>
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
