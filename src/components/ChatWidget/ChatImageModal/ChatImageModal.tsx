"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import CustomModal from "@/components/CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";

interface ChatImageModalProps {
  imageURL?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatImageModal: FC<ChatImageModalProps> = ({
  imageURL,
  isOpen,
  setIsOpen,
}) => {
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleDownload = async (url: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `/api/chat/download-image?imageUrl=${encodeURIComponent(url)}`;
    downloadLink.download = "image.png";
    downloadLink.target = "_blank";
    downloadLink.click();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={handleClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="ChatImageModal"
    >
      <div className="relative">
        {imageURL && (
          <Image
            src={imageURL}
            alt="Fullscreen image"
            width={600}
            height={600}
            className="max-h-[80vh] max-w-full rounded-md"
          />
        )}
        <div className={`mt-[8px] flex gap-[8px]`}>
          <button
            onClick={() => imageURL && handleDownload(imageURL)}
            className={`download flex items-center gap-[8px] text-white hover:text-gray`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white hover:text-gray"
            >
              <path
                d="M4 16.004V17C4 17.7956 4.33583 18.5587 4.9336 19.1213C5.53137 19.6839 6.34212 20 7.1875 20H17.8125C18.6579 20 19.4686 19.6839 20.0664 19.1213C20.6642 18.5587 21 17.7956 21 17V16M12.5 4.5V15.5M12.5 15.5L16.2188 12M12.5 15.5L8.78125 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ChatImageModal;
