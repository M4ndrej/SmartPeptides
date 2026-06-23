import classNames from "classnames";
import { FC } from "react";
interface ArrowLeftIconProps {
  className?: string;
  type?: string;
}

const ArrowLeftIcon: FC<ArrowLeftIconProps> = ({ type, className }) => {
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
        d="M35 40L5 40C2.24 40 -3.91654e-07 37.76 -8.74228e-07 35L-6.11959e-06 5.00001C-6.60217e-06 2.24001 2.23999 6.60217e-06 4.99999 6.11959e-06L35 8.74228e-07C37.76 3.91654e-07 40 2.24 40 5L40 35C40 37.76 37.76 40 35 40ZM24.7008 28.2373C24.3688 28.565 23.8304 28.565 23.4984 28.2373L15.3352 20.1811C15.305 20.1584 15.276 20.1334 15.2484 20.1062C14.9164 19.7785 14.9164 19.2472 15.2484 18.9196L23.548 10.7288C23.88 10.4011 24.4183 10.4011 24.7504 10.7288C25.0824 11.0565 25.0824 11.5878 24.7504 11.9154L17.0575 19.5075L24.7008 27.0506C25.0328 27.3783 25.0328 27.9096 24.7008 28.2373Z"
        className={classNames("fill-[#E3E3E3] dark:fill-[#3E3E3E]", {
          "!fill-[#AFD6F6]": type === "home-slider",
          "!fill-[#565656]": type === "slider",
          "!fill-[#333333]": type === "email-code",
        })}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
