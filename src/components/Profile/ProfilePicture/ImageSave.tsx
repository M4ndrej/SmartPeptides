"use client";

import React, { FC, useMemo } from "react";
import ImageDropzone from "./ImageDropzone";
import Button from "../../Button/Button";
import uploadProfilePicture from "@/app/actions/user/upload_profile_picture/actions";
import { mutate } from "swr";
import { IUserInfo } from "@/types/user";
import ImageDeleteButton from "./ImageDelete";

interface ImageSaveProps {
  userData?: IUserInfo;
  croppedImage: string;
  onImageChange: (image: string) => void;
  onDelete: () => void;
  onClose: () => void;
  onError: (error: string) => void;
}

const ImageSave: FC<ImageSaveProps> = ({
  userData,
  croppedImage,
  onDelete,
  onImageChange,
  onClose,
  onError,
}) => {
  const fileName = `${userData?.id}-profile-${new Date().getTime()}.png`;

  const handleSave = async () => {
    const blobRes = await fetch(croppedImage);
    const blob = await blobRes.blob();

    const formData = new FormData();
    formData.append("picture", blob, fileName);

    const mutation = await uploadProfilePicture(formData);
    onError("");
    if (mutation?.errors) {
      return onError(mutation.errors?.picture?.[0] ?? "");
    }
    if (mutation?.error) {
      return onError(mutation.error);
    }

    await Promise.all([
      mutate("/api/user/"),
      mutate("/api/user/profile", {
        ...userData,
        avatar: croppedImage,
      }),
    ]);
    onClose();
  };

  const userAvatar = useMemo(() => {
    if (croppedImage) return croppedImage;
    if (userData?.avatar) {
      return userData.avatar.replace(
        `${process.env.NEXT_PUBLIC_APP_MAIN}`,
        `${process.env.NEXT_PUBLIC_CDN_MAIN}`
      );
    }
    return "/images/profile-user.svg";
  }, [userData, croppedImage]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center justify-center gap-4">
        <div className="relative">
          <object
            data={userAvatar}
            type="image/png"
            className="h-[154px] w-[154px] rounded-full object-cover"
            width={154}
            height={154}
          >
            <img
              src={userData?.avatar || "/images/profile-user.svg"}
              alt="Profile Picture"
            />
          </object>
          {userData?.avatar && (
            <ImageDeleteButton
              onDelete={onDelete}
              onError={onError}
              className="absolute right-0 top-0"
            />
          )}
        </div>
        <ImageDropzone
          width={178}
          height={228}
          onImageChange={onImageChange}
          onError={onError}
        />
      </div>
      <Button
        text="SAVE"
        highlighted={true}
        onPress={handleSave}
        showSpiner={true}
        reverseColors={true}
      />
    </div>
  );
};

export default ImageSave;
