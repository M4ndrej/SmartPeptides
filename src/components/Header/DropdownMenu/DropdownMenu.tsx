import Link from "next/link";
import { FC } from "react";

interface DropdownMenuProps {
  logoutHandler?: () => void;
  fromNav?: boolean;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ logoutHandler }) => {
  return (
    <div className="font-16px-ALL absolute left-[-56px] top-[24px] hidden w-[179px]  flex-col rounded-[5px] bg-white py-[16px] opacity-0 shadow-globalShadow before:absolute before:left-0 before:top-[-20px] before:h-[35px] before:w-full before:bg-transparent  before:content-none group-hover/dropdown:!z-[10] group-hover/dropdown:!flex group-hover/dropdown:opacity-100 sm:left-[-160px] xl:left-[calc(50%+2px)] xl:translate-x-[-50%]">
      <ul className="flex w-full list-none flex-col gap-[15px] px-[16px]">
        <Link href={{ pathname: "/profile" }} prefetch={false}>
          <li className="cursor-pointer transition duration-200 hover:text-[#333333]">
            Dashboard
          </li>
        </Link>
        <Link href={{ pathname: "/profile/orders/" }} prefetch={false}>
          <li className="cursor-pointer transition duration-200 hover:text-[#333333]">
            Orders
          </li>
        </Link>
        <Link href={{ pathname: "/profile/store-credits/" }} prefetch={false}>
          <li className="cursor-pointer transition duration-200 hover:text-[#333333]">
            Store Credit
          </li>
        </Link>
        <Link href={{ pathname: "/profile/details" }} prefetch={false}>
          <li className="cursor-pointer transition duration-200 hover:text-[#333333]">
            Account details
          </li>
        </Link>
      </ul>
      <div className="mb-[10px] mt-[15px] block h-[1px] w-full bg-gray4"></div>
      <div
        className="group/logout flex cursor-pointer items-center gap-[8px] px-[16px] transition duration-200 hover:text-red"
        onClick={() => logoutHandler?.()}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition duration-200 group-hover/logout:fill-red"
            d="M22.7152 19.9852C22.7047 20.3592 22.6191 20.7272 22.4636 21.0674C22.3081 21.4076 22.0858 21.7131 21.8099 21.9657C21.5341 22.2183 21.2102 22.413 20.8577 22.538C20.5051 22.663 20.1311 22.7159 19.7577 22.6936C17.4253 22.7066 15.0928 22.6936 12.7604 22.6936C12.6168 22.6936 12.479 22.6365 12.3774 22.5349C12.2758 22.4333 12.2188 22.2956 12.2188 22.1519C12.2188 22.0083 12.2758 21.8705 12.3774 21.7689C12.479 21.6673 12.6168 21.6102 12.7604 21.6102C15.1437 21.6102 17.5271 21.6449 19.9104 21.6102C21.1097 21.5929 21.6318 20.6916 21.6318 19.6191V6.1175C21.6402 5.77653 21.5443 5.44114 21.3569 5.15617C21.1695 4.87121 20.8995 4.65024 20.5832 4.52283C20.2091 4.42076 19.82 4.38591 19.4337 4.41991H12.7604C12.6168 4.41991 12.479 4.36285 12.3774 4.26126C12.2758 4.15968 12.2188 4.02191 12.2188 3.87825C12.2188 3.73459 12.2758 3.59681 12.3774 3.49523C12.479 3.39365 12.6168 3.33658 12.7604 3.33658C15.1697 3.33658 17.5975 3.2445 20.0047 3.33658C20.3733 3.3459 20.7364 3.42844 21.0728 3.5794C21.4092 3.73036 21.7123 3.94672 21.9643 4.21589C22.2164 4.48506 22.4123 4.80167 22.5409 5.14729C22.6694 5.49291 22.7279 5.86064 22.713 6.22908L22.7152 19.9852Z"
            fill="#999999"
          />
          <path
            className="transition duration-200 group-hover/logout:fill-red"
            d="M3.43994 12.635C3.34841 12.7237 3.29483 12.8445 3.29044 12.9719C3.29044 12.9881 3.29044 13.0022 3.28394 13.0185C3.27744 13.0347 3.28394 13.0477 3.29044 13.0629C3.29478 13.1906 3.34835 13.3117 3.43994 13.4009L7.41469 17.3756C7.51685 17.4743 7.65368 17.5289 7.7957 17.5277C7.93772 17.5264 8.07358 17.4695 8.17401 17.369C8.27444 17.2686 8.33141 17.1327 8.33264 16.9907C8.33388 16.8487 8.27928 16.7119 8.18061 16.6097L5.13103 13.559H16.7682C16.9119 13.559 17.0496 13.502 17.1512 13.4004C17.2528 13.2988 17.3099 13.161 17.3099 13.0174C17.3099 12.8737 17.2528 12.7359 17.1512 12.6344C17.0496 12.5328 16.9119 12.4757 16.7682 12.4757H5.13103L8.18061 9.42505C8.27928 9.32289 8.33388 9.18606 8.33264 9.04404C8.33141 8.90202 8.27444 8.76616 8.17401 8.66573C8.07358 8.5653 7.93772 8.50833 7.7957 8.5071C7.65368 8.50587 7.51685 8.56046 7.41469 8.65913L3.43994 12.635Z"
            fill="#999999"
          />
        </svg>
        Log out
      </div>
    </div>
  );
};

export default DropdownMenu;
