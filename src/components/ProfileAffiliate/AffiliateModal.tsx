"use client";

import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";
import CustomModal from "../CustomModal/CustomModal";
import WarningIcon from "../Icons/WarningIcon";
import AffiliateForm from "../ProfileAffiliate/Widgets/AffiliateForm";
import InsideScroll from "../Scroll/InsideScroll";

interface AffiliateModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  redirect?: boolean;
}

const AffiliateModal: FC<AffiliateModalProps> = ({
  isOpen,
  setIsOpen,
  redirect = true,
}) => {
  const router = useRouter();
  const [modalHeight, setModalHeight] = useState<Height>(552);
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const onFormSuccess = () => {
    handleClose();
    redirect && router.push("/profile/affiliate");
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      modalType="AffiliateModal"
    >
      <InsideScroll className="max-h-[calc(100vh-195px)] w-[592px] sm:w-[calc(100vw-20px)]">
        <AnimateHeight height={modalHeight} duration={200}>
          <div className="m-auto flex max-w-[448px] flex-col items-center justify-center gap-[16px] pt-[24px] sm:max-w-[100%]">
            <div>
              <WarningIcon />
            </div>
            <div className="font-D24px-M18px text-center sm:font-medium">
              Oooops! We noticed that you still don’t have your information
              filled.
            </div>
          </div>
          <div className="m-auto my-[16px] mt-[16px] h-[2px] w-[48px] bg-[#E7461E] sm:block"></div>
          <div className="font-D16px-M13px m-auto mb-[36px] flex max-w-[448px] flex-col text-center sm:max-w-[100%]">
            Please fill the fields so we can continue with your registration as
            affiliate
          </div>
          <div className="mx-auto max-w-[448px] sm:max-w-[100%]">
            <AffiliateForm
              containerHeight={modalHeight}
              setContainerHeight={setModalHeight}
              onSuccess={onFormSuccess}
            />
          </div>
        </AnimateHeight>
      </InsideScroll>
    </CustomModal>
  );
};

export default AffiliateModal;
