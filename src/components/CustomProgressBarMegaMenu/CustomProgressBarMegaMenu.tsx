import { FC } from "react";

interface CustomProgressBarMegaMenuProps {
  currentSlide?: number;
}

const CustomProgressBarMegaMenu: FC<CustomProgressBarMegaMenuProps> = ({
  currentSlide,
}) => {
  const leftPercent =
    currentSlide == 0
      ? "left-[0%]"
      : currentSlide == 1
        ? "left-[25%]"
        : currentSlide == 2
          ? "left-[40%]"
          : "left-[83%]";

  return (
    <div
      className={`relative m-auto mt-[13px] h-[5px] w-[180px] rounded-[6px] bg-gray sm:w-[93%] `}
    >
      <div
        className={`t-0 absolute h-[5px] w-[33.33%] rounded-[5px] bg-[#9A9A9F] transition-all duration-300 sm:w-[16.66%]  ${leftPercent}`}
      ></div>
    </div>
  );
};

export default CustomProgressBarMegaMenu;
