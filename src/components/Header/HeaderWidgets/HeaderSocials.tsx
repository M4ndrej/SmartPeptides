import Link from "next/link";
import FacebookIcon from "../../Icons/FacebookIcon";
import InstagramIcon from "../../Icons/InstagramIcon";
import PhoneIcon from "../../Icons/PhoneIcon";
import { FC } from "react";
import classNames from "classnames";

interface HeaderSocialsProps {
  className?: string;
}

const HeaderSocials: FC<HeaderSocialsProps> = ({ className }) => {
  return (
    <div
      className={classNames("flex items-center justify-end gap-6", className)}
    >
      {/* <div className="flex items-center justify-end gap-2 sm:gap-1 lg:order-last">
        <Link href="https://www.facebook.com/peptide.city/" target="_blank">
          <FacebookIcon className="transition-colors duration-300 hover:fill-[#E7461E]" />
        </Link>
        <Link href="https://www.instagram.com/peptide.city/" target="_blank">
          <InstagramIcon className="transition-colors duration-300 hover:fill-[#E7461E]" />
        </Link>
      </div> */}
      {/* <Link
        href="tel:+18662027786"
        className="group/phone flex items-center justify-start gap-1 sm:hidden lg:order-first"
      >
        <PhoneIcon className="transition-colors duration-300 group-hover/phone:fill-[#E7461E]" />
        <span className="font-12px-ALL text-black transition-colors duration-300 group-hover/phone:text-[#E7461E]">
          (866) 202-7786
        </span>
      </Link> */}
    </div>
  );
};

export default HeaderSocials;
