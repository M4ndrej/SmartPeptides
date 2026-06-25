import { FC } from "react";

interface CustomProgressBarProps {
  currentSlide?: number;
}

const CustomProgressBar: FC<CustomProgressBarProps> = ({ currentSlide }) => {
  const leftPercent =
    currentSlide == 0
      ? "left-[0%]"
      : currentSlide == 1
        ? "left-[8.33%] md:left-[4.17%]"
        : currentSlide == 2
          ? "left-[16.66%] md:left-[12.33%]"
          : currentSlide == 3
            ? "left-[25%] md:left-[20.77%]"
            : currentSlide == 4
              ? "left-[33.33%] md:left-[28.77%]"
              : currentSlide == 5
                ? "left-[41.66%] md:left-[37.33%]"
                : currentSlide == 6
                  ? "left-[50%] md:left-[45.77%]"
                  : currentSlide == 7
                    ? "left-[58.33%] md:left-[54%]"
                    : currentSlide == 8
                      ? "left-[66.66%] md:left-[62.33%]"
                      : currentSlide == 9
                        ? "left-[75%] md:left-[66.66%]"
                        : currentSlide == 10
                          ? "left-[83.33%]"
                          : "left-[91.66%]";
  return (
    <div
      className={`relative m-auto h-[5px] w-[180px] rounded-[6px] bg-gray sm:mt-[13px] sm:w-[94%] from834:mt-[13px] `}
    >
      <div
        className={`t-0 absolute h-[5px] w-[33.33%] rounded-[5px] bg-[#9A9A9F] transition-all duration-300 sm:w-[16.66%]  ${leftPercent}`}
      ></div>
    </div>
  );
};

export default CustomProgressBar;
