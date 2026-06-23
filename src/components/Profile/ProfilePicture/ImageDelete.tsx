"use client";

import deleteProfilePicture from "@/app/actions/user/delete_profile_picture/actions";
import TrashIcon from "@/components/Icons/TrashIcon";
import Spinner from "@/components/SvgComponents/Spinner";
import { IUserInfo } from "@/types/user";
import classNames from "classnames";
import { FC, useState } from "react";
import useSWR, { mutate } from "swr";

interface ImageDeleteButtonProps {
  onDelete: () => void;
  onError: (error: string) => void;
  className?: string;
}

const ImageDeleteButton: FC<ImageDeleteButtonProps> = ({
  onDelete,
  onError,
  className,
}) => {
  const { data: userData } = useSWR<IUserInfo>("/api/user/profile");
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const mutation = await deleteProfilePicture();
    if (mutation?.error) {
      return onError(mutation.error);
    }
    await Promise.all([
      mutate("/api/user/"),
      mutate("/api/user/profile", {
        ...userData,
        avatar: "",
      }),
    ]);
    setIsLoading(false);
    onDelete();
  };

  return (
    <button
      className={classNames(
        "group/button !flex h-8 w-8 items-center justify-center rounded-md bg-gray transition-all duration-300",
        isLoading ? "cursor-not-allowed" : "hover:bg-[#333333]",
        className
      )}
      disabled={isLoading}
      onClick={handleDelete}
    >
      {isLoading ? (
        <Spinner customClass="!m-0" />
      ) : (
        <TrashIcon className="transition-all duration-300 group-hover/button:fill-white" />
      )}
    </button>
  );
};

export default ImageDeleteButton;
