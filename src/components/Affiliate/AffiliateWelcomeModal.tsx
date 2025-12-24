"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import CustomModal from "../CustomModal/CustomModal";

const AffiliateWelcomeModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenAffiliateWelcomeModal");

    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem("hasSeenAffiliateWelcomeModal", "true");
    }
  }, []);

  return (
    <CustomModal
      isOpen={showModal}
      onClose={() => setIsOpen(false)}
      hideLogo={true}
      animationClass={animationClass}
    >
      <div className="relative w-[821px] sm:!w-[calc(100vw-20px)] md:w-[670px] from834:w-[670px] lg:w-[652px]">
        <div className="from834::max-w-[600px] md::max-w-[600px] m-auto max-w-[741px] py-10 pt-[24px] sm:max-h-[calc(100vh-195px)] sm:!max-w-[calc(100vw-40px)] sm:overflow-y-auto sm:px-2 sm:py-4 md:!max-w-[calc(100vw-40px)] md:px-4 from834:px-4">
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image
                src="/images/affiliate-modal-icon.svg"
                alt="Affiliate Welcome"
                width={116}
                height={120}
              />
            </div>
            <div className="m-auto my-[16px] h-[2px] w-[48px] bg-[#E7461E] sm:block"></div>
            <div className="font-D32px-M24px mb-[24px] mt-[24px] text-center font-bold">
              Welcome to our Affiliate program!
            </div>
            <div className="flex w-full flex-col items-start gap-4 text-[#333333]">
              <p className="font-D16px-M15px">
                As an affiliate you have the opportunity to get 10% of every
                purchase which was made by anyone who registered through your
                affiliate link.
              </p>
              <p className="font-D16px-M15px">
                That person becomes ‘your referral’ for life!
              </p>
              <p className="font-D16px-M15px">
                This 10% we will move to the ‘Store credit’ in your main account
                (not the affiliate account). You can find this under your main
                account – store credit.
              </p>
              <p className="font-D16px-M15px">
                These credits you can use when making purchases on our website.
                All of it or part, whatever is more convenient for you.
              </p>
              <p className="font-D16px-M15px">
                All you need to do to get our products for free is to refer our
                webshop!
              </p>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AffiliateWelcomeModal;
