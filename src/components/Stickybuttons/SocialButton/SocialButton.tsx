import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface SocialButtonProps {
  type: string;
  goTo: string;
}

const SocialButton: FC<SocialButtonProps> = ({ type, goTo }) => {
  return (
    <Link
      href={goTo}
      target="_blank"
      className={classNames({
        "group relative h-[52px] w-[52px] items-center justify-center rounded-[52px] shadow-globalShadow transition duration-200 sm:hidden md:hidden from834:hidden lg:hidden xl:flex":
          true,
        "bg-[#465B94]": type === "fb",
        "bg-darkgray": type === "instagram",
      })}
    >
      <div className="z-[1] flex h-full w-full cursor-pointer items-center justify-center rounded-[52px] text-center">
        <Image
          src={
            type === "fb"
              ? "/images/fbWhiteIcon.svg"
              : "/images/instaWhiteIcon.svg"
          }
          width={24}
          height={24}
          alt="instagram icon"
          className="select-none"
        />
      </div>
      <div
        className={classNames({
          "font-16px-ALL ease-[cubic-bezier(0.11, 0, 0.5, 0)] pointer-events-none absolute right-0 top-0 flex h-[52px] origin-right scale-x-[.7] select-none items-center whitespace-nowrap rounded-[52px] font-medium text-textWhite opacity-0 transition duration-100 group-hover:pointer-events-auto group-hover:scale-x-[1] group-hover:opacity-100":
            true,
          "bg-[#465B94] pl-[103px] pr-[50px] ": type === "fb",
          "bg-darkgray pl-[33px] pr-[53px] ": type === "instagram",
        })}
      >
        {type === "fb" && (
          <Image
            src="/images/socialLikeIcon.svg"
            width={67}
            height={28}
            alt="facebook like"
            className="absolute left-[26px] top-[12px] z-[11] select-none bg-white"
          />
        )}
        {type === "instagram" && <p>Follow</p>}
      </div>
    </Link>
  );
};

export default SocialButton;
