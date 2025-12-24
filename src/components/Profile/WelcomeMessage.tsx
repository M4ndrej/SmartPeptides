"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutBtn";
import { useProfileContext } from "./ProfileContext";

const WelcomeMessage = () => {
  const { userData } = useProfileContext();
  const path = usePathname();
  const isProfile = path === "/profile/";

  if (!isProfile) return null;
  return (
    <div className="font-D16px-M13px">
      <div className="mb-[16px]">
        Hello <span className="font-bold">{userData?.displayname}</span> (not{" "}
        {userData?.displayname}?{" "}
        <LogoutButton className="hidden underline xl:inline-block" />)
      </div>
      <div>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing address, and edit your password and account
        details.
      </div>
    </div>
  );
};

export default WelcomeMessage;
