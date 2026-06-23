"use client";

import useIsClientRender from "@/hooks/useIsClientRender";
import UploadIcon from "../../Icons/UploadIcon";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import ProfilePictureModal from "./ProfilePictureModal";
import classNames from "classnames";

interface ProfilePictureButtonProps {
  className?: string;
}

const ProfilePictureButton: FC<ProfilePictureButtonProps> = ({ className }) => {
  const isClient = useIsClientRender();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className={classNames(
          "font-D12px-M11px group flex items-center gap-2 text-gray2 transition duration-300 hover:text-[#333333]",
          className
        )}
      >
        <UploadIcon className="transition duration-300 group-hover:fill-[#333333]" />
        Upload picture
      </button>
      {isClient &&
        createPortal(
          <ProfilePictureModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />,
          document.body
        )}
    </>
  );
};

export default ProfilePictureButton;
