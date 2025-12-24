"use client";

import deleteProfile from "@/app/actions/user/delete_profile/actions";
import Checkbox from "@/components/Checkbox/Checkbox";
import { Dispatch, FC, SetStateAction, useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import classNames from "classnames";
import { mutate } from "swr";
import CustomModal from "@/components/CustomModal/CustomModal";
import useStandaloneModalAnimation from "@/hooks/useStandaloneModalAnimation";
import Button from "@/components/Button/Button";

interface DeleteProfileModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteProfileModal: FC<DeleteProfileModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [deleteProfileCheck, setDeleteProfileCheck] = useState(false);
  const [error, showError] = useState("");
  const { showModal, animationClass } = useStandaloneModalAnimation({
    isOpen,
    animationDuration: 250,
    enterAnimationClass: "animate-slide-in-down",
    exitAnimationClass: "animate-slide-out-up",
  });

  const handleDeleteProfile = async () => {
    showError("");
    const deleteAction = await deleteProfile();

    if (deleteAction?.error) {
      return showError(deleteAction.error);
    }

    setIsOpen(false);
    window.location.href = "/";
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <CustomModal
      isOpen={showModal}
      onClose={onClose}
      animationClass={animationClass}
      modalType="DeleteProfileModal"
    >
      <div className="relative w-[592px] sm:!w-[calc(100vw-20px)]">
        <div className="m-auto max-w-[448px] pt-[24px] sm:!max-w-[calc(100vw-40px)] sm:px-[24px]">
          <div className="flex items-center justify-center">
            <div className="font-D24px-M18px mb-[24px] text-center">
              Are you sure you want to delete your Peptide member profile?
            </div>
          </div>
          <div>
            <div className="font-D16px-M13px mb-[8px] font-bold sm:mb-[10px]">
              By Deleting Your Profile:
            </div>
            <ul className="font-D16px-M13px list-disc pl-[24px]">
              <li className="mb-[8px]">
                You will no longer have access to your Value Peptide or Peptide
                member profile.
              </li>
              <li>
                Information related to orders will be available by contacting
                consumer services.
              </li>
            </ul>
            <div className="font-D16px-M13px mt-[24px]">
              Information shared on social networks or platforms outside of
              valuepeptide.com/ will not be affected.
            </div>
            <div className="mb-[32px] mt-[16px] flex items-start sm:mt-[24px]">
              <div className="pt-[4px]">
                <Checkbox
                  checked={deleteProfileCheck}
                  onChange={setDeleteProfileCheck}
                />
              </div>
              <div className="font-D16px-M13px">
                Yes, I want to delete my Peptide account. I cannot undo this
                action
              </div>
            </div>
            {error && (
              <div className="font-D16px-M13px mt-[14px] flex items-center gap-[8px] rounded-[5px] bg-warningRed p-[16px]">
                {error}
              </div>
            )}
            <div className="flex flex-col items-center">
              <Button
                text="DELETE YOUR ACCOUNT"
                highlighted={true}
                showSpiner
                reverseColors
                disabled={!deleteProfileCheck}
                onPress={handleDeleteProfile}
                customClass={classNames(
                  "w-[100%] font-D16px-M15px",
                  !deleteProfileCheck &&
                    "!bg-lightgray !text-gray2 !border-none"
                )}
              />
              <button
                className="font-D16px-M15px mt-[16px] cursor-pointer hover:text-[#E7461E]"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteProfileModal;
