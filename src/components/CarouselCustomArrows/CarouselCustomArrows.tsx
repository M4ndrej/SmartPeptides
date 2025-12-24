import { FC } from "react";
import React from "react";
import classNames from "classnames";
import ArrowRightIcon from "../Icons/ArrowRightIcon";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";

interface CarouselProps {
  side: string;
  onClick: () => void;
  hideArrows?: boolean;
  productItemArrows?: boolean;
  slide?: boolean;
  bestSellers?: boolean;
  hideButtons?: boolean;
}

const CarouselCustomArrows: FC<CarouselProps> = ({
  side,
  onClick,
  hideButtons,
  hideArrows,
  productItemArrows,
  slide,
  bestSellers,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={classNames({
        "border-1 absolute flex h-[40px] !min-h-[40px] w-[40px] !min-w-[40px] cursor-pointer items-center justify-center !rounded-[5px] shadow-globalShadow transition duration-300 sm:absolute ":
          true,
        //*Hidden according to design, remove hidden to display on mobile
        "!right-0 translate-x-[50%] sm:!right-[22px]":
          !productItemArrows && side == "right",
        "!left-0 translate-x-[-50%] sm:!left-[22px]":
          !productItemArrows && side == "left",
        "!right-[16px] sm:!right-[10px]": productItemArrows && side === "right",
        "!left-[16px] sm:!left-[10px]": productItemArrows && side === "left",
        "sm:hidden md:hidden": hideArrows,
        "translate-y-[-50%] ": slide,
        "top-[160px]": bestSellers,
        "!hidden": hideButtons,
      })}
    >
      <div className="flex h-[100%] w-[100%] select-none items-center justify-center text-center ">
        {side == "right" ? (
          <>
            <ArrowRightIcon type="slider" />
          </>
        ) : (
          <>
            <ArrowLeftIcon type="slider" />
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselCustomArrows;
