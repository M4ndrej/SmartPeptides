"use client";

import { ThemeContext } from "@/context/theme-provider";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { FC, useContext } from "react";

interface GridViewProps {
  children: React.ReactNode;
  fixedMode?: string;
  ourProductsGrid?: boolean;
  searchGrid?: boolean;
}

const GridView: FC<GridViewProps> = ({
  children,
  fixedMode,
  ourProductsGrid,
  searchGrid,
}) => {
  const appContext: any = useContext(ThemeContext);
  const { viewMode } = appContext.state;

  const activePath = usePathname().replaceAll("/", "");
  const shopPage = [
    "shop",
    "peptides",
    "blends",
    "cosmetic",
    "supplies",
  ].includes(activePath);

  const activeViewMode = fixedMode ? fixedMode : shopPage ? viewMode : "5x5";

  return (
    <div
      className={classNames({
        "grid gap-x-[10px] gap-y-[24px] sm:!grid-cols-2 sm:gap-x-[4px] sm:gap-y-[24px] xl:gap-x-[16px]":
          true,
        "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5":
          activeViewMode == "5x5" && !ourProductsGrid,
        "!grid-cols-4 md:!grid-cols-3":
          activeViewMode == "4x4" || fixedMode == "4x4",
        "grid-cols-3-custom md:!grid-cols-3 lg:!grid-cols-3":
          activeViewMode == "3x3" || fixedMode == "3x3",
        "!grid-cols-2": fixedMode == "2x2",
        "grid-cols-1": activeViewMode == "rows",
        "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3":
          ourProductsGrid,
        "md:grid-cols-3 lg:grid-cols-4 xl:!grid-cols-4": searchGrid,
      })}
    >
      {children}
    </div>
  );
};

export default GridView;
