"use client";

import { FC, useMemo, useState } from "react";
import ImageDropzone from "./ImageDropzone";
import ImageCrop from "./ImageCrop";
import ImageSave from "./ImageSave";
import { IUserInfo } from "@/types/user";
import useSWR from "swr";
import CustomModal from "@/components/CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";

interface ProfilePictureModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProfilePictureModal: FC<ProfilePictureModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { data: userData } = useSWR<IUserInfo>("/api/user/profile");
  const [imageUrl, setImageUrl] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [error, setError] = useState("");
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const onClose = () => {
    setIsOpen(false);
    setError("");
    setImageUrl("");
    setCroppedImageUrl("");
  };

  const onImageChange = (image: string) => {
    setError("");
    setImageUrl(image);
    setCroppedImageUrl("");
  };

  const onReset = () => {
    setError("");
    setImageUrl("");
    setCroppedImageUrl("");
  };

  const stepToShow = useMemo(() => {
    if (!imageUrl && !croppedImageUrl) return userData?.avatar ? 2 : 0;
    if (imageUrl && !croppedImageUrl) return 1;
    if (croppedImageUrl) return 2;
  }, [imageUrl, croppedImageUrl, userData]);

  return (
    <CustomModal
      isOpen={showModal}
      onClose={onClose}
      animationClass={animationClass}
      hideLogo={true}
      modalType="ProfilePictureModal"
    >
      <div className="w-[400px] p-[24px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="font-D18px-M16px font-bold">
            Upload your profile picture
          </span>
          <div className="mb-[24px] h-[2px] w-[48px] rounded-[2px] bg-[#9A9A9F]"></div>
        </div>
        {stepToShow == 0 && (
          <ImageDropzone onImageChange={onImageChange} onError={setError} />
        )}
        {stepToShow == 1 && (
          <ImageCrop
            image={imageUrl}
            onCancel={onReset}
            setCroppedImage={setCroppedImageUrl}
          />
        )}
        {stepToShow == 2 && (
          <ImageSave
            userData={userData}
            croppedImage={croppedImageUrl}
            onDelete={onReset}
            onImageChange={onImageChange}
            onClose={onClose}
            onError={setError}
          />
        )}
        {error && (
          <div className="font-D16px-M14px mt-[24px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
            {error}
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ProfilePictureModal;
