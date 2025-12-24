import { FC } from "react";
import classNames from "classnames";
import Link from "next/link";

interface AffiliateDropdown {
  closePopover?: () => void;
  activePage?: string;
}

const AffiliateDropdown: FC<AffiliateDropdown> = ({
  closePopover,
  activePage,
}) => {
  return (
    <div className="absolute right-[14px] top-[9px] z-10 flex items-center">
      <div className="opendrop-content absolute left-[-115px] top-[27px] flex h-0 w-[180px] flex-col gap-[16px] overflow-hidden rounded-[5px]  border-transparent bg-white shadow-globalShadow transition duration-300 ease-linear before:absolute before:top-[-15px] before:h-[20px] before:w-full before:bg-transparent before:content-[''] group-hover:h-[96px] group-hover:overflow-visible group-hover:border md:relative md:left-0 md:translate-x-[-155px]">
        <Link
          href="/affiliate-register"
          onClick={() => (closePopover ? closePopover() : {})}
          className={classNames({
            "font-16px-ALL after:contnet-[''] relative mt-[16px] cursor-pointer px-[16px] duration-300 hover:text-[#E7461E]":
              true,
            "!text-[#E7461E] after:w-[142px]":
              activePage === "/affiliate-register",
          })}
        >
          Affiliate Register
        </Link>
        <Link
          href="/affiliate-login"
          onClick={() => (closePopover ? closePopover() : {})}
          className={classNames({
            "font-16px-ALL after:contnet-[''] relative mb-[16px] cursor-pointer px-[16px] duration-300 hover:text-[#E7461E]":
              true,
            "!text-[#E7461E] after:w-[119px]":
              activePage === "/affiliate-login",
          })}
        >
          Affiliate Login
        </Link>
        {/* <Link
          href="/affiliate-home"
          onClick={() => (closePopover ? closePopover() : {})}
          className={classNames({
            "font-16px-ALL after:contnet-[''] relative mb-[16px] cursor-pointer px-[16px] duration-300 hover:text-[#E7461E]":
              true,
            "!text-[#E7461E] after:w-[124px]": activePage === "/affiliate-home",
          })}
        >
          Store Affiliates
        </Link> */}
      </div>
    </div>
  );
};

export default AffiliateDropdown;
