"use client";

import classNames from "classnames";
import { FC, ReactNode } from "react";
import BannerTitle from "./BannerTitle";

interface BannerWrapperProps {
  children: ReactNode;
  title: string;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  bannerColor?: string;
  titleColor?: string;
}

const BannerWrapper: FC<BannerWrapperProps> = ({
  children,
  title,
  className,
  bgColor,
  borderColor,
  bannerColor,
  titleColor,
}) => {
  return (
    <div
      className={classNames(
        "relative w-full rounded-[5px] border-[1px] border-solid px-4 pb-4 pt-14",
        className
      )}
      style={{
        borderColor: borderColor ?? "transparent",
        backgroundColor: bgColor ?? "transparent",
      }}
    >
      <BannerTitle
        title={title}
        bannerColor={bannerColor}
        titleColor={titleColor}
      />
      {children}
    </div>
  );
};

export default BannerWrapper;
