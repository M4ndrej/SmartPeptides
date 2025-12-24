"use client";

import logoutUser from "@/app/actions/auth/logout/actions";
import { tabs } from "@/data/profile_data";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { FC, useMemo } from "react";
import Dropdown from "../Dropdown/Dropdown";
import GroupProfileTabs from "./GroupProfileTabs";
import { useProfileContext } from "./ProfileContext";
import SingleProfileTab from "./SingleProfileTab";

interface ProfileTabsProps {
  className?: string;
}

const ProfileTabs: FC<ProfileTabsProps> = ({ className }) => {
  const { userData } = useProfileContext();
  const { orderData, setIsAffiliateModalOpen } = useProfileContext();
  const orderCount = orderData?.pagination?.count ?? 0;

  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    if (pathname === "/profile" || pathname === "/profile/") return 1;
    return (
      tabs
        .filter((tab) => tab.link != "/profile" && tab.link)
        .find((tab) => pathname.includes(tab.link!))?.id ?? 1
    );
  }, [pathname]);

  const dropdownTabs = useMemo(() => {
    return tabs.map((tab) => {
      if (tab.name === "Orders") {
        return { id: tab.id, name: `Orders (${orderCount})` };
      }
      if (tab.name === "Affiliate" && !userData?.has_affiliate) {
        return { id: tab.id, name: `Affiliate (Enroll)` };
      }
      return tab;
    });
  }, [orderCount, userData?.has_affiliate]);

  const changeTab = async (id: number) => {
    if (id == 7) {
      const logout = await logoutUser();
      if (logout.success) window.location.href = "/";
      return;
    }
    if (id == 6 && !userData?.has_affiliate) {
      setIsAffiliateModalOpen(true);
      return;
    }
    router.push(tabs.find((tab) => tab.id === id)?.link ?? "/profile");
    return;
  };

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-y-[32px] sm:gap-y-[24px]",
        className
      )}
    >
      <div className="w-[100%]">
        <div className="flex-col sm:hidden md:hidden lg:hidden xl:flex ">
          {tabs.map((tab) => (
            <SingleProfileTab
              key={tab.id}
              tab={tab}
              isActive={tab.id === activeTab}
            />
          ))}
        </div>
        <GroupProfileTabs
          className="hidden pb-[10px] sm:block sm:pb-0 md:block md:pb-0 lg:block lg:pb-0 xl:hidden"
          items={dropdownTabs}
          selectedId={activeTab}
          changeSelectedId={changeTab}
        />
        <Dropdown
          className="hidden pb-[10px] sm:block sm:pb-0 "
          items={dropdownTabs}
          selectedId={activeTab}
          changeSelectedId={changeTab}
        />
      </div>
    </div>
  );
};

export default ProfileTabs;
