"use client";

import classNames from "classnames";
import { tabs } from "@/data/profile_data";
import { FC, useMemo } from "react";
import { formatAddress } from "@/helpers/address_format";
import { CartResponse } from "@/types/cart_types";
import { useProfileContext } from "./ProfileContext";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/helpers/fetchers";
import logoutUser from "@/app/actions/auth/logout/actions";
import DashboardTab from "./DashboardTab";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutBtn";

const ProfileDashboard: FC = () => {
  const router = useRouter();

  const { userData } = useProfileContext();
  const { data: cartData } = useSWR<CartResponse>(
    "/api/cart/get_cart",
    fetcher
  );

  const displayedAddress = useMemo(() => {
    if (cartData?.cart?.shipping_address.address_1) {
      return formatAddress(cartData?.cart?.shipping_address);
    }
    if (cartData?.cart?.billing_address.address_1) {
      return formatAddress(cartData?.cart?.billing_address);
    }
    return "";
  }, [cartData?.cart]);

  const handleLogout = async () => {
    const logout = await logoutUser();
    if (logout.success) {
      router.refresh();
      router.push("/");
      await mutate("/api/user/");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
    }
  };

  return (
    <div>
      {/* <div className="font-D16px-M13px mb-[40px]">
        <div className="mb-[16px]">
          Hello <span className="font-bold">{userData?.displayname}</span> (not{" "}
          {userData?.displayname}?{" "}
          <LogoutButton className="underline hidden xl:inline-block" />
          )
        </div>
        <div>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing address, and edit your password and account
          details.
        </div>
      </div> */}

      {/* <div className=" gap-[16px] sm:flex-col flex-grow mb-[32px] hidden xl:flex">
          <div className="flex flex-grow flex-col gap-[4px] rounded-[5px] border border-[#8EC5F2] bg-[#F4FAFF] p-[16px]">
            <div className="grid gap-[4px] text-[13px] font-bold text-[#333333]">
              <p>Current status: No status</p>
              <p>(no permanent discount)</p>
            </div>

            <div className="text-[16px] text-[#333333]">
              Money spent: $1,243 USD
            </div>
          </div>

          <div className="flex flex-grow flex-col gap-[4px] rounded-[5px] border border-[#E3E3E3] p-[16px] ">
            <div className="grid gap-[4px] text-[13px] font-bold text-[#999999]">
              <p>Next status: VIC 10</p>
              <p>(10% permanent discount)</p>
            </div>

            <div className="text-[13px] text-[#999999]">
              Spend $5,000 USD ($3,757 USD more)
            </div>
          </div>
        </div> */}

      <div className="grid grid-cols-3 justify-between gap-[16px] gap-x-[16px] sm:grid sm:grid-cols-2 sm:gap-[4px] sm:gap-y-[4px] md:grid md:max-w-[100%] md:grid-cols-2 md:gap-y-[16px]">
        {tabs
          .filter((item) => item.id != 1)
          .map((tab) => (
            <DashboardTab
              key={tab.id}
              tab={tab}
              displayedAddress={displayedAddress}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfileDashboard;
