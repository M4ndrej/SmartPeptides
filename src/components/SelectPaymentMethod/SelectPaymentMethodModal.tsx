"use client";

import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { FC } from "react";
import CustomModal from "../CustomModal/CustomModal";

interface SelectPaymentMethodModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SelectPaymentMethodModal: FC<SelectPaymentMethodModal> = ({
  isOpen,
  setIsOpen,
}) => {
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = async () => {
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo
      modalType="SelectPaymentMethodModal"
    >
      <div className="flex flex-col items-center justify-between">
        <h3 className="font-D24px-M18px px-6 text-center">
          Payment Method Selection
        </h3>
        <div className="my-6 h-[1px] w-full bg-borderGray" />
        <p className="px-[36px]">
          Please select your{" "}
          <span className="font-bold">preferred payment method</span> to
          continue with payment process.
        </p>
      </div>
    </CustomModal>
  );
};
