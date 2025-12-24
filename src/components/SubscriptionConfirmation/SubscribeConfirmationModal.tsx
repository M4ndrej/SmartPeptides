"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import CustomModal from "../CustomModal/CustomModal";

const SubscribeConfirmationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen: isModalOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const closeModal = async () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 5000);
    })();
  }, []);

  return (
    <>
      <CustomModal
        isOpen={showModal}
        onClose={closeModal}
        animationClass={animationClass}
        modalType="SubscribeConfirmationModal"
      >
        <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center justify-center rounded-[5px] p-[32px] !pb-0 text-center sm:px-[16px] sm:py-[24px]">
          <Image
            src="/images/subscribeConfirm.svg"
            width={72}
            height={80}
            alt="subscribe confirm"
          />
          <p className="font-D24px-M18px mb-[32px] mt-[16px]">
            Thank you for confirming your subscription.
          </p>
          <Button
            onPress={closeModal}
            text="START SHOPPING"
            highlighted
            customClass="w-full"
          />
        </div>
      </CustomModal>
    </>
  );
};

export default SubscribeConfirmationModal;
