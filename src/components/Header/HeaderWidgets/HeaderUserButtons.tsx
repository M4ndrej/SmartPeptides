"use client";

import { FC, useRef } from "react";
import UserIcon from "../../Icons/UserIcon";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/navigation";
import logoutUser from "@/app/actions/auth/logout/actions";
import HeaderUserMenu from "./HeaderUserMenu";
import classNames from "classnames";
import { LoggedUserData } from "@/types/user";
import { useModalContext } from "@/context/ModalContext";
import useHover from "@/hooks/useHover";

interface HeaderUserButtonsProps {
  isJustIcon?: boolean;
  showMenu?: boolean;
}

const HeaderUserButtons: FC<HeaderUserButtonsProps> = ({
  isJustIcon,
  showMenu = true,
}) => {
  const router = useRouter();
  const { openModal } = useModalContext();

  const { data: userData } = useSWR<LoggedUserData>("/api/user/", fetcher);
  const user = userData?.user ?? null;
  const isLogged = !!user?.username;

  const hoverRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover(hoverRef);

  const openLoginModal = () => {
    openModal("Initial");
  };

  const openProfile = () => {
    setTimeout(() => {
      router.push("/profile");
    }, 500);
  };

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
    <div
      ref={hoverRef}
      className="group/usermenu relative flex items-center justify-center gap-1"
    >
      <UserIcon
        width={24}
        height={24}
        className={classNames(
          isJustIcon ? "!sm:h-5 !sm:w-5 !h-6 !w-6 fill-black" : ""
        )}
        onClick={isJustIcon && !isLogged ? openLoginModal : undefined}
      />

      {!isJustIcon &&
        (isLogged ? (
          <div
            className="transiton-text font-13px-ALL relative cursor-pointer duration-300 hover:text-[#333333]"
            onClick={openProfile}
          >
            {user?.firstname || user?.username} {user?.lastname}
          </div>
        ) : (
          <button
            aria-controls="Initial"
            className="font-13px-ALL flex items-center justify-center"
            onClick={openLoginModal}
          >
            <span className="transiton-text login-btn cursor-pointer duration-300 hover:text-[#333333]">
              Login
            </span>
            <span className="mx-1">/</span>
            <span className="transiton-text login-btn cursor-pointer duration-300 hover:text-[#333333]">
              Register
            </span>
          </button>
        ))}
      {isLogged && (
        <HeaderUserMenu
          logoutHandler={handleLogout}
          className={classNames(
            "absolute top-[24px] z-10 flex transition-all duration-300 ease-in-out sm:fixed sm:!left-auto sm:right-[12px] sm:top-[28px] xl:left-[calc(50%+2px)] xl:translate-x-[-50%]",
            isHovering && showMenu
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0",
            isJustIcon ? "left-[-155px]" : "left-[-56px]"
          )}
        />
      )}
    </div>
  );
};

export default HeaderUserButtons;
