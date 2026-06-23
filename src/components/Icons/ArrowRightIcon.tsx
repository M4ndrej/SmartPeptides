import classNames from "classnames";
import { FC } from "react";
interface ArrowRightProps {
  className?: string;
  type?: string;
}

const ArrowRightIcon: FC<ArrowRightProps> = ({ type, className }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames({
        "[&_path]:transition [&_path]:duration-200": true,
        "[&_path]:hover:!fill-sliderNavBtnBlueHover [&_path]:sm:!fill-sliderArrowBg [&_path]:sm:hover:!fill-darkgray":
          type === "home-slider",
        "[&_path]:hover:!fill-darkgray": type === "slider",
        "[&_path]:hover:!fill-gray2": type === "switch-prod",
        "[&_path]:hover:!fill-dark-blue": type === "email-code",
      })}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 40L35 40C37.76 40 40 37.76 40 35L40 5.00001C40 2.24001 37.76 6.60217e-06 35 6.11959e-06L5.00001 8.74228e-07C2.24001 3.91654e-07 6.60217e-06 2.24 6.11959e-06 5L8.74229e-07 35C3.91655e-07 37.76 2.24 40 5 40ZM15.2992 28.2373C15.6312 28.565 16.1696 28.565 16.5016 28.2373L24.6648 20.1811C24.695 20.1584 24.724 20.1334 24.7516 20.1062C25.0836 19.7785 25.0836 19.2472 24.7516 18.9196L16.452 10.7288C16.12 10.4011 15.5817 10.4011 15.2496 10.7288C14.9176 11.0565 14.9176 11.5878 15.2496 11.9154L22.9425 19.5075L15.2992 27.0506C14.9672 27.3783 14.9672 27.9096 15.2992 28.2373Z"
        className={classNames("fill-[#E3E3E3] dark:fill-[#3E3E3E]", {
          "!fill-[#AFD6F6]": type === "home-slider",
          "!fill-[#565656]": type === "slider",
          "!fill-[#333333]": type === "email-code",
        })}
      />
    </svg>
  );
};

export default ArrowRightIcon;
