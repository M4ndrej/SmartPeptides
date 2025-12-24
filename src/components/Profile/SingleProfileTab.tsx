import { ProfileTab } from "@/data/profile_data";
import { IUserInfo } from "@/types/user";
import { useRouter } from "next/navigation";
import { FC } from "react";
import useSWR, { mutate } from "swr";
import { useProfileContext } from "./ProfileContext";
import logoutUser from "@/app/actions/auth/logout/actions";
import classNames from "classnames";
import Link from "next/link";

interface SingleTabProps {
  tab: ProfileTab;
  isActive: boolean;
}

const SingleProfileTab: FC<SingleTabProps> = ({ tab, isActive }) => {
  const router = useRouter();
  const { data: userData } = useSWR<IUserInfo>("/api/user/profile");
  const { setIsAffiliateModalOpen, orderData } = useProfileContext();
  const orderCount = orderData?.pagination?.count ?? 0;

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

  const styles = classNames(
    "font-D16px-M13px w-full cursor-pointer rounded-[5px] p-4 text-left transition-all ease-in-out hover:bg-lightgray",
    tab.id !== 7 ? "hover:text-[#E7461E]" : "text-red",
    isActive && "bg-lightgray font-bold text-[#E7461E]"
  );

  if (tab.id === 7) {
    return (
      <button key={tab.id} className={styles} onClick={handleLogout}>
        {tab.name}
      </button>
    );
  }

  if (tab.id === 6 && !userData?.has_affiliate) {
    return (
      <button className={styles} onClick={() => setIsAffiliateModalOpen(true)}>
        {tab.name + " (Enroll)"}
      </button>
    );
  }

  return (
    <Link href={tab.link!} className={styles}>
      {tab.name} {tab.id == 2 ? ` (${orderCount})` : ""}
    </Link>
  );
};

export default SingleProfileTab;
