import { FC } from "react";
import BuyOneGetOneLabel from "./BuyOneGetOneLabel";
import classNames from "classnames";

interface BuyOneGetOneCardProps {
  section?: string;
  viewMode?: string;
}

const BuyOneGetOneCard: FC<BuyOneGetOneCardProps> = ({ viewMode, section }) => {
  return (
    <BuyOneGetOneLabel
      className={classNames(
        "absolute z-[2] sm:left-[20%] sm:top-[60px] sm:h-[70px] sm:w-[70px] md:left-[20%] md:top-[85px] md:h-[80px] md:w-[80px] lg:left-[10%] lg:top-[80px] lg:h-[80px] lg:w-[80px]",
        !section &&
          viewMode === "5x5" &&
          "xl:left-[28px] xl:top-[65px] xl:h-[80px] xl:w-[80px]",
        (section === "slider" ||
          section === "slider-dots" ||
          viewMode === "4x4") &&
          "xl:left-8 xl:top-[88px] xl:h-[100px] xl:w-[100px]",
        !section &&
          viewMode === "3x3" &&
          "lg:!left-10 lg:!top-[103px] lg:!h-[136px] lg:!w-[136px] xl:left-10 xl:top-[103px] xl:h-[136px] xl:w-[136px]",
        !section &&
          viewMode === "rows" &&
          "!left-8 !top-[110px] !h-[112px] !w-[112px]",
        section === "ourProducts" &&
          "xl:left-12 xl:top-[90px] xl:h-[100px] xl:w-[100px]",
        section === "mega-menu" &&
          "sm:!left-6 sm:!top-[60px] sm:!h-[64px] sm:!w-[64px] md:!left-8 md:!top-[65px] md:!h-[80px] md:!w-[80px] lg:!left-12 lg:!top-[90px] lg:!h-[100px] lg:!w-[100px] xl:!left-6 xl:!top-[53px] xl:!h-[64px] xl:!w-[64px] "
      )}
    />
  );
};

export default BuyOneGetOneCard;
