import classNames from "classnames";
import { FC, MouseEvent } from "react";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import ArrowRightIcon from "../Icons/ArrowRightIcon";

export type CardSliderArrowType = "left" | "right" | "top" | "bottom";

interface CardSliderArrowProps {
  type: CardSliderArrowType;
  activeIndex: number;
  totalSlides: number;
  handleChangeSlide: () => void;
}

const CardSliderArrow: FC<CardSliderArrowProps> = ({
  type,
  activeIndex,
  totalSlides,
  handleChangeSlide,
}) => {
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleChangeSlide();
  };

  const isHidden =
    totalSlides <= 4 ||
    (type === "left" && activeIndex <= 1) ||
    (type === "right" && activeIndex >= totalSlides - 2);

  return (
    <button
      type="button"
      className={classNames(
        "group/carouselArrow absolute bottom-0 top-0 flex w-4 items-center justify-center overflow-hidden bg-borderGray transition-colors duration-200 hover:bg-black",
        type === "right" ? "right-0" : "left-0",
        isHidden && "hidden"
      )}
      onClick={onClick}
    >
      {type === "left" ? (
        <ArrowLeftIcon
        // strokeWidth={1.5}
        // className="h-8 w-8 shrink-0 !stroke-black transition-colors duration-200 group-hover/carouselArrow:!stroke-white"
        />
      ) : (
        <ArrowRightIcon
        // strokeWidth={1.5}
        // className="h-8 w-8 shrink-0 !stroke-black transition-colors duration-200 group-hover/carouselArrow:!stroke-white"
        />
      )}
    </button>
  );
};

export default CardSliderArrow;
