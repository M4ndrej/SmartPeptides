"use client";

import { useRouter } from "next/navigation";
import logoutUser from "@/app/actions/auth/logout/actions";
import { mutate } from "swr";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();

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
    <span
      id="logout-btn"
      onClick={handleLogout}
      className={`cursor-pointer select-none ${className}`}
    >
      Log out
    </span>
  );
};

export default LogoutButton;
