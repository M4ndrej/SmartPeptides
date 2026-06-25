import classNames from "classnames";
import { FC } from "react";

interface SliderDotsLineProps {
  setActiveIndex: (index: number) => void;
  activeIndex: number;
  totalSlides: number;
  perView: number;
  className?: string;
}

const SliderDotsLine: FC<SliderDotsLineProps> = ({
  setActiveIndex,
  activeIndex,
  totalSlides,
  perView,
  className,
}) => {
  const dotCount = Math.ceil(totalSlides / perView);
  const width = 100 / dotCount;
  const translate = (activeIndex / perView) * 100;
  return (
    <div
      className={classNames(
        "flex h-[5px] w-[180px] flex-row justify-center gap-0 overflow-hidden rounded-full sm:w-[calc(100%-32px)]",
        className
      )}
    >
      <div
        className="absolute left-0 top-0 z-[1] h-[5px] rounded-full bg-[#9A9A9F] transition-transform duration-300 ease-in-out"
        style={{
          width: `${width.toFixed(2)}%`,
          transform: `translateX(${translate.toFixed(2)}%)`,
        }}
      />
      {Array.from({ length: dotCount }).map((_, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index * perView)}
          className={classNames("h-[5px] cursor-pointer bg-gray")}
          style={{
            width: `${width.toFixed(2)}%`,
          }}
        />
      ))}
    </div>
  );
};

export default SliderDotsLine;
