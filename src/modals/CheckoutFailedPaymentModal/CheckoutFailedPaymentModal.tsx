import Button from "@/components/Button/Button";
import CustomModal from "@/components/CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import { FC, useEffect, useState } from "react";

type CheckoutPhoneVerificationProps = {
  paymentFailedModalOpen: boolean;
  paymentFailedMessage: string;
  handleClosePaymentFailed: () => Promise<void>;
};

export const CheckoutFailedPaymentModal: FC<CheckoutPhoneVerificationProps> = ({
  paymentFailedMessage,
  paymentFailedModalOpen,
  handleClosePaymentFailed,
}) => {
  const [isOpen, setIsOpen] = useState(paymentFailedModalOpen);

  useEffect(() => {
    setIsOpen(paymentFailedModalOpen);
  }, [paymentFailedModalOpen]);

  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleClose = async () => {
    await handleClosePaymentFailed();
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="CheckoutFailedPaymentModal"
    >
      <div className="p-[32px]">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[16px]">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="45" fill="#FF0000" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.6726 28.3086C32.91 26.5565 30.0608 26.5649 28.3086 28.3274C26.5565 30.09 26.5649 32.9392 28.3274 34.6914L38.6984 45.0011L28.3274 55.3109C26.5649 57.063 26.5565 59.9122 28.3086 61.6748C30.0608 63.4374 32.91 63.4458 34.6726 61.6936L45.0813 51.3463L55.3294 61.534C57.092 63.2862 59.9412 63.2778 61.6934 61.5152C63.4455 59.7527 63.4371 56.9034 61.6745 55.1513L51.4641 45.0011L61.6745 34.851C63.4371 33.0988 63.4455 30.2496 61.6934 28.487C59.9412 26.7245 57.092 26.7161 55.3294 28.4682L45.0813 38.6559L34.6726 28.3086Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="font-D32px-M24px mb-[8px] text-center">
            <div className="text-red">Hold up</div>
            <div>There is an issue.</div>
          </div>
          <div className="mb-[32px] text-center">{paymentFailedMessage}</div>
          <div>
            <Button
              text="TRY AGAIN NOW"
              highlighted
              onPress={handleClosePaymentFailed}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
