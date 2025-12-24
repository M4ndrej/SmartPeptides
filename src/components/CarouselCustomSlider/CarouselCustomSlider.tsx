import React from "react";

const CarouselCustomSlider = ({ ...props }) => {
  const currentSlide = props.carouselState.currentSlide;
  const deviceType = props.carouselState.deviceType;
  const showDots = props.showDots;
  const leftPercent =
    currentSlide == 0
      ? "left-[0%]"
      : currentSlide == 1
        ? "left-[8.33%]"
        : currentSlide == 2
          ? "left-[16.66%]"
          : currentSlide == 3
            ? "left-[25%]"
            : currentSlide == 4
              ? "left-[33.33%]"
              : currentSlide == 5
                ? "left-[41.66%]"
                : currentSlide == 6
                  ? "left-[50%]"
                  : currentSlide == 7
                    ? "left-[58.33%]"
                    : currentSlide == 8
                      ? "left-[66.66%]"
                      : currentSlide == 9
                        ? "left-[75%]"
                        : currentSlide == 10
                          ? "left-[83.33%]"
                          : "left-[91.66%]";
  const widthPercent = deviceType == "mobile" ? "w-[8.33%]" : "w-[33.3%]";

  return (
    <div
      className={`relative m-auto mt-[13px] h-[5px] w-[180px] rounded-[6px] bg-gray sm:w-full ${
        showDots ? "hidden" : "block"
      }`}
    >
      <div
        className={`t-0 absolute h-[5px] rounded-[5px] bg-[#E7461E] transition-all duration-300 ${widthPercent} ${leftPercent}`}
      ></div>
    </div>
  );
};

export default CarouselCustomSlider;
