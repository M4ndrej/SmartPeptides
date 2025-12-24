import classNames from "classnames";
import { FC } from "react";

interface CheckmarkIconProps {
  customClass?: string;
  largerBtns?: boolean;
  onPress?: () => void;
}

const CheckmarkIcon: FC<CheckmarkIconProps> = ({ customClass, largerBtns }) => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames({
        "h-[8px] w-[10px]": largerBtns,
      })}
    >
      <path
        d="M1 2.66667L3.21053 5L7 1"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition duration-200 ${customClass}`}
      />
    </svg>
  );
};
export default CheckmarkIcon;
