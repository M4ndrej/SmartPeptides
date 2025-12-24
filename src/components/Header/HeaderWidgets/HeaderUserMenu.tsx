import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import LogOutIcon from "../../Icons/LogOutIcon";

interface HeaderUserMenuProps {
  logoutHandler?: () => void;
  className?: string;
}

const HeaderUserMenu: FC<HeaderUserMenuProps> = ({
  logoutHandler,
  className,
}) => {
  return (
    <div
      className={classNames(
        "font-16px-ALL w-[179px] flex-col rounded-[5px] bg-white shadow-globalShadow",
        className
      )}
    >
      <ul className="!m-0 flex w-full list-none flex-col py-2">
        <li className="cursor-pointer px-4 py-2 transition duration-200 hover:text-[#E7461E]">
          <Link href="/profile" prefetch={false}>
            Dashboard
          </Link>
        </li>
        <li className="cursor-pointer px-4 py-2 transition duration-200 hover:text-[#E7461E]">
          <Link href="/profile/orders/" prefetch={false}>
            Orders
          </Link>
        </li>
        <li className="cursor-pointer px-4 py-2 transition duration-200 hover:text-[#E7461E]">
          <Link href="/profile/store-credits/" prefetch={false}>
            Store Credit
          </Link>
        </li>
        <li className="cursor-pointer px-4 py-2 transition duration-200 hover:text-[#E7461E]">
          <Link href="/profile/details" prefetch={false}>
            Account details
          </Link>
        </li>
        <div className="my-2 block h-[1px] w-full bg-borderColor"></div>
        <li className="px-4 py-2">
          <button
            className="group/logout flex cursor-pointer items-center gap-2 transition-colors duration-200 hover:text-red"
            onClick={logoutHandler}
          >
            <LogOutIcon className="transition-colors duration-200 group-hover/logout:!fill-red" />
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderUserMenu;
