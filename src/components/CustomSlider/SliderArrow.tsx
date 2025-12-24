"use client";

import classNames from "classnames";
import { FC, MouseEvent } from "react";
import ArrowLeft from "../Icons/ArrowLeft";
import ArrowRight from "../Icons/ArrowRight";

export type SliderArrowType = "left" | "right" | "top" | "bottom";

interface SliderArrowProps {
  type: SliderArrowType;
  activeIndex: number;
  totalSlides: number;
  slidesPerView: number;
  handleChangeSlide: () => void;
  className?: string;
  arrowClassName?: string;
  translateMod?: number;
  responsive?: boolean;
  alignToEnd?: boolean;
}

const SliderArrow: FC<SliderArrowProps> = ({
  type,
  activeIndex,
  totalSlides,
  slidesPerView,
  handleChangeSlide,
  className,
  arrowClassName,
  alignToEnd = false,
  responsive = false,
  translateMod = 0,
}) => {
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleChangeSlide();
  };

  const prevSlideHidden =
    activeIndex < Math.max(slidesPerView - translateMod, 1);
  const nextSlideHidden =
    activeIndex > Math.min(totalSlides - slidesPerView - 1, totalSlides - 2);

  const isHidden =
    (type === "left" && prevSlideHidden) ||
    (type === "right" && nextSlideHidden) ||
    (type === "top" && prevSlideHidden) ||
    (type === "bottom" && nextSlideHidden);

  const arrowClasses = classNames(
    "!stroke-white transition-colors duration-200 h-10 w-10",
    responsive && "sm:h-6 sm:w-6"
  );

  return (
    <button
      aria-label={`Slider ${type} arrow`}
      type="button"
      className={classNames(
        "absolute flex select-none items-center justify-center rounded-[5px] bg-sliderArrowBg shadow-globalShadow transition-colors duration-200 hover:bg-sliderNavBtnBlueHover ",
        type === "left" && alignToEnd && "!left-0",
        type === "left" && "left-3 top-1/2 -translate-y-1/2",
        type === "right" && alignToEnd && "!right-0",
        type === "right" && "right-3 top-1/2 -translate-y-1/2",
        type === "top" && "left-1/2 top-3 -translate-x-1/2",
        type === "bottom" && "bottom-3 left-1/2 -translate-x-1/2",
        isHidden && "hidden",
        responsive && "sm:!rounded-[3px]",
        className
      )}
      onClick={onClick}
    >
      {type === "left" ? (
        <ArrowLeft className={classNames(arrowClasses, arrowClassName)} />
      ) : type === "right" ? (
        <ArrowRight className={classNames(arrowClasses, arrowClassName)} />
      ) : type === "top" ? (
        <ArrowLeft
          className={classNames("rotate-90", arrowClasses, arrowClassName)}
        />
      ) : type === "bottom" ? (
        <ArrowRight
          className={classNames("rotate-90", arrowClasses, arrowClassName)}
        />
      ) : null}
    </button>
  );
};

export default SliderArrow;
