import classNames from "classnames";
import { FC } from "react";

const isDotActive = (
  dotIndex: number,
  activeIndex: number,
  perView: number
) => {
  return (
    activeIndex >= dotIndex * perView &&
    activeIndex < dotIndex * perView + perView
  );
};

interface SliderDotsProps {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  totalSlides: number;
  perView: number;
  className?: string;
}

const SliderDots: FC<SliderDotsProps> = ({
  setActiveIndex,
  activeIndex,
  totalSlides,
  perView,
  className,
}) => {
  const dotCount = Math.ceil(totalSlides / perView);
  return (
    <div
      className={classNames(
        "flex w-full max-w-max flex-row justify-center gap-4",
        className
      )}
    >
      {Array.from({ length: dotCount }).map((_, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index * perView)}
          className={classNames(
            "h-[10px] w-[10px] cursor-pointer rounded-full",
            isDotActive(index, activeIndex, perView)
              ? "bg-[#E7461E]"
              : "bg-[#FFE9E3] dark:bg-transparent"
          )}
        />
      ))}
    </div>
  );
};

export default SliderDots;
