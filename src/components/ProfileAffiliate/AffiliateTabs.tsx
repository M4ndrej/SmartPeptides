"use client";

import classNames from "classnames";
import { FC, useMemo } from "react";
import { affiliateProfileTabs } from "@/data/affiliate";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Dropdown from "../Dropdown/Dropdown";
import { useRouter } from "next/navigation";

const AffiliateTabs: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(
    () => affiliateProfileTabs.find((tab) => tab.link === pathname)?.id ?? 1,
    [pathname]
  );

  const changeTab = async (id: number) => {
    const link = affiliateProfileTabs.find((tab) => tab.id === id)?.link;
    return router.push(link ?? "/profile/affiliate/");
  };

  return (
    <>
      {/* Desktop navigation */}
      <div className="mb-4 grid grid-cols-7 gap-0 rounded-[5px] bg-lightgray sm:hidden md:hidden">
        {affiliateProfileTabs.map((item, index) => {
          return (
            <Link
              href={item.link}
              key={`tab-item-${index}`}
              className={classNames(
                "font-D16px-M13px flex cursor-pointer items-center justify-center px-2 py-3 text-gray2 hover:text-gray",
                activeTab === item.id && "!font-bold !text-darkgray"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <Dropdown
        className="mb-4 hidden sm:block sm:pb-0 md:block md:pb-0 lg:hidden lg:pb-0 xl:hidden"
        items={affiliateProfileTabs}
        selectedId={activeTab}
        changeSelectedId={changeTab}
      />
    </>
  );
};

export default AffiliateTabs;
