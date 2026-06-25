import classNames from "classnames";
import Button from "../Button/Button";
import { useProfileContext } from "./ProfileContext";
import { FC, ReactNode } from "react";
import { ProfileTab } from "@/data/profile_data";
import Link from "next/link";
import logoutUser from "@/app/actions/auth/logout/actions";
import { mutate } from "swr";

interface DashboardTabWrapperProps {
  children: ReactNode;
  tab: ProfileTab;
}

const DashboardTabWrapper: FC<DashboardTabWrapperProps> = ({
  children,
  tab,
}) => {
  const { setIsAffiliateModalOpen, userData } = useProfileContext();
  const handleLogout = async () => {
    const logout = await logoutUser();
    if (logout.success) {
      window.location.href = "/";
      await mutate("/api/user/");
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/api/products")
      );
    }
  };

  const styles = classNames(
    "border-1 font-D16px-M13px flex h-[192px] flex-1 cursor-pointer flex-col justify-between rounded-[5px] border border-borderColor p-[24px] text-gray2 transition duration-200 hover:bg-lightgray hover:text-gray sm:p-[16px] [&_mask]:hover:stroke-[#9A9A9F]",
    !tab.iconStroke || (tab.id === 10 && "[&_path]:hover:fill-[#9A9A9F]"),
    tab.iconStroke &&
      "[&_mask]:hover:stroke-[#9A9A9F] [&_path]:hover:stroke-[#9A9A9F] [&_rect]:hover:stroke-[#9A9A9F]",
    tab.id === 6 && !userData?.has_affiliate && "!cursor-default"
  );

  if (tab.id === 7) {
    return (
      <button key={tab.id} className={styles} onClick={handleLogout}>
        {children}
      </button>
    );
  }

  if (tab.id === 6 && !userData?.has_affiliate) {
    return (
      <button className={styles} onClick={() => setIsAffiliateModalOpen(true)}>
        {children}
      </button>
    );
  }

  return (
    <Link href={tab.link!} className={styles}>
      {children}
    </Link>
  );
};

interface DashboardTabProps {
  tab: ProfileTab;
  displayedAddress?: string;
}

const DashboardTab: FC<DashboardTabProps> = ({ tab, displayedAddress }) => {
  const { userData, orderData } = useProfileContext();
  const orderCount = orderData?.pagination?.count ?? 0;

  return (
    <DashboardTabWrapper tab={tab}>
      <div
        className={tab.id === 6 ? "mb-4" : ""}
        dangerouslySetInnerHTML={{
          __html: tab.icon!,
        }}
      />
      <div className="flex flex-col gap-1">
        <div
          className={classNames(
            "text-left",
            tab.id == 10 && "font-13px-ALL text-gray2"
          )}
        >
          {tab.id == 3 && displayedAddress ? displayedAddress : tab.name}{" "}
          {tab.id == 2 ? `(${orderCount})` : ""}
        </div>
        {tab.id == 10 && (
          <div className="font-D24px-M16px text-gray2">
            ${userData?.credit_store?.toFixed(2) ?? "0.00"}
          </div>
        )}
        {tab.id === 6 && !userData?.has_affiliate && (
          <Button
            text="ENROLL NOW"
            highlighted
            customClass="mt-3 py-[8px] px-[20px] sm:px-[10px] max-w-[157px] max-h-[40px]"
          />
        )}
      </div>
    </DashboardTabWrapper>
  );
};

export default DashboardTab;
