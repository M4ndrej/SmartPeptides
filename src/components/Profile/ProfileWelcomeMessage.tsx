import { FC } from "react";
import LogoutButton from "./LogoutBtn";

interface ProfileWelcomeMessageProps {
  username: string;
}

const ProfileWelcomeMessage: FC<ProfileWelcomeMessageProps> = ({
  username,
}) => {
  return (
    <div className="mb-[24px] flex justify-between gap-4 sm:mb-[16px] xl:mb-[40px]">
      <div className="w-full">
        <div className="font-24px-ALL pb-[16px] font-bold xs:w-[194px]">
          Welcome back {username}
        </div>
        <div className="h-[2px] w-[48px] rounded bg-[#333333]" />
      </div>
      <LogoutButton className="shrink-0 pb-[16px] text-[16px] font-bold text-[#333333] sm:text-[13px] xl:hidden" />
    </div>
  );
};

export default ProfileWelcomeMessage;
