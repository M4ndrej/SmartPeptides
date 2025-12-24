"use client";

import classNames from "classnames";
import { FC, useMemo } from "react";
import { useProfileContext } from "./ProfileContext";
import ProfilePictureButton from "./ProfilePicture/ProfilePictureButton";

interface ProfilePictureBoxProps {
  className?: string;
}

const ProfilePictureBox: FC<ProfilePictureBoxProps> = ({ className }) => {
  const { userData } = useProfileContext();

  const userAvatar = useMemo(() => {
    if (userData?.avatar) {
      return userData.avatar.replace(
        `${process.env.NEXT_PUBLIC_APP_MAIN}`,
        `${process.env.NEXT_PUBLIC_CDN_MAIN}`
      );
    }
    return "/images/profile-user.svg";
  }, [userData]);

  const userFullName = useMemo(() => {
    if (userData?.firstname) {
      return `${userData?.firstname} ${userData?.lastname}`;
    }
    return userData?.displayname;
  }, [userData]);

  return (
    <div
      className={classNames(
        "flex items-center justify-start gap-x-4 rounded-[5px] border border-borderColor py-6 pl-6 sm:items-center",
        className
      )}
    >
      <object
        data={userAvatar}
        type="image/png"
        className="h-[68px] w-[68px] select-none rounded-sm"
        width={68}
        height={68}
      >
        <img
          src={userData?.avatar ?? "/images/profile-user.svg"}
          alt="Profile Picture"
        />
      </object>
      <div className="font-D14px-M13px !max-w-[143px]">
        <div className="mb-1 text-gray2">Welcome</div>
        <div className="!break-words font-bold">{userFullName}</div>
        <ProfilePictureButton className="mt-2" />
      </div>
    </div>
  );
};

export default ProfilePictureBox;
