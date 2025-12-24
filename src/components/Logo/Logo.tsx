"use client";
import { useThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  customClass?: string;
  size?: string;
  className?: string;
}

const Logo: FC<LogoProps> = ({
  width,
  height,
  customClass,
  size,
  className,
}) => {
  const { state } = useThemeContext();
  const isDark = state?.darkMode ?? false;

  return (
    <Link href="/">
      <Image
        src={
          !isDark
            ? "/images/valuepeptide-logo.svg"
            : "/images/valuepeptide-logo.svg"
        }
        width={width ? width : 288}
        height={height ? height : 37}
        priority={true}
        alt="Logo"
        className={classNames(
          size === "small" && "select-none sm:h-[29px]",
          customClass == "headerLogo" &&
            "cursor-pointer select-none sm:h-[21px] sm:w-[163px]",
          className
        )}
      />
    </Link>
  );
};

export default Logo;
