"use client";

import { useThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import { FC, ReactElement } from "react";

type BlogCardShowModeProps = {
  children: ReactElement;
};

const BlogCardShowMode: FC<BlogCardShowModeProps> = ({ children }) => {
  const themeContext: any = useThemeContext();
  const { blogViewMode } = themeContext.state;
  return (
    <div
      className={classNames({
        "border-1 relative mb-[16px] overflow-hidden border border-gray transition-all duration-300 [&_img]:hover:scale-[1.1]":
          true,
        "pointer-events-none mb-0 h-0 border-0 opacity-0":
          blogViewMode == "text",
        "border-1 opacity-1 pointer-events-auto mb-[16px] h-[290px] sm:h-[358px] md:h-[auto]":
          blogViewMode == "image",
      })}
    >
      {children}
    </div>
  );
};

export default BlogCardShowMode;
