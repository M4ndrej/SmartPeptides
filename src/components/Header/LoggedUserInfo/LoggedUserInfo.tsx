import { fetcher } from "@/helpers/fetchers";
import classNames from "classnames";
import { FC } from "react";
import useSWR from "swr";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useRouter } from "next/navigation";

type LoggedUserInfoType = {
  logoutHandler?: () => void;
  openModal?: (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<SVGElement>
  ) => void;
  inSidebar?: boolean;
  openLoginModal?: () => void;
  openRegisterModal?: () => void;
  closePopover?: () => void;
};

const LoggedUserInfo: FC<LoggedUserInfoType> = ({
  logoutHandler,
  openModal,
  inSidebar,
  openLoginModal,
  openRegisterModal,
  closePopover,
}) => {
  const { data: userData } = useSWR("/api/user/", fetcher);
  const { user } = userData || { user: {} };
  const router = useRouter();

  const handleOpenProfile = () => {
    closePopover && closePopover();
    setTimeout(() => {
      router.push("/profile");
    }, 500);
  };

  return (
    <div
      className={classNames({
        "relative flex h-[37px] items-center justify-between sm:h-[27px]": true,
        "group/dropdown": user?.username,
        "sm:absolute sm:right-[8px] sm:top-[11px] sm:w-[24px]": !inSidebar,
      })}
      // onClick={() => loggedUser && handleOpenProfile()}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames({
          "pointer-events-none mr-[5px] sm:pointer-events-auto sm:h-[24px] sm:w-[24px]":
            true,
          "sm:mr-0 sm:translate-y-[-8px]": !inSidebar,
          "sm:!h-[32px] sm:!w-[32px]": inSidebar,
        })}
        onClick={
          !user?.username
            ? openModal
            : () => {
                return;
              }
        }
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 8.5C15 10.433 13.433 12 11.5 12C9.567 12 8 10.433 8 8.5C8 6.567 9.567 5 11.5 5C13.433 5 15 6.567 15 8.5ZM13.8404 12.3442C15.1355 11.5541 16 10.128 16 8.5C16 6.01472 13.9853 4 11.5 4C9.01472 4 7 6.01472 7 8.5C7 10.128 7.86454 11.5541 9.15955 12.3442C6.72582 12.982 4 14.4759 4 16.5714C4 18.465 5.53502 20 7.42857 20H15.5714C17.465 20 19 18.465 19 16.5714C19 14.4759 16.2742 12.982 13.8404 12.3442ZM4.83333 16.5714C4.83333 16.3594 4.925 16.0126 5.34292 15.5497C5.75167 15.0977 6.36083 14.6669 7.09917 14.2943C8.575 13.5497 10.3529 13.1429 11.5 13.1429C12.6471 13.1429 14.425 13.5497 15.9008 14.2943C16.6392 14.6669 17.2483 15.0977 17.6567 15.5497C18.075 16.012 18.1667 16.36 18.1667 16.5714C18.1667 17.8338 17.1433 18.8571 15.881 18.8571H7.11905C5.85668 18.8571 4.83333 17.8338 4.83333 16.5714Z"
          className={classNames("fill-textWhite")}
        />
      </svg>
      {!user?.username ? (
        <div
          className={classNames({
            "font-13px-ALL flex leading-[16px] text-textWhite": true,
            "sm:hidden": !inSidebar,
          })}
        >
          <div
            className="transiton-text login-btn cursor-pointer duration-300"
            onClick={inSidebar && openLoginModal ? openLoginModal : openModal}
            aria-controls={"Initial"}
          >
            Login
          </div>
          <span className="mx-[5px]">/</span>{" "}
          <div
            className="transiton-text register-btn cursor-pointer duration-300"
            onClick={
              inSidebar && openRegisterModal ? openLoginModal : openModal
            }
            aria-controls="Initial"
          >
            Register
          </div>
        </div>
      ) : (
        <div
          className={classNames({
            "transiton-text font-13px-ALL relative cursor-pointer leading-[16px] text-textWhite duration-300 ":
              true,
            "sm:hidden": !inSidebar,
          })}
          onClick={inSidebar ? handleOpenProfile : () => {}}
        >
          {user?.firstname || user?.username} {user?.lastname}
        </div>
      )}
      {user?.username && !inSidebar && (
        <DropdownMenu logoutHandler={logoutHandler} />
      )}
    </div>
  );
};

export default LoggedUserInfo;
